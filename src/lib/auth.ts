import "server-only";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { users, type User } from "@/lib/db";

/**
 * Núcleo de autenticação:
 *  - Sessão = um JWT assinado (HS256) guardado num cookie httpOnly.
 *  - Senha  = hash bcrypt (custo 12), nunca em texto puro.
 *
 * Decisões de segurança seguem o checklist:
 *  - `algorithms: ["HS256"]` fixado na verificação (bloqueia ataque de confusão de algoritmo).
 *  - cookie httpOnly (JS não lê), Secure em produção, SameSite=Lax (necessário pro redirect do Google).
 *  - hash "isca" (DUMMY_HASH) para o tempo de resposta do login ser constante (evita enumerar usuários).
 */

export const SESSION_COOKIE = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias (em segundos)

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET ausente ou muito curto. Defina um valor aleatório de 32+ caracteres no .env.local",
    );
  }
  return new TextEncoder().encode(secret);
}

export type SessionData = { id: string; email: string; name: string | null };

/** Cria o token de sessão (JWT) para um usuário. */
export async function createSessionToken(user: SessionData): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

/** Verifica e decodifica o token. Retorna null se inválido/expirado. */
export async function verifySessionToken(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: String(payload.email ?? ""),
      name: (payload.name as string | null) ?? null,
    };
  } catch {
    return null; // expirado, assinatura inválida, etc. → não autenticado
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

/** Grava o cookie de sessão (usado após login/cadastro). */
export async function setSessionCookie(user: SessionData): Promise<void> {
  const token = await createSessionToken(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions());
}

/** Apaga o cookie de sessão (logout). */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
}

/** Lê a sessão atual a partir do cookie e devolve o usuário do banco (ou null). */
export async function getCurrentUser(): Promise<User | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  return (await users.findById(session.id)) ?? null;
}

// --- Senhas -----------------------------------------------------------------

const BCRYPT_COST = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Hash "isca" com o mesmo custo. Quando o e-mail não existe, comparamos a senha
 * contra ele assim mesmo — assim o tempo de resposta é igual ao de um e-mail que
 * existe, e um atacante não consegue descobrir quais e-mails estão cadastrados.
 */
export const DUMMY_HASH = bcrypt.hashSync("constant-time-placeholder", BCRYPT_COST);

// --- Admin ------------------------------------------------------------------

/**
 * Decide quem tem acesso ao painel /admin.
 * Os e-mails liberados ficam em ADMIN_EMAILS (.env.local), separados por vírgula.
 * Ex.: ADMIN_EMAILS=driftfutebol@gmail.com,outro@email.com
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
