import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: `Entrar — ${site.name}`,
  description: "Acesse a sua conta.",
};

const erroMessages: Record<string, string> = {
  google_indisponivel:
    "O login com Google ainda não foi configurado. Use e-mail e senha por enquanto. 😉",
  google_state: "Sua sessão de login expirou. Tente novamente.",
  google_email: "Não foi possível confirmar seu e-mail no Google.",
  google: "Não foi possível entrar com o Google. Tente novamente.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string | string[] }>;
}) {
  const erro = (await searchParams).erro;
  const erroCode = Array.isArray(erro) ? erro[0] : erro;
  const initialError = erroCode ? erroMessages[erroCode] ?? "" : "";

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
      <AuthForm mode="login" initialError={initialError} />
    </>
  );
}
