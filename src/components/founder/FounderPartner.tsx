"use client";

import { motion, type Variants } from "framer-motion";
import { Megaphone, Users } from "lucide-react";
import { partner, partnerExpertise } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FounderAvatar } from "@/components/founder/FounderAvatar";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function FounderPartner() {
  return (
    <>
      {/* Separador "a dupla" */}
      <div className="px-5 pt-8">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
            <Users size={15} className="text-cyan" />
            {partner.eyebrow}
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>
      </div>

      {/* Apresentação do sócio (layout invertido: texto + avatar) */}
      <section className="relative px-5 pt-10 pb-12 md:pb-16">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto]">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 lg:order-1"
          >
            <motion.span
              variants={item}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan"
            >
              O sócio
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-3 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            >
              {partner.name}
            </motion.h2>

            <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-2">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-foreground/90">
                <Megaphone size={15} className="text-cyan" />
                {partner.role}
              </span>
            </motion.div>

            <motion.p variants={item} className="mt-6 max-w-xl text-balance text-lg text-muted">
              {partner.short}
            </motion.p>

            <motion.div variants={item} className="mt-6 space-y-4 border-l border-white/10 pl-6">
              {partner.story.map((p, i) => (
                <p key={i} className="text-muted">
                  {p}
                </p>
              ))}
            </motion.div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <FounderAvatar initials={partner.initials} variant="cyan" />
          </div>
        </div>
      </section>

      {/* Especialidades do Andrei */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="O que o Andrei traz"
            title="Tráfego, IA e design que vendem"
            subtitle="Enquanto o Pedro constrói, o Andrei faz o seu negócio ser visto e desejado."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerExpertise.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <TiltCard className="group glass border-gradient h-full overflow-hidden rounded-2xl p-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-brand/10 text-cyan ring-1 ring-white/10">
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
    </>
  );
}
