"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { founder, site } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function FounderStory() {
  return (
    <section className="px-5 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Minha história
        </span>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {founder.headline}
        </h2>

        {/* linha do tempo com traço de gradiente */}
        <div className="relative mt-9 space-y-7 border-l border-white/10 pl-7">
          <span className="absolute left-0 top-1 h-24 w-px -translate-x-px bg-gradient-to-b from-brand to-transparent" />
          {founder.story.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="relative"
            >
              <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-brand to-cyan ring-4 ring-[#06060c]" />
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </motion.div>
          ))}
        </div>

        {/* assinatura / convite */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="border-gradient glow-brand relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-surface p-8 md:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
          <Quote size={36} className="text-brand" />
          <p className="relative mt-4 text-balance text-xl font-medium leading-snug md:text-2xl">
            {founder.signature}
          </p>
          <p className="mt-5 font-mono text-sm text-cyan">
            — {founder.name}, fundador da {site.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
