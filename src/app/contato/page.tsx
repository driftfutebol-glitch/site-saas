import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: `Contato — ${site.name}`,
  description: "Conte sua ideia e peça um orçamento sem compromisso.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Vamos conversar"
        title={
          <>
            Conte sua <span className="text-gradient">ideia</span>
          </>
        }
        subtitle="Resposta rápida. Sem compromisso, sem robô do outro lado."
      />
      <Contact showHeading={false} />
    </>
  );
}
