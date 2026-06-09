import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
};

/** Cabeçalho padrão das páginas internas (com espaço para a navbar fixa). */
export function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative px-5 pt-36 pb-12 text-center md:pt-44 md:pb-16">
      <Reveal className="mx-auto max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-balance text-5xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted">{subtitle}</p>
        )}
      </Reveal>
    </section>
  );
}
