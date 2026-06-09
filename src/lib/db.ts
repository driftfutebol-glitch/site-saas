import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Banco de dados local (SQLite via better-sqlite3).
 *
 * Segurança: TODAS as consultas usam parâmetros (`?` / `@nome`), nunca
 * concatenação de strings — isso torna SQL injection impossível aqui.
 *
 * O padrão `globalThis` evita abrir várias conexões durante o hot-reload do dev.
 * Em produção de larga escala, troque por Postgres (a interface `users` abaixo
 * isola o resto do código dessa mudança).
 */

const dataDir = path.join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "app.db");

const globalForDb = globalThis as unknown as { _db?: Database.Database };

function createDb(): Database.Database {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
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
  `);

  // Migração para bancos criados antes da coluna google_sub existir.
  try {
    db.exec("ALTER TABLE users ADD COLUMN google_sub TEXT");
  } catch {
    // a coluna já existe — tudo certo
  }

  // O `sub` do Google é o identificador IMUTÁVEL da conta (o e-mail pode mudar).
  // Índice único só para valores não-nulos (vários usuários sem Google = vários NULL).
  db.exec(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL",
  );

  // Mensagens enviadas pelo formulário de contato (visíveis no /admin).
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      service    TEXT,
      message    TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Sistema REAL de estacionamento — cada registro pertence a um usuário (user_id).
  db.exec(`
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
  `);
  db.exec("CREATE INDEX IF NOT EXISTS idx_parking_user ON parking_sessions(user_id)");

  return db;
}

const db = globalForDb._db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb._db = db;

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

/** Visão segura de usuário para o painel admin (sem hash de senha). */
export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  provider: string;
  created_at: string;
};

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

export const users = {
  findByEmail(email: string): User | undefined {
    return db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email.toLowerCase()) as User | undefined;
  },

  findById(id: string): User | undefined {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
  },

  findByGoogleSub(sub: string): User | undefined {
    return db.prepare("SELECT * FROM users WHERE google_sub = ?").get(sub) as User | undefined;
  },

  create(user: NewUser): void {
    db.prepare(
      `INSERT INTO users (id, name, email, password_hash, image, provider, google_sub)
       VALUES (@id, @name, @email, @password_hash, @image, @provider, @google_sub)`,
    ).run({ ...user, email: user.email.toLowerCase() });
  },

  /** Vincula o `sub` do Google a uma conta já existente (mesmo e-mail verificado). */
  linkGoogleSub(id: string, sub: string): void {
    db.prepare("UPDATE users SET google_sub = ? WHERE id = ?").run(sub, id);
  },

  /** Lista para o painel admin — SEM o hash de senha. Mais recentes primeiro. */
  all(): AdminUser[] {
    return db
      .prepare("SELECT id, name, email, provider, created_at FROM users ORDER BY created_at DESC")
      .all() as AdminUser[];
  },

  count(): number {
    return (db.prepare("SELECT COUNT(*) AS c FROM users").get() as { c: number }).c;
  },
};

export const messages = {
  create(msg: NewMessage): void {
    db.prepare(
      `INSERT INTO messages (id, name, email, phone, service, message)
       VALUES (@id, @name, @email, @phone, @service, @message)`,
    ).run(msg);
  },

  /** Todas as mensagens, mais recentes primeiro (para o painel admin). */
  all(): Message[] {
    return db.prepare("SELECT * FROM messages ORDER BY created_at DESC").all() as Message[];
  },

  count(): number {
    return (db.prepare("SELECT COUNT(*) AS c FROM messages").get() as { c: number }).c;
  },
};

// ============================================================
//  Sistema de Estacionamento (dados reais, por usuário)
// ============================================================

export type ParkingSession = {
  id: string;
  user_id: string;
  placa: string;
  vaga: string | null;
  entrada: string; // ISO
  saida: string | null; // ISO (null = ainda no pátio)
  valor: number | null; // calculado na saída
  created_at: string;
};

export const parking = {
  createEntry(s: { id: string; user_id: string; placa: string; vaga: string | null; entrada: string }): void {
    db.prepare(
      `INSERT INTO parking_sessions (id, user_id, placa, vaga, entrada)
       VALUES (@id, @user_id, @placa, @vaga, @entrada)`,
    ).run(s);
  },

  /** Veículos atualmente no pátio (sem saída), do usuário. */
  listActive(userId: string): ParkingSession[] {
    return db
      .prepare("SELECT * FROM parking_sessions WHERE user_id = ? AND saida IS NULL ORDER BY entrada DESC")
      .all(userId) as ParkingSession[];
  },

  /** Histórico de saídas (mais recentes primeiro). */
  listClosed(userId: string, limit = 20): ParkingSession[] {
    return db
      .prepare("SELECT * FROM parking_sessions WHERE user_id = ? AND saida IS NOT NULL ORDER BY saida DESC LIMIT ?")
      .all(userId, limit) as ParkingSession[];
  },

  getById(id: string, userId: string): ParkingSession | undefined {
    return db
      .prepare("SELECT * FROM parking_sessions WHERE id = ? AND user_id = ?")
      .get(id, userId) as ParkingSession | undefined;
  },

  /** Já existe esse veículo no pátio? (evita entrada duplicada) */
  getActiveByPlaca(userId: string, placa: string): ParkingSession | undefined {
    return db
      .prepare("SELECT * FROM parking_sessions WHERE user_id = ? AND placa = ? AND saida IS NULL")
      .get(userId, placa) as ParkingSession | undefined;
  },

  close(id: string, userId: string, saida: string, valor: number): void {
    db.prepare("UPDATE parking_sessions SET saida = ?, valor = ? WHERE id = ? AND user_id = ?").run(
      saida,
      valor,
      id,
      userId,
    );
  },

  activeCount(userId: string): number {
    return (
      db.prepare("SELECT COUNT(*) AS c FROM parking_sessions WHERE user_id = ? AND saida IS NULL").get(userId) as {
        c: number;
      }
    ).c;
  },

  /** Soma do faturamento das saídas em uma data (YYYY-MM-DD). */
  revenueOn(userId: string, dateStr: string): number {
    return (
      db
        .prepare(
          "SELECT COALESCE(SUM(valor), 0) AS s FROM parking_sessions WHERE user_id = ? AND saida IS NOT NULL AND substr(saida, 1, 10) = ?",
        )
        .get(userId, dateStr) as { s: number }
    ).s;
  },

  /** Quantas entradas registradas em uma data (YYYY-MM-DD). */
  entriesOn(userId: string, dateStr: string): number {
    return (
      db
        .prepare("SELECT COUNT(*) AS c FROM parking_sessions WHERE user_id = ? AND substr(entrada, 1, 10) = ?")
        .get(userId, dateStr) as { c: number }
    ).c;
  },
};
