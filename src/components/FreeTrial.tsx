"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trial } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function FreeTrial() {
  return (
    <section className="px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="border-gradient glow-brand relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-surface p-8 md:p-12"
        >
          {/* brilho decorativo */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            {/* Medalhão "15 dias grátis" */}
            <div className="glow-brand mx-auto grid h-40 w-40 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-cyan text-center">
              <div>
                <div className="text-5xl font-bold leading-none text-white">{trial.days}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/90">
                  dias grátis
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {trial.eyebrow}
              </span>
              <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {trial.title}
              </h2>
              <p className="mt-3 text-balance text-muted">{trial.subtitle}</p>

              {/* Os 3 passos */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {trial.steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="text-gradient text-lg font-bold">0{i + 1}</div>
                    <div className="mt-1 text-sm font-semibold">{s.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">{s.description}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contato"
                  className="group glow-brand inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  {trial.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-sm text-muted">{trial.note}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
