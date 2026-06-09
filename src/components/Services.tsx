"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="servicos" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow="O que fazemos"
            title="Soluções para cada tipo de negócio"
            subtitle="Do estacionamento ao restaurante, do estoque ao app desktop — construímos a ferramenta certa pra você."
          />
        )}

        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <TiltCard className="group glass border-gradient overflow-hidden rounded-2xl p-7">
                {/* brilho no hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan/10 text-brand ring-1 ring-white/10">
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>

                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check size={15} className="text-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
