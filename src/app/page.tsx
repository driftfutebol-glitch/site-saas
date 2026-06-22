import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { TechStack } from "@/components/TechStack";
import { Services } from "@/components/Services";
import { Automation } from "@/components/Automation";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Differentiators } from "@/components/Differentiators";
import { FreeTrial } from "@/components/FreeTrial";
import { Faq } from "@/components/Faq";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TechStack />
      <Services />
      <Automation />
      <SavingsCalculator />
      <Differentiators />
      <FreeTrial />
      <Faq />
      <CTA />
    </>
  );
}
