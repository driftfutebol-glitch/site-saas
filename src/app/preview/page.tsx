import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  UtensilsCrossed,
  Boxes,
  MessageSquare,
  Globe,
  AppWindow,
  CalendarDays,
  Truck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Demonstrações — ${site.name}`,
  description: "Veja os sistemas da FerrazCode funcionando: estacionamento, restaurante, estoque e mais.",
};

type Demo = {
  href: string;
  icon: LucideIcon;
  name: string;
  desc: string;
  grad: string;
  live: boolean;
};

const demos: Demo[] = [
  { href: "/preview/estacionamento", icon: Car, name: "Sistema de Estacionamento", desc: "Vagas, tickets, mensalistas e faturamento em tempo real.", grad: "from-cyan-500 to-blue-600", live: true },
  { href: "/preview/restaurante", icon: UtensilsCrossed, name: "Sistema para Restaurantes", desc: "Mesas, comandas, cozinha e caixa num painel só.", grad: "from-amber-500 to-orange-600", live: true },
  { href: "/preview/estoque", icon: Boxes, name: "Controle de Estoque", desc: "Produtos, entradas/saídas, alertas de mínimo e relatórios.", grad: "from-emerald-500 to-green-600", live: true },
  { href: "/preview/bots", icon: MessageSquare, name: "Bots de Atendimento", desc: "WhatsApp, Telegram e Discord que atendem sozinhos.", grad: "from-violet-500 to-fuchsia-600", live: true },
  { href: "/preview/agendamentos", icon: CalendarDays, name: "Agendamentos", desc: "Barbearia, salão ou clínica: agenda por profissional.", grad: "from-rose-500 to-pink-600", live: true },
  { href: "/preview/desktop", icon: AppWindow, name: "App Desktop (.exe)", desc: "Programa de Windows (PDV / caixa) com instalador.", grad: "from-blue-500 to-indigo-600", live: true },
  { href: "#", icon: Globe, name: "Sites & Landing Pages", desc: "Sites rápidos, bonitos e otimizados para o Google.", grad: "from-pink-500 to-rose-600", live: false },
  { href: "#", icon: Truck, name: "Delivery & Pedidos", desc: "Cardápio digital e gestão de entregas.", grad: "from-orange-500 to-red-600", live: false },
  { href: "#", icon: TrendingUp, name: "CRM & Vendas", desc: "Funil de clientes, propostas e metas.", grad: "from-teal-500 to-emerald-600", live: false },
];

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0b12] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
            <ArrowLeft size={18} /> Voltar ao site
          </Link>
          <span className="text-sm font-semibold">
            <span className="text-white/70">Ferraz</span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Code</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60">
          Demonstrações ao vivo
        </span>
        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Veja os sistemas{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            funcionando
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-white/50">
          Clique e explore. São demonstrações reais com dados fictícios — exatamente o tipo de sistema
          que a gente cria sob medida pro seu negócio.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((d) => {
          const Icon = d.icon;
          const inner = (
            <>
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${d.grad}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{d.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{d.desc}</p>
              <div className="mt-4 text-sm font-medium">
                {d.live ? (
                  <span className="inline-flex items-center gap-1.5 text-cyan-400">
                    Abrir demonstração
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="text-white/40">Em breve</span>
                )}
              </div>
              {d.live && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  ao vivo
                </span>
              )}
            </>
          );

          return d.live ? (
            <Link
              key={d.name}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={d.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 opacity-60"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
