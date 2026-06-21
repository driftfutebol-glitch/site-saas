import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AuthShell } from "@/components/AuthShell";

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
    <AuthShell
      mode="login"
      eyebrow="Bem-vindo de volta"
      headline="Acesse o seu painel de controle"
      benefits={[
        "Acompanhe seus projetos em tempo real",
        "Veja relatórios e dashboards",
        "Fale direto com quem desenvolve",
      ]}
      title={
        <>
          Entrar na <span className="text-gradient">sua conta</span>
        </>
      }
      subtitle="Que bom te ver de novo. Continue de onde parou."
      initialError={initialError}
    />
  );
}
