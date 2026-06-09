import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { FreeTrial } from "@/components/FreeTrial";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: `Planos e Preços — ${site.name}`,
  description: "Planos transparentes para sistemas, sites e apps sob medida. Comece simples e cresça quando precisar.",
};

export default function PlanosPage() {
  return (
    <>
      <PageHero
        eyebrow="Planos e preços"
        title={
          <>
            Investimento <span className="text-gradient">transparente</span>
          </>
        }
        subtitle="Escolha o ponto de partida. A gente combina tudo antes de começar — sem surpresa na conta."
      />
      <FreeTrial />
      <Pricing showHeading={false} />
      <Faq />
      <CTA />
    </>
  );
}
