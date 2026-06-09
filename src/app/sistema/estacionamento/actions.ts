"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { parking } from "@/lib/db";
import { calcValor } from "@/lib/parking";

const PATH = "/sistema/estacionamento";

const entradaSchema = z.object({
  placa: z
    .string()
    .trim()
    .min(5, "Informe uma placa válida.")
    .max(10, "Placa muito longa."),
  vaga: z.string().trim().max(6, "Vaga inválida.").optional().or(z.literal("")),
});

export type EntradaState = { ok: boolean; error: string };

/** Registra a entrada de um veículo (usada com useActionState no formulário). */
export async function registrarEntrada(
  _prev: EntradaState,
  formData: FormData,
): Promise<EntradaState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Sua sessão expirou. Entre novamente." };

  const parsed = entradaSchema.safeParse({
    placa: formData.get("placa"),
    vaga: formData.get("vaga"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const placa = parsed.data.placa.toUpperCase();
  const vaga = parsed.data.vaga ? parsed.data.vaga.toUpperCase() : null;

  if (await parking.getActiveByPlaca(user.id, placa)) {
    return { ok: false, error: `O veículo ${placa} já está no pátio.` };
  }

  await parking.createEntry({
    id: randomUUID(),
    user_id: user.id,
    placa,
    vaga,
    entrada: new Date().toISOString(),
  });

  revalidatePath(PATH);
  return { ok: true, error: "" };
}

/** Registra a saída (form action simples): calcula o valor pelo tempo e fecha o ticket. */
export async function registrarSaida(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  const id = String(formData.get("id") ?? "");
  const session = await parking.getById(id, user.id);
  if (!session || session.saida) return; // não existe ou já saiu

  const saida = new Date().toISOString();
  const valor = calcValor(session.entrada, saida);
  await parking.close(id, user.id, saida, valor);

  revalidatePath(PATH);
}
