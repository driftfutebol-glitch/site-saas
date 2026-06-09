/**
 * Regras de negócio do estacionamento.
 * Ajuste TOTAL_SPOTS e HOURLY_RATE conforme o cliente.
 */

export const TOTAL_SPOTS = 60;
export const HOURLY_RATE = 10; // R$ por hora (mínimo 1 hora)

/** Calcula o valor a cobrar pelo tempo de permanência (frações sobem 1 hora). */
export function calcValor(entradaISO: string, saidaISO: string): number {
  const ms = new Date(saidaISO).getTime() - new Date(entradaISO).getTime();
  const horas = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));
  return horas * HOURLY_RATE;
}

/** Tempo decorrido legível desde a entrada até "agora". */
export function elapsed(entradaISO: string, nowMs: number): string {
  const totalMin = Math.max(0, Math.floor((nowMs - new Date(entradaISO).getTime()) / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

/** Formata um número como moeda brasileira. */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Hora legível (HH:MM) a partir de um ISO. */
export function hourLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
