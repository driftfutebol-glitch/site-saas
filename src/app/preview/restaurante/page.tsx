import type { Metadata } from "next";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  ChefHat,
  Wallet,
  ChartColumn,
  Settings,
  ConciergeBell,
  Timer,
} from "lucide-react";
import { DemoShell } from "@/components/preview/DemoShell";
import { StatCard, Panel, Badge } from "@/components/preview/widgets";

export const metadata: Metadata = { title: "Demo • Restaurante — FerrazCode" };

const nav = [
  { label: "Painel", icon: <LayoutDashboard size={18} />, active: true },
  { label: "Mesas", icon: <ConciergeBell size={18} /> },
  { label: "Comandas", icon: <ClipboardList size={18} /> },
  { label: "Cardápio", icon: <UtensilsCrossed size={18} /> },
  { label: "Cozinha", icon: <ChefHat size={18} /> },
  { label: "Caixa", icon: <Wallet size={18} /> },
  { label: "Relatórios", icon: <ChartColumn size={18} /> },
  { label: "Configurações", icon: <Settings size={18} /> },
];

const freeTables = new Set([4, 8, 14, 18, 20]);
const reservedTables = new Set([6, 12, 17]);
const billTables = new Set([2, 10]);

const comandas = [
  { mesa: "Mesa 05", itens: "2x Picanha, 1x Refrigerante", valor: "R$ 178,00", status: "cozinha", tempo: "8 min" },
  { mesa: "Mesa 12", itens: "1x Risoto, 2x Suco natural", valor: "R$ 96,00", status: "pronto", tempo: "Pronto!" },
  { mesa: "Mesa 02", itens: "1x Pudim, 2x Café", valor: "R$ 42,00", status: "conta", tempo: "—" },
  { mesa: "Mesa 07", itens: "3x Hambúrguer, 3x Batata", valor: "R$ 147,00", status: "cozinha", tempo: "14 min" },
  { mesa: "Mesa 15", itens: "1x Salmão, 1x Vinho", valor: "R$ 212,00", status: "servido", tempo: "Servido" },
  { mesa: "Mesa 10", itens: "Rodízio (2 pessoas)", valor: "R$ 159,80", status: "conta", tempo: "—" },
];

function tableStatus(n: number) {
  if (freeTables.has(n)) return "free";
  if (reservedTables.has(n)) return "res";
  if (billTables.has(n)) return "bill";
  return "busy";
}

export default function RestauranteDemo() {
  return (
    <DemoShell system="MesaPro" tagline="Gestão de restaurante" accent="amber" nav={nav}>
      {/* Indicadores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<ConciergeBell size={20} />} iconClass="text-amber-400" label="Mesas ocupadas" value="12/20" hint="60% do salão" />
        <StatCard icon={<ClipboardList size={20} />} iconClass="text-amber-400" label="Comandas abertas" value="8" hint="2 aguardando conta" />
        <StatCard icon={<Wallet size={20} />} iconClass="text-emerald-400" label="Faturamento hoje" value="R$ 3.180" hint="+9% vs. ontem" />
        <StatCard icon={<Timer size={20} />} iconClass="text-violet-400" label="Tempo médio" value="24 min" hint="do pedido à entrega" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Mapa de mesas */}
        <Panel title="Salão" className="lg:col-span-2" action={<TableLegend />}>
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
            {Array.from({ length: 20 }, (_, i) => {
              const n = i + 1;
              const s = tableStatus(n);
              const styles = {
                busy: "bg-amber-500/15 ring-amber-500/40 text-amber-200",
                free: "bg-white/5 ring-white/10 text-white/40",
                res: "bg-violet-500/15 ring-violet-500/40 text-violet-200",
                bill: "bg-emerald-500/15 ring-emerald-500/40 text-emerald-200",
              }[s];
              const labels = { busy: "Ocupada", free: "Livre", res: "Reservada", bill: "Conta" };
              return (
                <div key={n} className={`rounded-xl px-2 py-3 text-center ring-1 ${styles}`}>
                  <div className="text-base font-bold">{n}</div>
                  <div className="mt-0.5 text-[10px] opacity-80">{labels[s]}</div>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Comandas ativas */}
        <Panel title="Comandas ativas" className="lg:col-span-3">
          <div className="space-y-2.5">
            {comandas.map((c) => (
              <div
                key={c.mesa}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{c.mesa}</span>
                    {c.status === "cozinha" && <Badge tone="amber">Na cozinha</Badge>}
                    {c.status === "pronto" && <Badge tone="green">Pronto</Badge>}
                    {c.status === "servido" && <Badge tone="gray">Servido</Badge>}
                    {c.status === "conta" && <Badge tone="blue">Pedindo a conta</Badge>}
                  </div>
                  <p className="mt-1 truncate text-sm text-white/50">{c.itens}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-semibold">{c.valor}</div>
                  <div className="mt-0.5 text-xs text-white/40">{c.tempo}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Fila da cozinha */}
      <div className="mt-6">
        <Panel title="Fila da cozinha" action={<span className="text-xs text-white/40">tempo real</span>}>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { prato: "Picanha na chapa", mesa: "Mesa 05", t: "8 min", tone: "amber" as const },
              { prato: "Hambúrguer artesanal x3", mesa: "Mesa 07", t: "14 min", tone: "red" as const },
              { prato: "Risoto de funghi", mesa: "Mesa 12", t: "Pronto", tone: "green" as const },
            ].map((k) => (
              <div key={k.prato} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2">
                  <ChefHat size={16} className="text-amber-400" />
                  <Badge tone={k.tone}>{k.t}</Badge>
                </div>
                <div className="mt-2 font-medium">{k.prato}</div>
                <div className="text-xs text-white/40">{k.mesa}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  );
}

function TableLegend() {
  return (
    <div className="hidden items-center gap-2.5 text-[11px] text-white/50 sm:flex">
      <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-500/50" /> Ocupada</span>
      <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500/50" /> Conta</span>
      <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-white/15" /> Livre</span>
    </div>
  );
}
