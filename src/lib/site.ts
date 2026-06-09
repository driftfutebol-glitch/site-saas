/**
 * Configuração central do site.
 * Edite AQUI para mudar nome da empresa, contatos, serviços e textos.
 * (Assim você não precisa caçar texto espalhado pelos componentes.)
 */

export const site = {
  name: "FerrazCode",
  tagline: "Software sob medida que impulsiona o seu negócio",
  description:
    "Sistemas de gestão, sites e aplicativos desktop feitos do zero — rápidos, bonitos e seguros.",
  email: "driftfutebol@gmail.com",
  phone: "+55 (13) 97421-2579",
  whatsapp: "5513974212579",
  location: "Baixada Santista (presencial) e online para todo o Brasil",
  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
  },
} as const;

export type Service = {
  icon: string; // nome do ícone (lucide-react)
  title: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    icon: "Car",
    title: "Sistema de Estacionamento",
    description:
      "Gestão completa de vagas, tickets, mensalistas e pagamentos — tudo em tempo real.",
    features: ["Controle de vagas", "Tickets & mensalistas", "Relatórios de faturamento"],
  },
  {
    icon: "UtensilsCrossed",
    title: "Sistema para Restaurantes",
    description:
      "Comandas, mesas, pedidos, cozinha e delivery integrados num painel único.",
    features: ["Comandas e mesas", "Integração com a cozinha", "Delivery & cardápio digital"],
  },
  {
    icon: "Boxes",
    title: "Controle de Estoque",
    description:
      "Entradas, saídas, alertas de mínimo e relatórios inteligentes, sem planilha bagunçada.",
    features: ["Entradas e saídas", "Alertas automáticos", "Relatórios e dashboards"],
  },
  {
    icon: "Globe",
    title: "Criação de Sites",
    description:
      "Sites e landing pages rápidos, modernos e otimizados para aparecer no Google.",
    features: ["Design responsivo", "SEO otimizado", "Performance de elite"],
  },
  {
    icon: "AppWindow",
    title: "Aplicativos Desktop (.exe)",
    description:
      "Programas para Windows com instalador próprio, funcionando até sem internet.",
    features: ["Instalador .exe", "Funciona offline", "Atualizações automáticas"],
  },
  {
    icon: "MessageSquare",
    title: "Bots & Atendimento Automático",
    description:
      "Bots para WhatsApp, Telegram e Discord que atendem seus clientes 24h por dia, sem você levantar um dedo.",
    features: ["Bot de WhatsApp", "Bot de Telegram e Discord", "Atendimento automático 24h"],
  },
  {
    icon: "Sparkles",
    title: "Sistemas Sob Medida",
    description:
      "Tem uma ideia diferente? A gente desenha e desenvolve do zero, do seu jeito.",
    features: ["Levantamento de requisitos", "Desenvolvimento dedicado", "Suporte contínuo"],
  },
];

export type Differentiator = {
  icon: string;
  title: string;
  description: string;
};

export const differentiators: Differentiator[] = [
  {
    icon: "ShieldCheck",
    title: "Segurança de verdade",
    description:
      "Proteção contra SQL injection, XSS e invasões. Validação rigorosa em todo dado que entra.",
  },
  {
    icon: "Zap",
    title: "Performance de elite",
    description:
      "Stack moderna (Next.js + React) com carregamento instantâneo e experiência fluida.",
  },
  {
    icon: "Layers",
    title: "Código limpo e escalável",
    description:
      "Arquitetura organizada que cresce junto com o seu negócio, sem virar uma bagunça.",
  },
  {
    icon: "Headset",
    title: "Suporte humano",
    description:
      "Você fala direto com quem desenvolve. Nada de robô ou fila de atendimento sem fim.",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Conversa inicial",
    description: "Entendemos seu problema e o que o sistema precisa resolver de verdade.",
  },
  {
    number: "02",
    title: "Proposta e escopo",
    description: "Você recebe prazo, valor e exatamente o que será entregue — sem surpresa.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description: "Construímos com você acompanhando o progresso em cada etapa.",
  },
  {
    number: "04",
    title: "Entrega e suporte",
    description: "Implantação, treinamento e suporte contínuo para o seu time.",
  },
];

export const stats = [
  { value: "100%", label: "Código sob medida" },
  { value: "24/7", label: "Sistemas no ar" },
  { value: "<1s", label: "Tempo de carregamento" },
  { value: "0", label: "Brechas conhecidas" },
];

/** Links do menu de navegação (usados na Navbar e no Rodapé). */
export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/preview", label: "Demos" },
  { href: "/planos", label: "Planos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export type Plan = {
  name: string;
  tagline: string;
  monthly: string; // valor da mensalidade sem "R$". Ex: "97" ou "A combinar"
  setupNote: string; // taxa de implementação. Ex: "+ implementação a partir de R$ 897"
  trialNote: string; // destaque do teste. Ex: "1º mês grátis"
  featured: boolean;
  features: string[];
  cta: string;
};

/**
 * Planos (modelo de MENSALIDADE) exibidos na página /planos.
 * A mensalidade cobre domínio, hospedagem, atualizações semanais e suporte.
 * ⚠️ Os valores são um ponto de partida — ajuste para os seus preços reais aqui.
 */
export const plans: Plan[] = [
  {
    name: "Essencial",
    tagline: "Pra tirar a ideia do papel",
    monthly: "97",
    setupNote: "+ implementação a partir de R$ 897",
    trialNote: "1º mês grátis",
    featured: false,
    features: [
      "1 site ou sistema",
      "Domínio + hospedagem inclusos",
      "Atualizações toda semana",
      "Painel de administração",
      "Suporte por WhatsApp",
    ],
    cta: "Começar",
  },
  {
    name: "Profissional",
    tagline: "O mais escolhido",
    monthly: "197",
    setupNote: "+ implementação a partir de R$ 1.797",
    trialNote: "1º mês grátis",
    featured: true,
    features: [
      "Tudo do Essencial",
      "Funcionalidades sob medida",
      "Bots p/ WhatsApp, Telegram e Discord",
      "Login seguro + níveis de acesso",
      "Relatórios e dashboards",
      "Suporte 24 horas",
    ],
    cta: "Quero esse",
  },
  {
    name: "Empresarial",
    tagline: "Sob medida, sem limites",
    monthly: "A combinar",
    setupNote: "Implementação sob orçamento",
    trialNote: "1º mês grátis",
    featured: false,
    features: [
      "Projeto 100% personalizado",
      "Vários sistemas integrados",
      "App desktop (.exe) incluso",
      "Atualizações semanais prioritárias",
      "Suporte 24h dedicado",
    ],
    cta: "Falar com especialista",
  },
];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "Como funciona a cobrança?",
    a: "Você paga a implementação do seu projeto e ganha o 1º mês grátis. Depois, uma mensalidade (a combinar) que cobre domínio, hospedagem, atualizações toda semana e suporte. Os valores são um ponto de partida e sempre combinados antes de começar — sem surpresa.",
  },
  {
    q: "Quanto tempo leva pra ficar pronto?",
    a: "Um site simples sai em poucos dias. Sistemas completos costumam levar de 2 a 6 semanas, dependendo do escopo. Você acompanha o progresso em cada etapa.",
  },
  {
    q: "Vocês dão suporte depois de entregar?",
    a: "Sim, e de verdade. A mensalidade inclui atendimento (24 horas nos planos maiores) e atualizações toda semana para manter o seu sistema sempre no ar, seguro e melhorando.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Segurança é prioridade: validação rigorosa, proteção contra invasões e injection, senhas criptografadas e backups. Seu negócio e seus clientes protegidos.",
  },
  {
    q: "Posso começar pequeno e crescer depois?",
    a: "Com certeza. A gente constrói pensando no futuro — dá pra começar enxuto e ir adicionando funcionalidades conforme seu negócio cresce.",
  },
];

export const about = {
  intro:
    "A FerrazCode nasceu de uma ideia simples: software de qualidade não devia ser privilégio de grande empresa.",
  paragraphs: [
    "Criamos sistemas sob medida para negócios reais — estacionamentos, restaurantes, lojas e muito mais. Nada de template genérico: cada projeto é desenhado para resolver o SEU problema.",
    "Aqui você fala direto com quem desenvolve. Sem intermediário, sem fila de atendimento. Isso significa decisões rápidas, código limpo e um sistema que realmente encaixa no seu dia a dia.",
    "E, acima de tudo, levamos segurança a sério. Cada linha é escrita pensando em proteger o seu negócio e os seus clientes.",
  ],
};

/** Oferta de teste grátis (destaque na Home e na página de Planos). */
export const trial = {
  days: 15,
  eyebrow: "Teste grátis",
  title: "Experimente 15 dias. Por nossa conta.",
  subtitle:
    "A gente prepara o seu projeto com a sua ideia e entrega para você usar de verdade por até 15 dias, sem pagar nada. Gostou? Aí a gente negocia a melhor condição pra você.",
  steps: [
    { title: "Conte sua ideia", description: "Você explica o que precisa. Sem compromisso." },
    { title: "A gente desenvolve", description: "Preparamos o seu projeto sob medida, do seu jeito." },
    { title: "Teste 15 dias grátis", description: "Use de verdade. Só fecha negócio se gostar." },
  ],
  cta: "Quero meu teste grátis",
  note: "Sem cartão de crédito. Sem pegadinha.",
};
