import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: `Criar conta — ${site.name}`,
  description: "Crie sua conta grátis em menos de um minuto.",
};

export default function RegistrarPage() {
  return (
    <>
      <PageHero
        eyebrow="Comece agora"
        title={
          <>
            Crie sua <span className="text-gradient">conta grátis</span>
          </>
        }
        subtitle="Leva menos de um minuto. Sem cartão, sem compromisso."
      />
      <AuthForm mode="signup" />
    </>
  );
}
