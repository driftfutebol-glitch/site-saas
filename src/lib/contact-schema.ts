import { z } from "zod";

/**
 * Schema de validação do formulário de contato.
 * É usado TANTO no navegador (feedback rápido) QUANTO no servidor (segurança).
 * Regra de ouro: nunca confie só na validação do navegador — o servidor sempre revalida.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mín. 2 letras).")
    .max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("E-mail inválido.")
    .max(120, "E-mail muito longo."),
  phone: z
    .string()
    .trim()
    .max(30, "Telefone muito longo.")
    .optional()
    .or(z.literal("")),
  service: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mín. 10 caracteres).")
    .max(2000, "Mensagem muito longa (máx. 2000 caracteres)."),
  // Campo "armadilha" para bots (honeypot). Humanos nunca preenchem.
  // Aceita aqui no schema (com limite de tamanho) e deixa a ROTA tratar:
  // se vier preenchido, respondemos "ok" silenciosamente para não avisar o bot.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
