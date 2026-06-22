"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aparece suavemente (fade + sobe). Use para dar entrada nas seções. */
export function Appear({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Cartão de indicador — o número conta do 0 (quando começa por dígito). */
export function StatCard({
  icon,
  label,
  value,
  hint,
  iconClass = "text-white/40",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  iconClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/); // só anima quando começa por número inteiro
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const final = `${target}${suffix}`;
    // Já animou antes? Garante o valor final e sai.
    if (doneRef.current) {
      setDisplay(final);
      return;
    }
    // Trava de segurança: mostra o valor real mesmo se a animação não rodar.
    const deadline = setTimeout(() => {
      doneRef.current = true;
      setDisplay(final);
    }, 1600);
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (doneRef.current) return;
      if (!start) start = t;
      const p = Math.min((t - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">{label}</span>
        <span className={`transition-transform group-hover:scale-110 ${iconClass}`}>{icon}</span>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">{match ? display : value}</div>
      {hint && <div className="mt-1 text-xs text-white/40">{hint}</div>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <h2 className="font-semibold">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

type Tone = "green" | "red" | "amber" | "cyan" | "gray" | "blue" | "violet" | "rose";

const tones: Record<Tone, string> = {
  green: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  red: "bg-red-500/15 text-red-300 ring-red-500/30",
  amber: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
  blue: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  gray: "bg-white/10 text-white/60 ring-white/15",
};

export function Badge({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Gráfico de barras com as barras crescendo de baixo. */
export function BarChart({
  data,
  barClass,
}: {
  data: { label: string; value: number }[];
  barClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div ref={ref} className="flex h-40 items-end gap-2">
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <motion.div
              className={`w-full rounded-t-md ${barClass}`}
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            />
          </div>
          <span className="text-[11px] text-white/40">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Gráfico de rosca (donut) animado. `value` de 0 a 100. */
export function Donut({
  value,
  strokeClass = "stroke-cyan-400",
  center,
}: {
  value: number;
  strokeClass?: string;
  center?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const r = 42;
  const circ = 2 * Math.PI * r;

  return (
    <div ref={ref} className="relative grid h-36 w-36 place-items-center">
      <svg viewBox="0 0 100 100" className="h-36 w-36 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          className={strokeClass}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: inView ? circ * (1 - value / 100) : circ }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </svg>
      <div className="absolute text-center">{center}</div>
    </div>
  );
}
