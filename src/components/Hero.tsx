"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { DashboardMockup } from "@/components/ui/DashboardMockup";

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
    <section id="topo" className="relative px-5 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Texto */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
              <Sparkles size={15} className="text-cyan" />
              Desenvolvimento fullstack • Sistemas & Automação
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
          >
            Sua ideia vira{" "}
            <span className="text-gradient">software que economiza seu tempo</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted lg:mx-0"
          >
            Sistemas de gestão, sites, apps desktop e{" "}
            <span className="text-white">automações</span> feitos do zero — do banco de dados
            ao último pixel, rápidos, bonitos e <span className="text-white">seguros</span>.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Magnetic>
              <Link
                href="/contato"
                className="group shine glow-brand inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
              >
                Começar meu projeto
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href="/preview"
              className="glass group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Play size={16} className="text-cyan transition-transform group-hover:scale-110" />
              Ver demonstração
            </Link>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-sm text-muted">
            Teste grátis de até 15 dias · sem compromisso ·{" "}
            <Link href="/fundador" className="text-cyan underline-offset-4 hover:underline">
              conheça o fundador
            </Link>
          </motion.p>
        </motion.div>

        {/* Dashboard (flutua suavemente) */}
        <div>
          <div className="animate-float-gentle">
            <DashboardMockup />
          </div>
          <p className="mt-3 text-center text-xs text-muted/70">
            Demonstração com dados fictícios
          </p>
        </div>
      </div>
    </section>
  );
}
