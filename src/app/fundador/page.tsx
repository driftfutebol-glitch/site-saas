import type { Metadata } from "next";
import { founder, partner, site } from "@/lib/site";
import { FounderHero } from "@/components/founder/FounderHero";
import { FounderStory } from "@/components/founder/FounderStory";
import { FounderExpertise } from "@/components/founder/FounderExpertise";
import { FounderPartner } from "@/components/founder/FounderPartner";
import { CTA } from "@/components/CTA";

const description = `${founder.name} e ${partner.name}, os sócios da ${site.name}: desenvolvimento fullstack, automação, tráfego pago, IA e design — o pacote completo pro seu negócio.`;

export const metadata: Metadata = {
  title: `Sócios — ${founder.name} & ${partner.name} | ${site.name}`,
  description,
  openGraph: {
    title: `Sócios — ${founder.name} & ${partner.name} | ${site.name}`,
    description,
    type: "profile",
    locale: "pt_BR",
  },
};

export default function FundadorPage() {
  return (
    <>
      <FounderHero />
      <FounderStory />
      <FounderPartner />
      <FounderExpertise />
      <CTA />
    </>
  );
}
