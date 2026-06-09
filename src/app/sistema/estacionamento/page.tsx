import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SquareParking, Car, CircleDollarSign, LogIn, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { parking } from "@/lib/db";
import { TOTAL_SPOTS, HOURLY_RATE, calcValor, elapsed, formatBRL, hourLabel } from "@/lib/parking";
import { StatCard, Panel } from "@/components/preview/widgets";
import { EntradaForm } from "@/components/sistema/EntradaForm";
import { registrarSaida } from "./actions";

export const metadata: Metadata = { title: "Estacionamento — FerrazCode" };
export const dynamic = "force-dynamic";

export default async function EstacionamentoSistema() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ativos = parking.listActive(user.id);
  const historico = parking.listClosed(user.id, 15);
  const hoje = new Date().toISOString().slice(0, 10);
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  const ocupadas = ativos.length;
  const livres = Math.max(0, TOTAL_SPOTS - ocupadas);
  const pct = Math.round((ocupadas / TOTAL_SPOTS) * 100);
  const faturamentoHoje = parking.revenueOn(user.id, hoje);
  const entradasHoje = parking.entriesOn(user.id, hoje);

  return (
    <div className="min-h-screen bg-[#0a0b12] text-white">
      {/* Cabeçalho */}
      <header className="border-b border-white/10 bg-[#0d0e18]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-white">
              P
            </span>
            <div className="min-w-0">
              <div className="font-semibold leading-none">ParkFlow</div>
              <div className="mt-1 truncate text-xs text-white/40">
                Estacionamento de {user.name ?? user.email}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Link href="/conta" className="rounded-lg px-3 py-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white">
              Minha conta
            </Link>
            <Link href="/" className="rounded-lg px-3 py-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white">
              Site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Indicadores */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<SquareParking size={20} />} iconClass="text-cyan-400" label="Ocupação" value={`${ocupadas}/${TOTAL_SPOTS}`} hint={`${pct}% do pátio`} />
          <StatCard icon={<Car size={20} />} iconClass="text-cyan-400" label="Vagas livres" value={`${livres}`} hint="disponíveis agora" />
          <StatCard icon={<CircleDollarSign size={20} />} iconClass="text-emerald-400" label="Faturamento hoje" value={formatBRL(faturamentoHoje)} hint={`R$ ${HOURLY_RATE},00 / hora`} />
          <StatCard icon={<LogIn size={20} />} iconClass="text-violet-400" label="Entradas hoje" value={`${entradasHoje}`} hint="veículos registrados" />
        </div>

        {/* Registrar entrada */}
        <div className="mt-6">
          <Panel title="Registrar entrada">
            <EntradaForm />
          </Panel>
        </div>

        {/* No pátio agora */}
        <div className="mt-6">
          <Panel title={`No pátio agora (${ocupadas})`}>
            {ativos.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">
                Nenhum veículo no pátio. Registre uma entrada acima. 🚗
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-white/40">
                    <tr className="border-b border-white/10">
                      <th className="pb-3 pr-4 font-medium">Placa</th>
                      <th className="pb-3 pr-4 font-medium">Vaga</th>
                      <th className="pb-3 pr-4 font-medium">Entrada</th>
                      <th className="pb-3 pr-4 font-medium">Tempo</th>
                      <th className="pb-3 pr-4 font-medium">Valor atual</th>
                      <th className="pb-3 font-medium text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ativos.map((s) => (
                      <tr key={s.id} className="border-b border-white/5 last:border-0">
                        <td className="py-3 pr-4 font-mono font-semibold">{s.placa}</td>
                        <td className="py-3 pr-4 text-white/60">{s.vaga ?? "—"}</td>
                        <td className="py-3 pr-4 text-white/60">{hourLabel(s.entrada)}</td>
                        <td className="py-3 pr-4 text-white/60">{elapsed(s.entrada, now)}</td>
                        <td className="py-3 pr-4 font-medium text-cyan-300">
                          {formatBRL(calcValor(s.entrada, nowIso))}
                        </td>
                        <td className="py-3 text-right">
                          <form action={registrarSaida} className="inline">
                            <input type="hidden" name="id" value={s.id} />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:text-emerald-300"
                            >
                              <LogOut size={13} /> Registrar saída
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>

        {/* Histórico */}
        <div className="mt-6">
          <Panel title="Histórico de saídas">
            {historico.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">Ainda não há saídas registradas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-white/40">
                    <tr className="border-b border-white/10">
                      <th className="pb-3 pr-4 font-medium">Placa</th>
                      <th className="pb-3 pr-4 font-medium">Entrada</th>
                      <th className="pb-3 pr-4 font-medium">Saída</th>
                      <th className="pb-3 pr-4 font-medium">Permanência</th>
                      <th className="pb-3 font-medium text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.map((s) => (
                      <tr key={s.id} className="border-b border-white/5 last:border-0">
                        <td className="py-3 pr-4 font-mono font-semibold">{s.placa}</td>
                        <td className="py-3 pr-4 text-white/60">{hourLabel(s.entrada)}</td>
                        <td className="py-3 pr-4 text-white/60">{s.saida ? hourLabel(s.saida) : "—"}</td>
                        <td className="py-3 pr-4 text-white/60">
                          {s.saida ? elapsed(s.entrada, new Date(s.saida).getTime()) : "—"}
                        </td>
                        <td className="py-3 text-right font-semibold text-emerald-300">
                          {s.valor != null ? formatBRL(s.valor) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          Sistema real da FerrazCode • dados salvos com segurança • só você vê os seus.
        </p>
      </div>
    </div>
  );
}
