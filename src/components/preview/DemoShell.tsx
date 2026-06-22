import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Bell, Search, CircleUser, Sparkles } from "lucide-react";
import { Appear } from "./widgets";

export type Accent = "cyan" | "amber" | "emerald" | "violet" | "rose" | "blue";

type NavItem = { label: string; icon: ReactNode; active?: boolean };

const accents: Record<
  Accent,
  { text: string; bg: string; grad: string; dot: string }
> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/15", grad: "from-cyan-500 to-blue-600", dot: "bg-cyan-400" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/15", grad: "from-amber-500 to-orange-600", dot: "bg-amber-400" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/15", grad: "from-emerald-500 to-green-600", dot: "bg-emerald-400" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/15", grad: "from-violet-500 to-fuchsia-600", dot: "bg-violet-400" },
  rose: { text: "text-rose-400", bg: "bg-rose-500/15", grad: "from-rose-500 to-pink-600", dot: "bg-rose-400" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/15", grad: "from-blue-500 to-indigo-600", dot: "bg-blue-400" },
};

type Props = {
  system: string;
  tagline: string;
  accent: Accent;
  nav: NavItem[];
  children: ReactNode;
};

/** Moldura de "aplicativo" (sidebar + topo) usada pelas demonstrações. */
export function DemoShell({ system, tagline, accent, nav, children }: Props) {
  const a = accents[accent];

  return (
    <div className="min-h-screen bg-[#0a0b12] text-white">
      <div className="flex">
        {/* Barra lateral */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0d0e18] md:flex">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${a.grad} font-bold text-white`}>
              {system.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold leading-none">{system}</div>
              <div className="mt-1 truncate text-xs text-white/40">{tagline}</div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {nav.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  item.active ? `${a.bg} ${a.text} font-medium` : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={18} /> Voltar ao site
            </Link>
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0b12]/80 px-5 py-3.5 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <Link
                href="/preview"
                className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white md:hidden"
                aria-label="Voltar"
              >
                <ArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="font-semibold leading-none">{system}</h1>
                <p className="mt-1 hidden text-xs text-white/40 sm:block">Demonstração • dados fictícios</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/40 lg:flex">
                <Search size={15} /> Buscar...
              </div>
              <button className="relative rounded-lg p-2 text-white/50 hover:bg-white/5" aria-label="Notificações">
                <Bell size={18} />
                <span className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ${a.dot}`} />
              </button>
              <CircleUser size={26} className="text-white/50" />
            </div>
          </header>

          <main className="p-5 md:p-8">
            <Appear>{children}</Appear>
          </main>
        </div>
      </div>

      {/* CTA fixo — "quero um igual" */}
      <Link
        href="/contato"
        className={`group fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${a.grad} px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/40 transition-transform hover:scale-105`}
      >
        <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">Quero um igual para meu negócio</span>
        <span className="sm:hidden">Quero um igual</span>
      </Link>

      {/* Faixa "isto é uma demo" */}
      <div className="border-t border-white/10 bg-[#0d0e18] px-6 py-3 text-center text-xs text-white/35">
        Demonstração da <span className="font-semibold text-white/60">FerrazCode</span> — dados fictícios.{" "}
        <Link href="/contato" className={`font-medium ${a.text} hover:underline`}>
          Quero um sistema assim →
        </Link>
      </div>
    </div>
  );
}
