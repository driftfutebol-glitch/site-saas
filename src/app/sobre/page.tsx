import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { About } from "@/components/About";
import { Differentiators } from "@/components/Differentiators";
import { Stats } from "@/components/Stats";
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
      <Differentiators />
      <Stats />
      <CTA />
    </>
  );
}
