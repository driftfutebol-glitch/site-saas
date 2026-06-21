"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { AuthForm } from "@/components/AuthForm";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";

type Props = {
  mode: "login" | "signup";
  /** Lado do formulário */
  title: ReactNode;
  subtitle?: string;
  /** Lado do showcase (esquerda) */
  eyebrow: string;
  headline: string;
  benefits: string[];
  initialError?: string;
};

/** Tela de autenticação moderna (showcase + formulário) usada em /login e /registrar. */
export function AuthShell({
  mode,
  title,
  subtitle,
  eyebrow,
  headline,
  benefits,
  initialError,
}: Props) {
  return (
    <section className="relative px-5 pt-28 pb-20 md:pt-32 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="border-gradient glow-brand mx-auto grid max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2"
      >
        {/* Showcase */}
        <div className="relative hidden flex-col justify-between gap-10 overflow-hidden bg-gradient-to-br from-surface-2 to-surface p-10 lg:flex">
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div className="animate-float-slow pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
          <div className="animate-float-slow-2 pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cyan/15 blur-3xl" />

          <div className="relative">
            <LogoMark
              idSuffix="auth"
              className="h-12 w-12 drop-shadow-[0_4px_14px_rgba(124,58,237,0.45)]"
            />
            <span className="mt-7 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {eyebrow}
            </span>
            <h2 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight">
              {headline}
            </h2>
          </div>

          <ul className="relative space-y-3.5">
            {benefits.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: EASE }}
                className="flex items-center gap-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="text-foreground/90">{b}</span>
              </motion.li>
            ))}
          </ul>

          <p className="relative text-sm text-muted">
            {site.name} — software sob medida, seguro e feito com cuidado.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white/[0.02] p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
          <div className="mt-7">
            <AuthForm mode={mode} initialError={initialError} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
