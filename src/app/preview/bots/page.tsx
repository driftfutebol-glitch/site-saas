import type { Metadata } from "next";
import {
  LayoutDashboard,
  MessageSquare,
  Workflow,
  Send,
  Bot,
  Headset,
  ChartColumn,
  Settings,
  CheckCheck,
  Smile,
} from "lucide-react";
import { DemoShell } from "@/components/preview/DemoShell";
import { StatCard, Panel, Badge, Donut } from "@/components/preview/widgets";

export const metadata: Metadata = { title: "Demo • Bots de Atendimento — FerrazCode" };

const nav = [
  { label: "Painel", icon: <LayoutDashboard size={18} />, active: true },
  { label: "Conversas", icon: <MessageSquare size={18} /> },
  { label: "Fluxos do bot", icon: <Workflow size={18} /> },
  { label: "WhatsApp", icon: <Send size={18} /> },
  { label: "Telegram", icon: <Send size={18} /> },
  { label: "Atendentes", icon: <Headset size={18} /> },
  { label: "Relatórios", icon: <ChartColumn size={18} /> },
  { label: "Configurações", icon: <Settings size={18} /> },
];

const conversas = [
  { nome: "Marina Souza", canal: "WhatsApp", cor: "bg-emerald-400", msg: "Perfeito, pode confirmar o pedido!", hora: "agora", status: "bot" },
  { nome: "Carlos Lima", canal: "Telegram", cor: "bg-sky-400", msg: "Vocês entregam no Gonzaga?", hora: "2 min", status: "humano" },
  { nome: "Pizzaria #4821", canal: "WhatsApp", cor: "bg-emerald-400", msg: "Quero 2 pizzas grandes", hora: "5 min", status: "bot" },
  { nome: "Bruno Dias", canal: "Discord", cor: "bg-violet-400", msg: "Como funciona o suporte?", hora: "8 min", status: "bot" },
  { nome: "Ana Paula", canal: "WhatsApp", cor: "bg-emerald-400", msg: "Obrigada! 😄", hora: "12 min", status: "resolvido" },
];

const canais = [
  { nome: "WhatsApp", valor: 612, cor: "bg-emerald-500" },
  { nome: "Telegram", valor: 158, cor: "bg-sky-500" },
  { nome: "Discord", valor: 72, cor: "bg-violet-500" },
];

const chat = [
  { from: "bot", text: "Olá! 👋 Sou o assistente da Pizzaria Bella. Como posso ajudar?" },
  { from: "chips", chips: ["🍕 Cardápio", "🛵 Fazer pedido", "🕐 Horário"] },
  { from: "user", text: "Quero fazer um pedido" },
  { from: "bot", text: "Boa! 😋 Qual pizza você quer?" },
  { from: "user", text: "1 Calabresa grande" },
  { from: "bot", text: "Anotado: 1x Calabresa G — R$ 49,90. Mais alguma coisa?" },
  { from: "user", text: "Só isso 🙏" },
  { from: "bot", text: "Pedido confirmado! Entrega em ~40 min. 🎉" },
] as const;

export default function BotsDemo() {
  return (
    <DemoShell system="ZapBot" tagline="Atendimento automático" accent="violet" nav={nav}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<MessageSquare size={20} />} iconClass="text-violet-400" label="Conversas hoje" value="842" hint="+18% vs. ontem" />
        <StatCard icon={<Bot size={20} />} iconClass="text-violet-400" label="Resolvidas pelo bot" value="82%" hint="sem atendente" />
        <StatCard icon={<CheckCheck size={20} />} iconClass="text-emerald-400" label="1ª resposta" value="8s" hint="tempo médio" />
        <StatCard icon={<Headset size={20} />} iconClass="text-amber-400" label="Em fila (humano)" value="5" hint="aguardando atendente" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Celular com a conversa */}
        <Panel title="Conversa ao vivo" action={<Badge tone="violet">WhatsApp</Badge>}>
          <Phone />
        </Panel>

        {/* Conversas recentes */}
        <Panel title="Conversas recentes" className="lg:col-span-2">
          <div className="space-y-2">
            {conversas.map((c) => (
              <div key={c.nome} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                    {c.nome.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{c.nome}</span>
                      <span className="flex items-center gap-1 text-[11px] text-white/40">
                        <span className={`h-2 w-2 rounded-full ${c.cor}`} /> {c.canal}
                      </span>
                    </div>
                    <p className="truncate text-sm text-white/50">{c.msg}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {c.status === "bot" && <Badge tone="violet">🤖 Bot</Badge>}
                  {c.status === "humano" && <Badge tone="amber">Atendente</Badge>}
                  {c.status === "resolvido" && <Badge tone="green">Resolvido</Badge>}
                  <div className="mt-1 text-[11px] text-white/40">{c.hora}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Resolução automática">
          <div className="flex items-center justify-center">
            <Donut
              value={82}
              strokeClass="stroke-violet-400"
              center={
                <div>
                  <div className="text-2xl font-bold">82%</div>
                  <div className="text-xs text-white/40">pelo bot</div>
                </div>
              }
            />
          </div>
        </Panel>

        <Panel title="Canais" className="lg:col-span-2">
          <div className="space-y-4 pt-1">
            {canais.map((c) => {
              const max = Math.max(...canais.map((x) => x.valor));
              return (
                <div key={c.nome}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${c.cor}`} /> {c.nome}
                    </span>
                    <span className="text-white/50">{c.valor} conversas</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full ${c.cor}`} style={{ width: `${(c.valor / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 pt-2 text-sm text-white/50">
              <Smile size={16} className="text-emerald-400" /> Satisfação dos clientes:{" "}
              <span className="font-semibold text-white">4,8/5</span> ⭐
            </div>
          </div>
        </Panel>
      </div>
    </DemoShell>
  );
}

function Phone() {
  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4 border-white/10 bg-[#0b141a] shadow-2xl">
      {/* topo do whatsapp */}
      <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold">
          <Bot size={18} />
        </span>
        <div>
          <div className="text-sm font-semibold leading-none">Pizzaria Bella</div>
          <div className="mt-1 text-[11px] text-emerald-400">online • bot</div>
        </div>
      </div>

      {/* mensagens */}
      <div className="space-y-2 bg-[#0b141a] px-3 py-4">
        {chat.map((m, i) => {
          if (m.from === "chips") {
            return (
              <div key={i} className="flex flex-wrap justify-start gap-1.5 pl-1">
                {m.chips!.map((c) => (
                  <span key={c} className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300">
                    {c}
                  </span>
                ))}
              </div>
            );
          }
          const isUser = m.from === "user";
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  isUser ? "rounded-br-sm bg-emerald-700/70 text-white" : "rounded-bl-sm bg-white/10 text-white/90"
                }`}
              >
                {m.text}
                {isUser && <CheckCheck size={13} className="ml-1 inline text-sky-300" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* input */}
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
        <div className="flex-1 rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/40">Mensagem...</div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600">
          <Send size={15} />
        </span>
      </div>
    </div>
  );
}
