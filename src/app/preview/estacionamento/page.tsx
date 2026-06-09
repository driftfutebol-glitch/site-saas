import type { Metadata } from "next";
import {
  Car,
  SquareParking,
  Receipt,
  Users,
  CircleDollarSign,
  ChartColumn,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { DemoShell } from "@/components/preview/DemoShell";
import { StatCard, Panel, Badge, BarChart, Donut } from "@/components/preview/widgets";

export const metadata: Metadata = { title: "Demo • Estacionamento — FerrazCode" };

const nav = [
  { label: "Painel", icon: <LayoutDashboard size={18} />, active: true },
  { label: "Vagas", icon: <SquareParking size={18} /> },
  { label: "Entradas / Saídas", icon: <Receipt size={18} /> },
  { label: "Mensalistas", icon: <Users size={18} /> },
  { label: "Faturamento", icon: <CircleDollarSign size={18} /> },
  { label: "Relatórios", icon: <ChartColumn size={18} /> },
  { label: "Configurações", icon: <Settings size={18} /> },
];

const freeSpots = new Set([2, 7, 11, 16, 20, 25, 29, 34, 38, 43, 48, 53, 57]);
const reservedSpots = new Set([5, 18, 31, 44, 59]);

const entries = [
  { placa: "FRZ-1A23", vaga: "A12", entrada: "14:32", tempo: "1h 12min", valor: "R$ 14,00", status: "patio" },
  { placa: "BRA-2B45", vaga: "B07", entrada: "14:05", tempo: "1h 39min", valor: "R$ 18,00", status: "patio" },
  { placa: "MES-9K10", vaga: "C03", entrada: "08:00", tempo: "Mensalista", valor: "—", status: "mensal" },
  { placa: "SPX-7Z88", vaga: "A04", entrada: "13:10", tempo: "2h 34min", valor: "R$ 26,00", status: "patio" },
  { placa: "RJ-5T62", vaga: "D11", entrada: "12:48", tempo: "Saiu 14:20", valor: "R$ 16,00", status: "saiu" },
  { placa: "FER-3C77", vaga: "B14", entrada: "11:30", tempo: "Saiu 13:05", valor: "R$ 15,00", status: "saiu" },
];

const revenue = [
  { label: "Seg", value: 980 },
  { label: "Ter", value: 1240 },
  { label: "Qua", value: 1100 },
  { label: "Qui", value: 1480 },
  { label: "Sex", value: 1890 },
  { label: "Sáb", value: 2100 },
  { label: "Dom", value: 760 },
];

export default function EstacionamentoDemo() {
  return (
    <DemoShell system="ParkFlow" tagline="Gestão de estacionamento" accent="cyan" nav={nav}>
      {/* Indicadores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<SquareParking size={20} />} iconClass="text-cyan-400" label="Vagas ocupadas" value="42/60" hint="70% de ocupação" />
        <StatCard icon={<Car size={20} />} iconClass="text-cyan-400" label="Veículos no pátio" value="42" hint="agora" />
        <StatCard icon={<CircleDollarSign size={20} />} iconClass="text-emerald-400" label="Faturamento hoje" value="R$ 1.240" hint="+12% vs. ontem" />
        <StatCard icon={<Users size={20} />} iconClass="text-violet-400" label="Mensalistas ativos" value="28" hint="3 vencem esta semana" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Mapa de vagas */}
        <Panel title="Mapa de vagas" className="lg:col-span-2" action={<Legend />}>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
            {Array.from({ length: 60 }, (_, i) => {
              const n = i + 1;
              const state = freeSpots.has(n) ? "free" : reservedSpots.has(n) ? "res" : "busy";
              const cls =
                state === "busy"
                  ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40"
                  : state === "res"
                    ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                    : "bg-white/5 text-white/30 ring-1 ring-white/10";
              return (
                <div key={n} className={`grid aspect-square place-items-center rounded-lg text-xs font-medium ${cls}`}>
                  {n}
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Coluna direita: ocupação + faturamento */}
        <div className="space-y-6">
          <Panel title="Ocupação agora">
            <div className="flex items-center justify-center">
              <Donut
                value={70}
                strokeClass="stroke-cyan-400"
                center={
                  <div>
                    <div className="text-2xl font-bold">70%</div>
                    <div className="text-xs text-white/40">42/60 vagas</div>
                  </div>
                }
              />
            </div>
          </Panel>
          <Panel title="Faturamento da semana">
            <BarChart data={revenue} barClass="bg-gradient-to-t from-cyan-600 to-cyan-400" />
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-white/50">Total na semana</span>
              <span className="font-semibold text-cyan-300">R$ 9.550</span>
            </div>
          </Panel>
        </div>
      </div>

      {/* Entradas recentes */}
      <div className="mt-6">
        <Panel title="Movimentação recente">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/40">
                <tr className="border-b border-white/10">
                  <th className="pb-3 pr-4 font-medium">Placa</th>
                  <th className="pb-3 pr-4 font-medium">Vaga</th>
                  <th className="pb-3 pr-4 font-medium">Entrada</th>
                  <th className="pb-3 pr-4 font-medium">Permanência</th>
                  <th className="pb-3 pr-4 font-medium">Valor</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.placa} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4 font-mono font-medium">{e.placa}</td>
                    <td className="py-3 pr-4 text-white/60">{e.vaga}</td>
                    <td className="py-3 pr-4 text-white/60">{e.entrada}</td>
                    <td className="py-3 pr-4 text-white/60">{e.tempo}</td>
                    <td className="py-3 pr-4 font-medium">{e.valor}</td>
                    <td className="py-3">
                      {e.status === "patio" ? (
                        <Badge tone="cyan">No pátio</Badge>
                      ) : e.status === "mensal" ? (
                        <Badge tone="blue">Mensalista</Badge>
                      ) : (
                        <Badge tone="gray">Saiu</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </DemoShell>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-3 text-xs text-white/50">
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-cyan-500/40" /> Ocupada</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-500/40" /> Reservada</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-white/10" /> Livre</span>
    </div>
  );
}
