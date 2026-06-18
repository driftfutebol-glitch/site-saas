import { neon } from "@neondatabase/serverless";

/**
 * Banco de dados via Neon (PostgreSQL serverless — ideal para Vercel).
 *
 * Configure DATABASE_URL (connection string do Neon, começa com postgresql://)
 * no .env.local (dev) e nas variáveis de ambiente da Vercel (produção).
 *
 * Segurança: TODAS as consultas usam parâmetros ($1, $2...), nunca concatenação → sem SQL injection.
 */

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL ausente. Defina a connection string do Neon (postgresql://...) no .env.local e na Vercel.",
  );
}

const globalForDb = globalThis as unknown as {
  _sql?: ReturnType<typeof neon>;
  _ready?: Promise<unknown>;
};

const sql = globalForDb._sql ?? neon(url);
if (process.env.NODE_ENV !== "production") globalForDb._sql = sql;

// Cria as tabelas (uma vez por instância). `created_at` no mesmo formato do SQLite
// (YYYY-MM-DD HH:MM:SS, UTC) para manter o restante do código compatível.
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
     id            TEXT PRIMARY KEY,
     name          TEXT,
     email         TEXT UNIQUE NOT NULL,
     password_hash TEXT,
     image         TEXT,
     provider      TEXT NOT NULL DEFAULT 'credentials',
     google_sub    TEXT,
     created_at    TEXT NOT NULL DEFAULT to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
   )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL`,
  `CREATE TABLE IF NOT EXISTS messages (
     id         TEXT PRIMARY KEY,
     name       TEXT NOT NULL,
     email      TEXT NOT NULL,
     phone      TEXT,
     service    TEXT,
     message    TEXT NOT NULL,
     created_at TEXT NOT NULL DEFAULT to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
   )`,
  `CREATE TABLE IF NOT EXISTS parking_sessions (
     id         TEXT PRIMARY KEY,
     user_id    TEXT NOT NULL,
     placa      TEXT NOT NULL,
     vaga       TEXT,
     entrada    TEXT NOT NULL,
     saida      TEXT,
     valor      DOUBLE PRECISION,
     created_at TEXT NOT NULL DEFAULT to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
   )`,
  `CREATE INDEX IF NOT EXISTS idx_parking_user ON parking_sessions(user_id)`,
];

const ready: Promise<unknown> =
  globalForDb._ready ??
  (async () => {
    for (const stmt of SCHEMA) await sql.query(stmt);
  })();
globalForDb._ready = ready;

type Arg = string | number | null;

async function all<T>(text: string, args: Arg[] = []): Promise<T[]> {
  await ready;
  return (await sql.query(text, args)) as unknown as T[];
}
async function get<T>(text: string, args: Arg[] = []): Promise<T | undefined> {
  return (await all<T>(text, args))[0];
}
async function run(text: string, args: Arg[] = []): Promise<void> {
  await ready;
  await sql.query(text, args);
}
async function num(text: string, args: Arg[] = []): Promise<number> {
  const r = await get<{ v: number | string }>(text, args);
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
    return get<User>("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
  },
  findById(id: string) {
    return get<User>("SELECT * FROM users WHERE id = $1", [id]);
  },
  findByGoogleSub(sub: string) {
    return get<User>("SELECT * FROM users WHERE google_sub = $1", [sub]);
  },
  create(u: NewUser) {
    return run(
      `INSERT INTO users (id, name, email, password_hash, image, provider, google_sub)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [u.id, u.name, u.email.toLowerCase(), u.password_hash, u.image, u.provider, u.google_sub],
    );
  },
  linkGoogleSub(id: string, sub: string) {
    return run("UPDATE users SET google_sub = $1 WHERE id = $2", [sub, id]);
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
       VALUES ($1, $2, $3, $4, $5, $6)`,
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
       VALUES ($1, $2, $3, $4, $5)`,
      [s.id, s.user_id, s.placa, s.vaga, s.entrada],
    );
  },
  listActive(userId: string) {
    return all<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = $1 AND saida IS NULL ORDER BY entrada DESC",
      [userId],
    );
  },
  listClosed(userId: string, limit = 20) {
    return all<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = $1 AND saida IS NOT NULL ORDER BY saida DESC LIMIT $2",
      [userId, limit],
    );
  },
  getById(id: string, userId: string) {
    return get<ParkingSession>("SELECT * FROM parking_sessions WHERE id = $1 AND user_id = $2", [id, userId]);
  },
  getActiveByPlaca(userId: string, placa: string) {
    return get<ParkingSession>(
      "SELECT * FROM parking_sessions WHERE user_id = $1 AND placa = $2 AND saida IS NULL",
      [userId, placa],
    );
  },
  close(id: string, userId: string, saida: string, valor: number) {
    return run("UPDATE parking_sessions SET saida = $1, valor = $2 WHERE id = $3 AND user_id = $4", [
      saida,
      valor,
      id,
      userId,
    ]);
  },
  activeCount(userId: string) {
    return num("SELECT COUNT(*) AS v FROM parking_sessions WHERE user_id = $1 AND saida IS NULL", [userId]);
  },
  revenueOn(userId: string, dateStr: string) {
    return num(
      "SELECT COALESCE(SUM(valor), 0) AS v FROM parking_sessions WHERE user_id = $1 AND saida IS NOT NULL AND substr(saida, 1, 10) = $2",
      [userId, dateStr],
    );
  },
  entriesOn(userId: string, dateStr: string) {
    return num(
      "SELECT COUNT(*) AS v FROM parking_sessions WHERE user_id = $1 AND substr(entrada, 1, 10) = $2",
      [userId, dateStr],
    );
  },
};
