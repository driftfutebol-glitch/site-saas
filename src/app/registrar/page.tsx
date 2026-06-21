import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AuthShell } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: `Criar conta — ${site.name}`,
  description: "Crie sua conta grátis em menos de um minuto.",
};

export default function RegistrarPage() {
  return (
    <AuthShell
      mode="signup"
      eyebrow="Comece agora"
      headline="Crie sua conta grátis em 1 minuto"
      benefits={[
        "Teste grátis de até 15 dias",
        "Sem cartão de crédito, sem pegadinha",
        "Seus dados sempre protegidos",
      ]}
      title={
        <>
          Crie sua <span className="text-gradient">conta grátis</span>
        </>
      }
      subtitle="Leva menos de um minuto. Sem cartão, sem compromisso."
    />
  );
}
