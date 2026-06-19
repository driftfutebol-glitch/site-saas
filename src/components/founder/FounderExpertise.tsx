"use client";

import { motion } from "framer-motion";
import { founderStack, founderValues } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FounderExpertise() {
  return (
    <>
      {/* Stack fullstack */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Fullstack de verdade"
            title="Do banco de dados ao último pixel"
            subtitle="Cuido do projeto inteiro sozinho — por isso nada se perde no caminho."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {founderStack.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <TiltCard className="group glass border-gradient h-full overflow-hidden rounded-2xl p-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan/10 text-cyan ring-1 ring-white/10">
                    <Icon name={group.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((it) => (
                      <li key={it} className="text-sm text-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como eu trabalho */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="No que eu acredito"
            title="Como eu trabalho"
            subtitle="Quatro princípios que guiam cada projeto que sai daqui."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {founderValues.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="glass rounded-2xl p-6 transition-colors hover:bg-white/[0.06]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia/20 to-brand/10 text-fuchsia ring-1 ring-white/10">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
