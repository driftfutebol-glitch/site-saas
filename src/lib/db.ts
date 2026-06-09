import { createClient } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Banco de dados via libSQL (SQLite).
 *  - LOCAL (dev):  DATABASE_URL ausente → usa um arquivo:  file:./data/app.db
 *  - NUVEM (prod): DATABASE_URL = libsql://...  (Turso) + DATABASE_AUTH_TOKEN
 *
 * Mesma linguagem SQL do SQLite, agora com consultas ASSÍNCRONAS (await).
 * Segurança: TODAS as consultas usam parâmetros (?), nunca concatenação → sem SQL injection.
 */

const url = process.env.DATABASE_URL ?? (process.env.VERCEL ? "" : "file:./data/app.db");
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url) {
  throw new Error(
    "DATABASE_URL ausente. No Vercel, configure DATABASE_URL e DATABASE_AUTH_TOKEN com os dados do Turso/libSQL.",
  );
}

if (url.startsWith("libsql://") && !authToken) {
  throw new Error("DATABASE_AUTH_TOKEN ausente para o banco libSQL remoto.");
}

// Só cria a pasta local quando o banco é um arquivo (na nuvem não há filesystem gravável).
if (url.startsWith("file:")) {
  mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
}

const globalForDb = globalThis as unknown as { _libsql?: ReturnType<typeof createClient> };
const client = globalForDb._libsql ?? createClient({ url, authToken });
if (process.env.NODE_ENV !== "production") globalForDb._libsql = client;

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    name          TEXT,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    image         TEXT,
    provider      TEXT NOT NULL DEFAULT 'credentials',
    google_sub    TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL;

  CREATE TABLE IF NOT EXISTS messages (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    phone      TEXT,
    service    TEXT,
    message    TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS parking_sessions (
    id         TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    placa      TEXT NOT NULL,
    vaga       TEXT,
    entrada    TEXT NOT NULL,
    saida      TEXT,
    valor      REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_parking_user ON parking_sessions(user_id);
`;

// Garante que as tabelas existem (roda uma vez por instância).
const ready: Promise<unknown> =
  (globalForDb as { _ready?: Promise<unknown> })._ready ?? client.executeMultiple(SCHEMA);
(globalForDb as { _ready?: Promise<unknown> })._ready = ready;

type Arg = string | number | null;

async function all<T>(sql: string, args: Arg[] = []): Promise<T[]> {
  await ready;
  const r = await client.execute({ sql, args });
  return r.rows as unknown as T[];
}
async function get<T>(sql: string, args: Arg[] = []): Promise<T | undefined> {
  return (await all<T>(sql, args))[0];
}
async function run(sql: string, args: Arg[] = []): Promise<void> {
  await ready;
  await client.execute({ sql, args });
}
async function num(sql: string, args: Arg[] = []): Promise<number> {
  const r = await get<{ v: number }>(sql, args);
  return Number(r?.v ?? 0);
}

// ============================================================
//  Usuários
// ============================================================

export type User = {
  id: string;
  name: string | null;
  email: string;
  password_hash: string | null;
  image: string | null;
  provider: string;
  google_sub: string | null;
  created_at: string;
};

export type NewUser = {
  id: string;
  name: string | null;
  email: string;
  password_hash: string | null;
  image: string | null;
  provider: string;
  google_sub: string | null;
};

export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  provider: string;
  created_at: string;
};

export const users = {
  findByEmail(email: string) {
    return get<User>("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
  },
  findById(id: string) {
    return get<User>("SELECT * FROM users WHERE id = ?", [id]);
  },
  findByGoogleSub(sub: string) {
    return get<User>("SELECT * FROM users WHERE google_sub = ?", [sub]);
  },
  create(u: NewUser) {
    return run(
      `INSERT INTO users (id, name, email, password_hash, image, provider, google_sub)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [u.id, u.name, u.email.toLowerCase(), u.password_hash, u.image, u.provider, u.google_sub],
    );
  },
  linkGoogleSub(id: string, sub: string) {
    return run("UPDATE users SET google_sub = ? WHERE id = ?", [sub, id]);
  },
  all() {
    return all<AdminUser>(
      "SELECT id, name, email, provider, created_at FROM users ORDER BY created_at DESC",
    );
  },
};

// ============================================================
//  Mensagens de contato
// ============================================================

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

export type NewMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

export const messages = {
  create(m: NewMessage) {
    return run(
      `INSERT INTO messages (id, name, email, phone, service, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [m.id, m.name, m.email, m.phone, m.service, m.message],
    );
  },
  all() {
    return all<Message>("SELECT * FROM messages ORDER BY created_at DESC");
  },
};

// ============================================================
//  Sistema de Estacionamento (por usuário)
// ============================================================

export type ParkingSession = {
  id: string;
  user_id: string;
  placa: string;
  vaga: string | null;
  entrada: string;
  saida: string | null;
  valor: number | null;
  created_at: string;
};

export const parking = {
  createEntry(s: { id: string; user_id: string; placa: string; vaga: string | null; entrada: string }) {
    return run(
      `INSERT INTO parking_sessions (id, user_id, placa, vaga, entrada)
       VALUES (?, ?, ?, ?, ?)`,
      [s.id, s.user_id, s.placa, s.vaga, s.entrada],
    );
  },
  listActive(userId: string) {
    return all<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = ? AND saida IS NULL ORDER BY entrada DESC",
      [userId],
    );
  },
  listClosed(userId: string, limit = 20) {
    return all<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = ? AND saida IS NOT NULL ORDER BY saida DESC LIMIT ?",
      [userId, limit],
    );
  },
  getById(id: string, userId: string) {
    return get<ParkingSession>("SELECT * FROM parking_sessions WHERE id = ? AND user_id = ?", [id, userId]);
  },
  getActiveByPlaca(userId: string, placa: string) {
    return get<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = ? AND placa = ? AND saida IS NULL",
      [userId, placa],
    );
  },
  close(id: string, userId: string, saida: string, valor: number) {
    return run("UPDATE parking_sessions SET saida = ?, valor = ? WHERE id = ? AND user_id = ?", [
      saida,
      valor,
      id,
      userId,
    ]);
  },
  activeCount(userId: string) {
    return num("SELECT COUNT(*) AS v FROM parking_sessions WHERE user_id = ? AND saida IS NULL", [userId]);
  },
  revenueOn(userId: string, dateStr: string) {
    return num(
      "SELECT COALESCE(SUM(valor), 0) AS v FROM parking_sessions WHERE user_id = ? AND saida IS NOT NULL AND substr(saida, 1, 10) = ?",
      [userId, dateStr],
    );
  },
  entriesOn(userId: string, dateStr: string) {
    return num(
      "SELECT COUNT(*) AS v FROM parking_sessions WHERE user_id = ? AND substr(entrada, 1, 10) = ?",
      [userId, dateStr],
    );
  },
};
