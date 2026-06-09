import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Differentiators } from "@/components/Differentiators";
import { FreeTrial } from "@/components/FreeTrial";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <Services />
      <Differentiators />
      <FreeTrial />
      <CTA />
    </>
  );
}
