import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Termos de Uso — ${site.name}`,
  description: "As regras para uso do site e dos serviços da FerrazCode.",
};

const sections = [
  {
    h: "1. Sobre estes termos",
    p: `Ao usar o site da ${site.name} e contratar nossos serviços, você concorda com os termos abaixo. Eles existem para deixar tudo claro e justo para os dois lados.`,
  },
  {
    h: "2. Nossos serviços",
    p: "Desenvolvemos sistemas, sites, aplicativos desktop, automações e bots sob medida. O escopo, o prazo e o valor de cada projeto são definidos e aprovados por escrito antes do início.",
  },
  {
    h: "3. Teste grátis de 15 dias",
    p: "O teste grátis de até 15 dias vale para demonstrações, protótipos ou a versão inicial do projeto. Sistemas completos e personalizados são liberados após a aprovação do orçamento e a assinatura do contrato.",
  },
  {
    h: "4. Pagamentos",
    p: "Os projetos têm uma taxa de implementação e, quando aplicável, uma mensalidade que cobre domínio, hospedagem, atualizações e suporte. Os valores são combinados antes de começar, sem cobranças surpresa.",
  },
  {
    h: "5. Propriedade e entregas",
    p: "Após a quitação, o sistema entregue é seu. Podemos manter trechos de código genéricos e bibliotecas reutilizáveis que fazem parte do nosso ferramental.",
  },
  {
    h: "6. Responsabilidades",
    p: "Entregamos com qualidade e segurança, mas não nos responsabilizamos por mau uso, alterações feitas por terceiros ou indisponibilidade de serviços externos (como provedores de hospedagem ou APIs de terceiros).",
  },
  {
    h: "7. Contato",
    p: `Ficou com dúvida sobre os termos? Fale com a gente pelo e-mail ${site.email} ou pelo WhatsApp ${site.phone}.`,
  },
];

export default function TermosPage() {
  return (
    <>
      <PageHero
        eyebrow="Regras claras"
        title={
          <>
            Termos de <span className="text-gradient">Uso</span>
          </>
        }
        subtitle="Sem letra miúda. Aqui estão, de forma direta, as regras para usar o site e contratar a FerrazCode."
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
            Este é um resumo dos nossos termos. Para projetos contratados, vale o contrato de
            prestação de serviço assinado entre as partes.
          </p>
        </Reveal>
      </section>
    </>
  );
}
