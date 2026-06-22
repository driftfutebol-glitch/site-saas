"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, MapPin, Mail, MessageCircle } from "lucide-react";
import { founder, site } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { FounderAvatar } from "@/components/founder/FounderAvatar";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function FounderHero() {
  return (
    <section className="relative px-5 pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[auto_1fr]">
        <FounderAvatar initials={founder.initials} variant="purple" />

        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-brand"
          >
            {founder.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-3 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
          >
            {founder.name.split(" ")[0]}{" "}
            <span className="text-gradient">{founder.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-foreground/90">
              <Code2 size={15} className="text-cyan" />
              {founder.role}
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-muted">
              <MapPin size={15} className="text-fuchsia" />
              {founder.location}
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-lg text-muted">
            {founder.short}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/contato"
                className="group shine glow-brand inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Falar comigo
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={18} className="text-cyan" />
              WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail size={18} className="text-fuchsia" />
              E-mail
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
