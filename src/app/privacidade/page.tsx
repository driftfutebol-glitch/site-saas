import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Política de Privacidade — ${site.name}`,
  description: "Como a FerrazCode coleta, usa e protege os seus dados.",
};

const sections = [
  {
    h: "1. Quais dados coletamos",
    p: "Coletamos apenas o que você nos envia espontaneamente pelos formulários de contato e cadastro — como nome, e-mail, telefone e a descrição do seu projeto. Quando você cria uma conta, guardamos também o seu e-mail e uma versão criptografada da sua senha.",
  },
  {
    h: "2. Como usamos seus dados",
    p: "Usamos seus dados para responder ao seu contato, elaborar orçamentos, prestar o serviço contratado e dar suporte. Não vendemos nem alugamos seus dados para terceiros.",
  },
  {
    h: "3. Armazenamento e segurança",
    p: "Seus dados ficam armazenados em servidores seguros. Senhas são sempre criptografadas e adotamos boas práticas contra acessos indevidos, injeção de código e vazamentos.",
  },
  {
    h: "4. Cookies",
    p: "Usamos apenas cookies essenciais para manter você conectado à sua conta e para o funcionamento básico do site. Não usamos cookies para publicidade invasiva.",
  },
  {
    h: "5. Seus direitos (LGPD)",
    p: "Você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados. É só nos chamar pelos canais de contato e atendemos o pedido.",
  },
  {
    h: "6. Contato",
    p: `Dúvidas sobre privacidade? Fale com a gente pelo e-mail ${site.email} ou pelo WhatsApp ${site.phone}.`,
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Transparência"
        title={
          <>
            Política de <span className="text-gradient">Privacidade</span>
          </>
        }
        subtitle="A gente leva a sério a proteção dos seus dados. Aqui está, de forma simples, o que fazemos com eles."
      />
      <section className="px-5 pb-20">
        <Reveal className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm text-muted">Última atualização: junho de 2026.</p>
          {sections.map((s) => (
            <div key={s.h} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
            </div>
          ))}
          <p className="text-xs text-muted/70">
            Este documento é um resumo claro das nossas práticas e pode ser ajustado conforme a
            evolução dos nossos serviços.
          </p>
        </Reveal>
      </section>
    </>
  );
}
