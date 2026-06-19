import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, founder } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { About } from "@/components/About";
import { Differentiators } from "@/components/Differentiators";
import { Stats } from "@/components/Stats";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: `Sobre — ${site.name}`,
  description: `Conheça a ${site.name}: software sob medida, código limpo e segurança levada a sério.`,
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title={
          <>
            Sobre a <span className="text-gradient">{site.name}</span>
          </>
        }
        subtitle="Software sob medida, feito por quem se importa de verdade com o seu negócio."
      />
      <About />

      {/* Teaser do fundador */}
      <section className="px-5 py-8">
        <Reveal className="mx-auto max-w-3xl">
          <Link
            href="/fundador"
            className="group glass border-gradient flex items-center gap-5 rounded-2xl p-6 transition-colors hover:bg-white/[0.06]"
          >
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-cyan text-xl font-extrabold text-white">
              {founder.initials}
            </span>
            <span className="flex-1">
              <span className="text-lg font-semibold">Conheça o {founder.name.split(" ")[0]}</span>
              <span className="mt-1 block text-sm text-muted">
                {founder.role} — a pessoa que vai cuidar do seu projeto do início ao fim.
              </span>
            </span>
            <ArrowRight
              size={20}
              className="shrink-0 text-cyan transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      <Differentiators />
      <Stats />
      <CTA />
    </>
  );
}
