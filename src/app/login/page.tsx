import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: `Entrar — ${site.name}`,
  description: "Acesse a sua conta.",
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Bem-vindo de volta"
        title={
          <>
            Entrar na <span className="text-gradient">sua conta</span>
          </>
        }
        subtitle="Acesse seu painel para acompanhar seus projetos."
      />
      <AuthForm mode="login" />
    </>
  );
}
