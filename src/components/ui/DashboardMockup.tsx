"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { EASE } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Número que conta de 0 até o valor (formatado em pt-BR)             */
/* ------------------------------------------------------------------ */
function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [n, setN] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) {
      setN(value);
      return;
    }
    // Trava de segurança: o número real SEMPRE aparece, mesmo se a animação não rodar.
    const deadline = setTimeout(() => {
      doneRef.current = true;
      setN(value);
    }, duration + 400);
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (doneRef.current) return;
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        doneRef.current = true;
        clearTimeout(deadline);
      }
    };
    if (inView) raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(deadline);
    };
  }, [inView, value, duration]);

  const formatted = n.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Dados                                                              */
/* ------------------------------------------------------------------ */
const navIcons = [
  { Icon: LayoutDashboard, active: true },
  { Icon: BarChart3, active: false },
  { Icon: Wallet, active: false },
  { Icon: ShoppingCart, active: false },
  { Icon: Users, active: false },
  { Icon: Settings, active: false },
];

const kpis = [
  {
    label: "Receita Total",
    value: 24850,
    decimals: 2,
    prefix: "R$ ",
    delta: "12.5%",
    featured: true,
  },
  { label: "Vendas", value: 184, decimals: 0, prefix: "", delta: "8.2%", featured: false },
  { label: "Clientes", value: 73, decimals: 0, prefix: "", delta: "15.3%", featured: false },
];

// gráfico de linha (Jan–Jun)
const chartX = [34, 89.6, 145.2, 200.8, 256.4, 312];
const chartY = [80, 65, 70, 45, 35, 15];
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const linePath = chartX.map((x, i) => `${i === 0 ? "M" : "L"}${x},${chartY[i]}`).join(" ");
const areaPath = `${linePath} L312,110 L34,110 Z`;
const yLabels = ["50k", "40k", "30k", "20k", "10k"];

// donut de categorias
const categories = [
  { label: "Eletrônicos", pct: 35, color: "#8b5cf6" },
  { label: "Roupas", pct: 25, color: "#22d3ee" },
  { label: "Casa & Decoração", pct: 20, color: "#e879f9" },
  { label: "Beleza & Saúde", pct: 10, color: "#34d399" },
  { label: "Outros", pct: 10, color: "#64748b" },
];

/* ------------------------------------------------------------------ */
/*  Componente principal                                              */
/* ------------------------------------------------------------------ */
export function DashboardMockup() {
  let cumulative = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="border-gradient glow-brand relative w-full overflow-hidden rounded-2xl"
    >
      <div className="glass flex">
        {/* Sidebar */}
        <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-white/5 py-4 sm:flex">
          <div className="mb-3 grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan text-xs font-bold text-white">
            F
          </div>
          {navIcons.map(({ Icon, active }, i) => (
            <div
              key={i}
              className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                active ? "bg-white/10 text-cyan" : "text-muted/60"
              }`}
            >
              <Icon size={16} />
            </div>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="min-w-0 flex-1 p-4 md:p-5">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <span className="truncate">Olá, Pedro!</span>
                <span aria-hidden>👋</span>
              </div>
              <p className="truncate text-[11px] text-muted">Confira o resumo do seu sistema</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-muted">
                <Search size={14} />
              </div>
              <div className="relative grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-muted">
                <Bell size={14} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-fuchsia" />
              </div>
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-xs font-bold text-white">
                P
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: EASE }}
                className={`rounded-xl border p-2.5 ${
                  k.featured
                    ? "border-cyan/30 bg-cyan/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="truncate text-[10px] text-muted">{k.label}</div>
                <div className="mt-1 truncate text-sm font-bold md:text-base">
                  <AnimatedNumber
                    value={k.value}
                    decimals={k.decimals}
                    prefix={k.prefix}
                  />
                </div>
                <div className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300">
                  <TrendingUp size={9} />
                  {k.delta}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gráficos */}
          <div className="mt-3 grid gap-2.5 md:grid-cols-[1.6fr_1fr]">
            {/* Faturamento mensal */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold">Faturamento mensal</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] text-muted">
                  Este ano
                  <ChevronDown size={10} />
                </span>
              </div>

              <svg viewBox="0 0 320 130" className="mt-2 w-full" role="img" aria-label="Gráfico de faturamento mensal">
                <defs>
                  <linearGradient id="dash-line" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                  <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                  </linearGradient>
                </defs>

                {/* grid + labels Y */}
                {yLabels.map((l, i) => {
                  const yy = 18 + i * 23;
                  return (
                    <g key={l}>
                      <line x1="34" y1={yy} x2="312" y2={yy} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <text x="28" y={yy + 3} textAnchor="end" className="fill-muted" style={{ fontSize: 8 }}>
                        {l}
                      </text>
                    </g>
                  );
                })}

                {/* área */}
                <motion.path
                  d={areaPath}
                  fill="url(#dash-area)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
                />
                {/* linha */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="url(#dash-line)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
                />
                {/* ponto final */}
                <motion.circle
                  cx={chartX[5]}
                  cy={chartY[5]}
                  r="3.5"
                  fill="#22d3ee"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.7, ease: EASE }}
                />

                {/* labels X */}
                {months.map((m, i) => (
                  <text key={m} x={chartX[i]} y="124" textAnchor="middle" className="fill-muted" style={{ fontSize: 8 }}>
                    {m}
                  </text>
                ))}
              </svg>
            </div>

            {/* Vendas por categoria */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-[11px] font-semibold">Vendas por categoria</span>
              <div className="mt-1 flex items-center gap-3">
                <svg viewBox="0 0 100 100" className="h-[68px] w-[68px] shrink-0 -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                  {categories.map((c) => {
                    const frac = c.pct / 100;
                    const rot = cumulative * 360;
                    cumulative += frac;
                    return (
                      <motion.circle
                        key={c.label}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke={c.color}
                        strokeWidth="12"
                        strokeLinecap="butt"
                        transform={`rotate(${rot} 50 50)`}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: frac }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, delay: 0.7, ease: EASE }}
                      />
                    );
                  })}
                </svg>

                <ul className="min-w-0 flex-1 space-y-1">
                  {categories.map((c) => (
                    <li key={c.label} className="flex items-center gap-1.5 text-[9px] text-muted">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} />
                      <span className="truncate">{c.label}</span>
                      <span className="ml-auto font-semibold text-foreground/80">{c.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
