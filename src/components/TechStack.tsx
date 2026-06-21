"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { BrandLogo, techs } from "@/components/ui/BrandLogo";

/** Faixa com os logos das tecnologias usadas no desenvolvimento. */
export function TechStack() {
  return (
    <section className="px-5 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Tecnologias que utilizamos
        </motion.p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-7 md:gap-x-14">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              className="group flex items-center gap-2.5"
            >
              <BrandLogo
                tech={t}
                className={`h-7 w-7 opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:h-8 md:w-8 ${
                  t.name === "react" ? "animate-spin-slow" : ""
                }`}
              />
              <span className="text-base font-medium text-muted transition-colors group-hover:text-white md:text-lg">
                {t.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
