import type { Metadata } from "next";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  PackageMinus,
  TriangleAlert,
  ChartColumn,
  Settings,
  Boxes,
  Users,
} from "lucide-react";
import { DemoShell } from "@/components/preview/DemoShell";
import { StatCard, Panel, Badge } from "@/components/preview/widgets";

export const metadata: Metadata = { title: "Demo • Estoque — FerrazCode" };

const nav = [
  { label: "Painel", icon: <LayoutDashboard size={18} />, active: true },
  { label: "Produtos", icon: <Package size={18} /> },
  { label: "Entradas", icon: <PackagePlus size={18} /> },
  { label: "Saídas", icon: <PackageMinus size={18} /> },
  { label: "Alertas", icon: <TriangleAlert size={18} /> },
  { label: "Fornecedores", icon: <Users size={18} /> },
  { label: "Relatórios", icon: <ChartColumn size={18} /> },
  { label: "Configurações", icon: <Settings size={18} /> },
];

type Produto = { nome: string; cat: string; atual: number; min: number; preco: string };

const produtos: Produto[] = [
  { nome: "Camiseta Básica Preta", cat: "Vestuário", atual: 4, min: 15, preco: "R$ 39,90" },
  { nome: "Tênis Runner 42", cat: "Calçados", atual: 23, min: 8, preco: "R$ 299,00" },
  { nome: "Boné Trucker", cat: "Acessórios", atual: 2, min: 10, preco: "R$ 59,90" },
  { nome: "Calça Jeans Slim", cat: "Vestuário", atual: 18, min: 12, preco: "R$ 159,90" },
  { nome: "Meia Esportiva (par)", cat: "Acessórios", atual: 6, min: 20, preco: "R$ 19,90" },
  { nome: "Jaqueta Corta-Vento", cat: "Vestuário", atual: 31, min: 10, preco: "R$ 219,00" },
  { nome: "Mochila Urbana", cat: "Acessórios", atual: 7, min: 8, preco: "R$ 189,00" },
];

function status(atual: number, min: number): "crit" | "low" | "ok" {
  if (atual <= min * 0.4) return "crit";
  if (atual < min) return "low";
  return "ok";
}

const movimentacoes = [
  { tipo: "saida", produto: "Tênis Runner 42", qtd: "-3", quando: "há 12 min", ref: "Venda #1042" },
  { tipo: "entrada", produto: "Camiseta Básica Preta", qtd: "+50", quando: "há 1 hora", ref: "NF 8841" },
  { tipo: "saida", produto: "Boné Trucker", qtd: "-2", quando: "há 2 horas", ref: "Venda #1041" },
  { tipo: "saida", produto: "Mochila Urbana", qtd: "-1", quando: "há 3 horas", ref: "Venda #1039" },
  { tipo: "entrada", produto: "Jaqueta Corta-Vento", qtd: "+20", quando: "ontem", ref: "NF 8830" },
];

export default function EstoqueDemo() {
  const alertas = produtos.filter((p) => status(p.atual, p.min) !== "ok");

  return (
    <DemoShell system="StockWise" tagline="Controle de estoque" accent="emerald" nav={nav}>
      {/* Indicadores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Boxes size={20} />} iconClass="text-emerald-400" label="Produtos cadastrados" value="348" hint="12 categorias" />
        <StatCard icon={<ChartColumn size={20} />} iconClass="text-emerald-400" label="Valor em estoque" value="R$ 89,4 mil" hint="custo dos produtos" />
        <StatCard icon={<TriangleAlert size={20} />} iconClass="text-red-400" label="Alertas de mínimo" value="7" hint="precisam de reposição" />
        <StatCard icon={<PackageMinus size={20} />} iconClass="text-violet-400" label="Saídas hoje" value="52" hint="itens vendidos" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Produtos */}
        <Panel
          title="Produtos"
          className="lg:col-span-2"
          action={<span className="text-xs text-white/40">{produtos.length} itens</span>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/40">
                <tr className="border-b border-white/10">
                  <th className="pb-3 pr-4 font-medium">Produto</th>
                  <th className="pb-3 pr-4 font-medium">Categoria</th>
                  <th className="pb-3 pr-4 font-medium">Estoque</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const s = status(p.atual, p.min);
                  const bar = Math.min((p.atual / (p.min * 1.5)) * 100, 100);
                  const barColor = s === "crit" ? "bg-red-500" : s === "low" ? "bg-amber-500" : "bg-emerald-500";
                  return (
                    <tr key={p.nome} className="border-b border-white/5 last:border-0">
                      <td className="py-3 pr-4">
                        <div className="font-medium">{p.nome}</div>
                        <div className="text-xs text-white/40">{p.preco}</div>
                      </td>
                      <td className="py-3 pr-4 text-white/60">{p.cat}</td>
                      <td className="py-3 pr-4">
                        <div className="mb-1 flex items-center gap-1 text-xs">
                          <span className="font-medium text-white/80">{p.atual}</span>
                          <span className="text-white/30">/ mín. {p.min}</span>
                        </div>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${bar}%` }} />
                        </div>
                      </td>
                      <td className="py-3">
                        {s === "crit" ? (
                          <Badge tone="red">Crítico</Badge>
                        ) : s === "low" ? (
                          <Badge tone="amber">Baixo</Badge>
                        ) : (
                          <Badge tone="green">Em dia</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Alertas */}
        <Panel title="Repor com urgência" action={<TriangleAlert size={16} className="text-red-400" />}>
          <div className="space-y-2.5">
            {alertas.map((p) => {
              const s = status(p.atual, p.min);
              return (
                <div key={p.nome} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{p.nome}</div>
                    <div className="text-xs text-white/40">
                      {p.atual} em estoque • mínimo {p.min}
                    </div>
                  </div>
                  {s === "crit" ? <Badge tone="red">Crítico</Badge> : <Badge tone="amber">Baixo</Badge>}
                </div>
              );
            })}
            <button className="mt-2 w-full rounded-xl bg-emerald-500/15 py-2.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition-colors hover:bg-emerald-500/25">
              + Gerar pedido de compra
            </button>
          </div>
        </Panel>
      </div>

      {/* Movimentações */}
      <div className="mt-6">
        <Panel title="Movimentações recentes">
          <div className="space-y-1">
            {movimentacoes.map((m, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg ${
                      m.tipo === "entrada" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {m.tipo === "entrada" ? <PackagePlus size={17} /> : <PackageMinus size={17} />}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{m.produto}</div>
                    <div className="text-xs text-white/40">{m.ref} • {m.quando}</div>
                  </div>
                </div>
                <span className={`font-mono font-semibold ${m.tipo === "entrada" ? "text-emerald-400" : "text-red-400"}`}>
                  {m.qtd}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  );
}
