"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Clock, Workflow } from "lucide-react";
import { EASE } from "@/lib/motion";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Tarefas que viram automáticas — usadas no painel animado da direita. */
const tasks = [
  { label: "Relatórios mensais", before: "3 h", after: "2 min", fill: 8 },
  { label: "Atualizar planilhas", before: "5 h/sem", after: "no automático", fill: 4 },
  { label: "Responder no WhatsApp", before: "2 h/dia", after: "bot 24 h", fill: 12 },
  { label: "Enviar e-mails e avisos", before: "1 h/dia", after: "1 clique", fill: 6 },
];

const perks = [
  "Robôs que fazem o trabalho repetitivo por você",
  "Sistemas diferentes conversando entre si",
  "Menos erro humano, mais consistência",
  "Sua equipe livre pra focar no que importa",
];

export function Automation({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="automacao" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Automação de processos"
            title="Pare de fazer na mão o que o robô faz por você"
            subtitle="Eu mapeio as tarefas repetitivas do seu dia e coloco o computador pra trabalhar no seu lugar."
          />
        )}

        <div className={`grid items-center gap-10 lg:grid-cols-2 ${showHeading ? "mt-14" : ""}`}>
          {/* Texto + benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
              <Workflow size={15} className="text-cyan" />
              Tempo é dinheiro — e o seu é precioso
            </span>
            <h3 className="mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              O trabalho chato no <span className="text-gradient">piloto automático</span>
            </h3>
            <p className="mt-4 text-balance text-muted">
              Se uma tarefa se repete toda semana, ela não deveria roubar o seu tempo. Eu
              construo a automação que faz isso por você — e some do seu caminho.
            </p>

            <ul className="mt-7 space-y-3">
              {perks.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{p}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/contato"
              className="group shine glow-brand mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              Quero automatizar meu negócio
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Painel animado: tempo recuperado */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="border-gradient animate-glow-pulse relative overflow-hidden rounded-3xl"
          >
            <div className="glass p-6 md:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-cyan/15 text-cyan ring-1 ring-white/10">
                  <Clock size={20} />
                </span>
                <div>
                  <div className="text-sm font-semibold">Tempo que você recupera</div>
                  <div className="text-xs text-muted">antes de automatizar · depois</div>
                </div>
              </div>

              <div className="relative mt-7 space-y-5">
                {tasks.map((t, i) => (
                  <div key={t.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/90">{t.label}</span>
                      <span className="text-muted">
                        <span className="text-muted/60 line-through">{t.before}</span>{" "}
                        <span className="font-mono text-cyan">→ {t.after}</span>
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.fill}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
                        className="h-full rounded-full bg-gradient-to-r from-brand to-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-7 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <span className="text-sm text-muted">Economia média por semana</span>
                <span className="text-gradient text-3xl font-bold">
                  <CountUp value="+10h" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
