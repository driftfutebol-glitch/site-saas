"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Variant = "purple" | "cyan";

const variants: Record<
  Variant,
  { ring: string; glow: string; dotA: string; dotB: string }
> = {
  purple: {
    ring: "conic-gradient(from 0deg, #7c3aed, #22d3ee, #e879f9, #7c3aed)",
    glow: "rgba(124,58,237,0.4)",
    dotA: "bg-cyan shadow-[0_0_14px_2px_rgba(34,211,238,0.8)]",
    dotB: "bg-fuchsia shadow-[0_0_14px_2px_rgba(232,121,249,0.8)]",
  },
  cyan: {
    ring: "conic-gradient(from 0deg, #22d3ee, #34d399, #8b5cf6, #22d3ee)",
    glow: "rgba(34,211,238,0.4)",
    dotA: "bg-fuchsia shadow-[0_0_14px_2px_rgba(232,121,249,0.8)]",
    dotB: "bg-cyan shadow-[0_0_14px_2px_rgba(34,211,238,0.8)]",
  },
};

type Props = {
  initials: string;
  variant?: Variant;
};

/**
 * Avatar/monograma animado: anel de gradiente girando, pontos em órbita e o
 * disco de vidro com as iniciais. (Sem foto de banco de imagens — 100% sob medida.)
 */
export function FounderAvatar({ initials, variant = "purple" }: Props) {
  const v = variants[variant];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto h-60 w-60 shrink-0 md:h-64 md:w-64"
    >
      {/* brilho de fundo */}
      <div
        className="animate-pulse-soft absolute -inset-8 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${v.glow}, transparent 65%)` }}
      />

      {/* anel de gradiente girando */}
      <div
        className="animate-spin-slow absolute inset-0 rounded-full"
        style={{ background: v.ring }}
      />
      {/* recorte escuro (deixa só a borda do anel) */}
      <div className="absolute inset-[4px] rounded-full bg-[#06060c]" />

      {/* disco de vidro com as iniciais */}
      <div className="glass absolute inset-[11px] grid place-items-center rounded-full">
        <span className="text-gradient text-7xl font-extrabold tracking-tighter md:text-8xl">
          {initials}
        </span>
      </div>

      {/* pontos em órbita */}
      <div className="animate-spin-slow-reverse absolute inset-0">
        <span
          className={`absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${v.dotA}`}
        />
      </div>
      <div className="animate-spin-slow absolute inset-0">
        <span
          className={`absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${v.dotB}`}
        />
      </div>
    </motion.div>
  );
}
