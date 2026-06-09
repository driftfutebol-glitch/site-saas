import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: `Serviços — ${site.name}`,
  description: "Sistemas de estacionamento, restaurante, estoque, sites e apps desktop sob medida.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="O que fazemos"
        title={
          <>
            Soluções para <span className="text-gradient">cada negócio</span>
          </>
        }
        subtitle="Do estacionamento ao restaurante, do estoque ao app desktop — construímos a ferramenta certa para você."
      />
      <Services showHeading={false} />
      <Process />
      <CTA />
    </>
  );
}
