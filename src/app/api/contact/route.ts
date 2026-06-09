import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { randomUUID } from "node:crypto";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { messages } from "@/lib/db";

/**
 * POST /api/contact
 *
 * Demonstra um backend SEGURO:
 *  1. Aceita só JSON e limita o tamanho do corpo (evita payloads gigantes).
 *  2. Rate limiting por IP (evita flood/spam).
 *  3. Validação rigorosa com Zod — nada entra sem ser checado (anti-injection começa aqui).
 *  4. Honeypot anti-bot.
 *  5. Erros genéricos para o cliente, detalhes só no log do servidor (não vaza stack trace).
 */

const MAX_BODY_BYTES = 10_000; // ~10 KB é mais que suficiente para um formulário

export async function POST(req: NextRequest) {
  // 1. Content-Type precisa ser JSON
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "Formato inválido." },
      { status: 415 },
    );
  }

  // 2. Rate limit por IP
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 3. Lê o corpo com limite de tamanho
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Não foi possível ler a requisição." }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Mensagem muito grande." }, { status: 413 });
  }

  // 4. Faz o parse do JSON com segurança
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  // 5. Validação rigorosa (a barreira principal contra dados maliciosos)
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Dados inválidos.",
        // Devolve só as mensagens de campo (úteis), sem expor estrutura interna.
        fields: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // 6. Honeypot: se o campo "website" veio preenchido, é bot.
  if (result.data.website) {
    // Respondemos "ok" de propósito para o bot não perceber que foi barrado.
    return NextResponse.json({ ok: true });
  }

  const { name, email, message, phone, service } = result.data;

  try {
    // Salva a mensagem no banco para você ver depois no painel /admin.
    // (Dá para também enviar e-mail/WhatsApp aqui no futuro — Resend, Nodemailer, etc.)
    await messages.create({
      id: randomUUID(),
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Loga o detalhe só no servidor; o cliente recebe mensagem genérica.
    console.error("[contato] erro ao processar:", err);
    return NextResponse.json(
      { ok: false, error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 },
    );
  }
}

// Bloqueia métodos não suportados explicitamente.
export async function GET() {
  return NextResponse.json({ ok: false, error: "Método não permitido." }, { status: 405 });
}
