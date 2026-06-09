/**
 * Rate limiter simples em memória (janela deslizante).
 * Limita quantas requisições um mesmo IP pode fazer num intervalo de tempo.
 *
 * Observação: por ser em memória, funciona por instância do servidor. Para produção
 * em escala (vários servidores), troque por Redis / Upstash. Para começar, já protege
 * contra o abuso mais comum (flood de um mesmo IP).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

// Limpeza periódica para o Map não crescer infinitamente.
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, 5 * 60_000);
  // Não impede o processo de encerrar.
  if (typeof timer === "object" && "unref" in timer) timer.unref();
}
