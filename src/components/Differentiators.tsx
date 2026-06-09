"use client";

import { motion } from "framer-motion";
import { differentiators, site } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Differentiators({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="diferenciais" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow={`Por que a ${site.name}`}
            title="Não é só bonito — é bem feito por dentro"
            subtitle="Beleza na frente, engenharia sólida e segura por trás."
          />
        )}

        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${showHeading ? "mt-14" : ""}`}>
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="glass rounded-2xl p-6 transition-colors hover:bg-white/[0.06]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-brand/10 text-cyan ring-1 ring-white/10">
                <Icon name={d.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
