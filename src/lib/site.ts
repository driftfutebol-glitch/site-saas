/**
 * Configuração central do site.
 * Edite AQUI para mudar nome da empresa, contatos, serviços e textos.
 * (Assim você não precisa caçar texto espalhado pelos componentes.)
 */

export const site = {
  name: "FerrazCode",
  tagline: "Software sob medida e automações que devolvem o seu tempo",
  description:
    "Sistemas de gestão, sites, apps desktop e automações feitos do zero por um desenvolvedor fullstack — rápidos, bonitos e seguros.",
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
    icon: "Workflow",
    title: "Automação de Processos",
    description:
      "Tarefas repetitivas no automático: relatórios, planilhas, e-mails e integração entre sistemas. Você economiza horas toda semana.",
    features: ["Robôs que fazem o trabalho chato", "Integração entre sistemas", "Menos erro, mais tempo livre"],
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
    title: "Segurança levada a sério",
    description:
      "Senhas criptografadas, proteção contra invasões e injection, e validação em todo dado que entra. O básico bem feito.",
  },
  {
    icon: "Zap",
    title: "Rápido de verdade",
    description:
      "Stack moderna (Next.js + React) com carregamento abaixo de 1 segundo. Nada de tela travando ou rodinha girando.",
  },
  {
    icon: "Layers",
    title: "Fullstack do início ao fim",
    description:
      "Do banco de dados ao último pixel, é tudo cuidado pela mesma pessoa. Nada se perde entre fornecedores.",
  },
  {
    icon: "Headset",
    title: "Você fala direto comigo",
    description:
      "Sem intermediário, sem fila, sem robô. Quem atende é o Pedro — a mesma pessoa que programa o seu sistema.",
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
  { value: "+10h", label: "Economizadas por semana" },
  { value: "24/7", label: "Sistemas no ar" },
  { value: "0", label: "Brechas conhecidas" },
];

/** Links principais do menu de navegação (Navbar). */
export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/planos", label: "Planos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

/** Itens do menu suspenso "Soluções" (Navbar). */
export const solutionsMenu = [
  {
    href: "/preview",
    label: "Demonstrações ao vivo",
    desc: "Veja os sistemas funcionando de verdade",
    icon: "Play",
  },
  {
    href: "/servicos#automacao",
    label: "Automação de processos",
    desc: "Economize horas toda semana",
    icon: "Workflow",
  },
  {
    href: "/servicos",
    label: "Sistemas sob medida",
    desc: "Estacionamento, restaurante, estoque e mais",
    icon: "Sparkles",
  },
  {
    href: "/fundador",
    label: "Conheça o fundador",
    desc: "Quem vai desenvolver o seu projeto",
    icon: "User",
  },
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
    "Como desenvolvimento fullstack, cuidamos de tudo: a interface bonita que o cliente vê, o servidor e o banco de dados por trás, e as automações que tiram as tarefas repetitivas do seu caminho.",
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

/* ============================================================
   FUNDADOR — Pedro Ferraz
   ============================================================ */

export const founder = {
  name: "Pedro Ferraz",
  initials: "PF",
  role: "Fundador & Desenvolvedor Fullstack",
  location: "Baixada Santista, SP",
  eyebrow: "Quem está por trás do código",
  headline: "Transformo ideias em software que economiza o seu tempo.",
  short:
    "Sou o Pedro, fundador da FerrazCode. Programo do banco de dados ao último pixel — e automatizo tudo que for repetitivo pra você focar no que importa.",
  /** Parágrafos da história (página /fundador). */
  story: [
    "Tudo começou com curiosidade. Eu queria entender como os sistemas que a gente usa todo dia funcionam por dentro — e quando descobri que dava pra construir os meus, virou paixão. Hoje é o que eu faço: pego uma ideia da cabeça de alguém e transformo em um sistema que funciona de verdade.",
    "Trabalho como desenvolvedor fullstack. Na prática, isso quer dizer que cuido do que o cliente vê (a interface bonita, rápida e fácil de usar) e do que ninguém vê (o servidor, o banco de dados e a segurança). É o pacote completo, feito por uma pessoa só que se importa com cada detalhe.",
    "Minha obsessão é automação. Se uma tarefa é repetitiva, ela não deveria roubar o seu tempo. Eu desenho sistemas que fazem o trabalho chato no automático — relatórios, planilhas, mensagens, integrações — pra você focar no que realmente importa: o seu negócio.",
    "A FerrazCode é o meu jeito de levar software de qualidade pra quem normalmente não teria acesso a isso. Sem template genérico, sem promessa vazia. Só código limpo, seguro e feito sob medida pra você.",
  ],
  signature: "É só me chamar. A primeira conversa é por minha conta.",
};

export type StackGroup = {
  icon: string;
  title: string;
  items: string[];
};

/** Stack fullstack do Pedro (página /fundador). */
export const founderStack: StackGroup[] = [
  {
    icon: "Palette",
    title: "Front-end",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Animações & UI"],
  },
  {
    icon: "Server",
    title: "Back-end",
    items: ["Node.js", "APIs & rotas", "Autenticação segura", "Regras de negócio"],
  },
  {
    icon: "Database",
    title: "Banco & Infra",
    items: ["PostgreSQL", "Modelagem de dados", "Deploy & hospedagem", "Backups"],
  },
  {
    icon: "Workflow",
    title: "Automação & Bots",
    items: ["Bots de WhatsApp & Telegram", "Integrações entre sistemas", "Rotinas automáticas", "Apps desktop (.exe)"],
  },
];

export type FounderValue = {
  icon: string;
  title: string;
  description: string;
};

/** Princípios de trabalho do Pedro (página /fundador). */
export const founderValues: FounderValue[] = [
  {
    icon: "Clock",
    title: "Seu tempo é sagrado",
    description:
      "Automatizo o que for repetitivo. Se o computador pode fazer, você não deveria estar fazendo na mão.",
  },
  {
    icon: "ShieldCheck",
    title: "Segurança em primeiro lugar",
    description:
      "Trato os dados do seu negócio como se fossem meus: criptografados, validados e protegidos contra invasão.",
  },
  {
    icon: "Heart",
    title: "Feito com cuidado",
    description:
      "Nada de copiar e colar template. Cada projeto é pensado, desenhado e ajustado até ficar do seu jeito.",
  },
  {
    icon: "MessageSquare",
    title: "Conversa de gente",
    description:
      "Você fala comigo direto, sem termo técnico complicado e sem fila de atendimento. Simples assim.",
  },
];
