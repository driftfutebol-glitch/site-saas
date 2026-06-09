import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { signupSchema } from "@/lib/auth-schema";
import { rateLimit } from "@/lib/rate-limit";
import { users } from "@/lib/db";
import { hashPassword, createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";
import { getClientIp } from "@/lib/request-ip";

const MAX_BODY = 5_000;

export async function POST(req: NextRequest) {
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Formato inválido." }, { status: 415 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`register:${ip}`, 5, 60_000);
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

  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, password } = parsed.data;

  try {
    if (users.findByEmail(email)) {
      // Tradeoff DELIBERADO: avisar que o e-mail já existe revela a conta
      // (enumeração), mas o usuário precisa saber disso para ir fazer login.
      // O login, ao contrário, é blindado contra enumeração (msg genérica + tempo constante).
      return NextResponse.json(
        { ok: false, error: "Este e-mail já está cadastrado.", fields: { email: ["Este e-mail já está cadastrado."] } },
        { status: 409 },
      );
    }

    const id = randomUUID();
    const password_hash = await hashPassword(password);
    users.create({ id, name, email, password_hash, image: null, provider: "credentials", google_sub: null });

    // Já entra logado após o cadastro.
    const token = await createSessionToken({ id, email, name });
    const res = NextResponse.json({ ok: true, user: { id, name, email } });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[auth/register] erro:", err);
    return NextResponse.json({ ok: false, error: "Erro interno. Tente novamente." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Método não permitido." }, { status: 405 });
}
