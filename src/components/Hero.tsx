"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  return (
    <section id="topo" className="relative px-5 pt-36 pb-20 md:pt-44 md:pb-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
            <Sparkles size={15} className="text-cyan" />
            Software house • sistemas sob medida
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          Transformamos sua ideia em{" "}
          <span className="text-gradient">software de verdade</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted md:text-xl"
        >
          {site.tagline}. Sistemas de gestão, sites e aplicativos desktop —
          rápidos, bonitos e <span className="text-white">seguros contra invasões</span>.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <Link
              href="/contato"
              className="group glow-brand inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
            >
              Começar meu projeto
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Link
            href="/servicos"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver soluções
          </Link>
        </motion.div>

        <motion.p variants={item} className="mt-5 text-sm text-muted">
          🎁 Teste grátis de até 15 dias · sem compromisso
        </motion.p>
      </motion.div>

      {/* Mockup de janela de código (flutua suavemente) */}
      <div className="animate-float-gentle mx-auto mt-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="border-gradient glow-brand overflow-hidden rounded-2xl"
        >
          <div className="glass">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-xs text-muted">sistema.ts — {site.name}</span>
          </div>
          <pre className="overflow-x-auto p-5 text-left font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-fuchsia">const</span>{" "}
              <span className="text-cyan">negocio</span> = {"{"}
              {"\n"}
              {"  "}seguro<span className="text-muted">:</span>{" "}
              <span className="text-green-300">true</span>,
              {"\n"}
              {"  "}rapido<span className="text-muted">:</span>{" "}
              <span className="text-green-300">true</span>,
              {"\n"}
              {"  "}bonito<span className="text-muted">:</span>{" "}
              <span className="text-green-300">true</span>,
              {"\n"}
              {"  "}feitoPra<span className="text-muted">:</span>{" "}
              <span className="text-yellow-200">&quot;voce&quot;</span>,
              {"\n"}
              {"}"};
              {"\n\n"}
              <span className="text-fuchsia">export default</span>{" "}
              <span className="text-cyan">negocio</span>;
            </code>
          </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
