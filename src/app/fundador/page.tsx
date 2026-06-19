import type { Metadata } from "next";
import { founder, site } from "@/lib/site";
import { FounderHero } from "@/components/founder/FounderHero";
import { FounderStory } from "@/components/founder/FounderStory";
import { FounderExpertise } from "@/components/founder/FounderExpertise";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: `${founder.name} — Fundador da ${site.name}`,
  description: founder.short,
  openGraph: {
    title: `${founder.name} — Fundador da ${site.name}`,
    description: founder.short,
    type: "profile",
    locale: "pt_BR",
  },
};

export default function FundadorPage() {
  return (
    <>
      <FounderHero />
      <FounderStory />
      <FounderExpertise />
      <CTA />
    </>
  );
}
