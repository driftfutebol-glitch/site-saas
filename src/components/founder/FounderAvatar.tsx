"use client";

import { motion } from "framer-motion";
import { founder } from "@/lib/site";
import { EASE } from "@/lib/motion";

/**
 * Avatar/monograma animado do fundador:
 * anel de gradiente girando, pontos em órbita e o disco de vidro com as iniciais.
 * (Sem foto de banco de imagens — limpo e 100% sob medida.)
 */
export function FounderAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto h-60 w-60 shrink-0 md:h-64 md:w-64"
    >
      {/* brilho de fundo */}
      <div className="animate-pulse-soft absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.4),transparent_65%)] blur-2xl" />

      {/* anel de gradiente girando */}
      <div
        className="animate-spin-slow absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #7c3aed, #22d3ee, #e879f9, #7c3aed)",
        }}
      />
      {/* recorte escuro (deixa só a borda do anel) */}
      <div className="absolute inset-[4px] rounded-full bg-[#06060c]" />

      {/* disco de vidro com as iniciais */}
      <div className="glass absolute inset-[11px] grid place-items-center rounded-full">
        <span className="text-gradient text-7xl font-extrabold tracking-tighter md:text-8xl">
          {founder.initials}
        </span>
      </div>

      {/* pontos em órbita */}
      <div className="animate-spin-slow-reverse absolute inset-0">
        <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_14px_2px_rgba(34,211,238,0.8)]" />
      </div>
      <div className="animate-spin-slow absolute inset-0">
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-fuchsia shadow-[0_0_14px_2px_rgba(232,121,249,0.8)]" />
      </div>
    </motion.div>
  );
}
