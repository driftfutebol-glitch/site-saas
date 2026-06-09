import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth-schema";
import { rateLimit } from "@/lib/rate-limit";
import { users } from "@/lib/db";
import {
  verifyPassword,
  DUMMY_HASH,
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/auth";
import { getClientIp } from "@/lib/request-ip";

const MAX_BODY = 5_000;

export async function POST(req: NextRequest) {
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Formato inválido." }, { status: 415 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`login:${ip}`, 10, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // Rejeita cedo pelo tamanho declarado, antes de carregar o corpo todo na memória.
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "Dados muito grandes." }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }
  if (Buffer.byteLength(raw) > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "Dados muito grandes." }, { status: 413 });
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { email, password } = parsed.data;

  // Limite POR CONTA, além do limite por IP. Defesa contra força bruta mesmo se o
  // atacante trocar de IP (X-Forwarded-For é forjável). 10 tentativas / 15 min por e-mail.
  // (Tradeoff conhecido: alguém pode "trancar" a conta tentando errar de propósito —
  // por isso o limite é generoso e a mensagem orienta a aguardar.)
  const acct = rateLimit(`login-acct:${email}`, 10, 15 * 60_000);
  if (!acct.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas para esta conta. Aguarde alguns minutos." },
      { status: 429, headers: { "Retry-After": String(acct.retryAfterSeconds) } },
    );
  }

  try {
    const user = await users.findByEmail(email);

    // Comparação SEMPRE executada (contra um hash isca se o usuário não existe)
    // para o tempo de resposta ser constante — impede descobrir e-mails cadastrados.
    const hash = user?.password_hash ?? DUMMY_HASH;
    const passwordOk = await verifyPassword(password, hash);

    if (!user || !user.password_hash || !passwordOk) {
      // Mensagem genérica idêntica para qualquer falha (sem dar pistas).
      return NextResponse.json(
        { ok: false, error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    const token = await createSessionToken({ id: user.id, email: user.email, name: user.name });
    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[auth/login] erro:", err);
    return NextResponse.json({ ok: false, error: "Erro interno. Tente novamente." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Método não permitido." }, { status: 405 });
}
