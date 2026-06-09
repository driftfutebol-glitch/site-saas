import type { Metadata } from "next";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Users,
  UserPlus,
  CircleDollarSign,
  ChartColumn,
  Settings,
  Clock,
} from "lucide-react";
import { DemoShell } from "@/components/preview/DemoShell";
import { StatCard, Panel, Badge, Donut } from "@/components/preview/widgets";

export const metadata: Metadata = { title: "Demo • Agendamentos — FerrazCode" };

const nav = [
  { label: "Painel", icon: <LayoutDashboard size={18} />, active: true },
  { label: "Agenda", icon: <CalendarDays size={18} /> },
  { label: "Clientes", icon: <Users size={18} /> },
  { label: "Serviços", icon: <Scissors size={18} /> },
  { label: "Profissionais", icon: <UserPlus size={18} /> },
  { label: "Financeiro", icon: <CircleDollarSign size={18} /> },
  { label: "Relatórios", icon: <ChartColumn size={18} /> },
  { label: "Configurações", icon: <Settings size={18} /> },
];

const profs = ["Léo", "Rafa", "Bruno"];
const horas = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

type Tone = "rose" | "amber" | "violet" | "cyan" | "gray";
type Apt = { cliente: string; servico: string; tone: Tone } | null;

const agenda: Apt[][] = [
  [{ cliente: "João P.", servico: "Corte", tone: "rose" }, { cliente: "Marcos", servico: "Barba", tone: "amber" }, null],
  [{ cliente: "Rafael", servico: "Corte + Barba", tone: "violet" }, null, { cliente: "Pedro H.", servico: "Corte", tone: "rose" }],
  [{ cliente: "Lucas", servico: "Corte", tone: "rose" }, { cliente: "André", servico: "Sobrancelha", tone: "cyan" }, { cliente: "Tiago", servico: "Barba", tone: "amber" }],
  [{ cliente: "Almoço", servico: "", tone: "gray" }, { cliente: "Almoço", servico: "", tone: "gray" }, { cliente: "Almoço", servico: "", tone: "gray" }],
  [null, { cliente: "Gabriel", servico: "Corte", tone: "rose" }, { cliente: "Vitor", servico: "Corte + Barba", tone: "violet" }],
  [{ cliente: "Bruno C.", servico: "Barba", tone: "amber" }, { cliente: "Diego", servico: "Corte", tone: "rose" }, null],
  [{ cliente: "Felipe", servico: "Corte + Barba", tone: "violet" }, null, { cliente: "Caio", servico: "Sobrancelha", tone: "cyan" }],
  [{ cliente: "Mateus", servico: "Corte", tone: "rose" }, { cliente: "Igor", servico: "Barba", tone: "amber" }, { cliente: "Luan", servico: "Corte", tone: "rose" }],
  [null, { cliente: "Renan", servico: "Corte + Barba", tone: "violet" }, null],
];

const toneCls: Record<Tone, string> = {
  rose: "bg-rose-500/15 text-rose-200 ring-rose-500/30",
  amber: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
  violet: "bg-violet-500/15 text-violet-200 ring-violet-500/30",
  cyan: "bg-cyan-500/15 text-cyan-200 ring-cyan-500/30",
  gray: "bg-white/5 text-white/40 ring-white/10",
};

const proximos = [
  { hora: "14:00", cliente: "Bruno C.", servico: "Barba", prof: "Léo" },
  { hora: "14:00", cliente: "Diego", servico: "Corte", prof: "Rafa" },
  { hora: "15:00", cliente: "Felipe", servico: "Corte + Barba", prof: "Léo" },
  { hora: "15:00", cliente: "Caio", servico: "Sobrancelha", prof: "Bruno" },
];

export default function AgendamentosDemo() {
  return (
    <DemoShell system="AgendaPro" tagline="Barbearia & salão" accent="rose" nav={nav}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<CalendarDays size={20} />} iconClass="text-rose-400" label="Agendamentos hoje" value="18" hint="3 horários livres" />
        <StatCard icon={<CircleDollarSign size={20} />} iconClass="text-emerald-400" label="Faturamento previsto" value="R$ 1.460" hint="para hoje" />
        <StatCard icon={<Clock size={20} />} iconClass="text-rose-400" label="Taxa de ocupação" value="76%" hint="da agenda do dia" />
        <StatCard icon={<UserPlus size={20} />} iconClass="text-violet-400" label="Clientes novos" value="4" hint="esta semana" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Agenda do dia */}
        <Panel title="Agenda de hoje" className="lg:col-span-2" action={<Badge tone="rose">Segunda, 09/06</Badge>}>
          <div className="overflow-x-auto">
            <div className="min-w-[480px]">
              {/* cabeçalho com profissionais */}
              <div className="grid grid-cols-[56px_1fr_1fr_1fr] gap-2 border-b border-white/10 pb-2">
                <div />
                {profs.map((p) => (
                  <div key={p} className="flex items-center justify-center gap-2 text-sm font-medium">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-[11px] font-bold">
                      {p.charAt(0)}
                    </span>
                    {p}
                  </div>
                ))}
              </div>

              {/* linhas por horário */}
              <div className="mt-2 space-y-1.5">
                {horas.map((h, hi) => (
                  <div key={h} className="grid grid-cols-[56px_1fr_1fr_1fr] gap-2">
                    <div className="flex items-center text-xs text-white/40">{h}</div>
                    {agenda[hi].map((apt, pi) => (
                      <div key={pi}>
                        {apt ? (
                          <div className={`rounded-lg px-2.5 py-1.5 text-xs ring-1 ${toneCls[apt.tone]}`}>
                            <div className="truncate font-medium">{apt.cliente}</div>
                            {apt.servico && <div className="truncate opacity-70">{apt.servico}</div>}
                          </div>
                        ) : (
                          <div className="flex h-full min-h-[38px] items-center justify-center rounded-lg border border-dashed border-white/10 text-[11px] text-white/25">
                            livre
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* Coluna direita */}
        <div className="space-y-6">
          <Panel title="Ocupação do dia">
            <div className="flex items-center justify-center">
              <Donut
                value={76}
                strokeClass="stroke-rose-400"
                center={
                  <div>
                    <div className="text-2xl font-bold">76%</div>
                    <div className="text-xs text-white/40">ocupado</div>
                  </div>
                }
              />
            </div>
          </Panel>

          <Panel title="Próximos">
            <div className="space-y-2">
              {proximos.map((p, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <span className="grid h-10 w-12 shrink-0 place-items-center rounded-lg bg-rose-500/15 text-sm font-semibold text-rose-300">
                    {p.hora}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{p.cliente}</div>
                    <div className="truncate text-xs text-white/40">{p.servico} • {p.prof}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DemoShell>
  );
}
