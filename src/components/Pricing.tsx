"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { plans } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Planos"
            title="Preços que cabem no seu negócio"
            subtitle="Comece simples e cresça quando precisar. Sem letra miúda."
          />
        )}

        <div className={`grid items-start gap-6 lg:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className={p.featured ? "lg:-mt-4 lg:mb-4" : ""}
            >
              <TiltCard
                className={`glass flex flex-col rounded-2xl p-7 ${
                  p.featured ? "border-gradient glow-brand" : ""
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-600 to-brand px-4 py-1 text-xs font-semibold text-white">
                    Mais popular
                  </span>
                )}

              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>

              <div className="mt-5">
                <span className="inline-block rounded-full bg-cyan/15 px-3 py-1 text-xs font-semibold text-cyan">
                  🎁 {p.trialNote}
                </span>
                <div className="mt-3 flex items-end gap-1">
                  {p.monthly === "A combinar" ? (
                    <span className="text-3xl font-bold">A combinar</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">
                        <span className="align-top text-xl text-muted">R$ </span>
                        {p.monthly}
                      </span>
                      <span className="mb-1 text-sm text-muted">/mês</span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted">{p.setupNote}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contato"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.featured
                    ? "glow-brand bg-gradient-to-r from-brand-600 to-brand text-white"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {p.cta}
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Todos os planos incluem domínio, hospedagem, atualizações semanais e foco em segurança.
        </p>
      </div>
    </section>
  );
}
