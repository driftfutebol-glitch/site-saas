import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Minus, X, Wifi, Volume2, Power } from "lucide-react";
import { Appear } from "./widgets";

type Props = {
  app: string;
  menu: string[];
  status: string;
  children: ReactNode;
};

/**
 * Moldura de "aplicativo de Windows" — para a demonstração do app desktop (.exe).
 * Mostra a janela flutuando sobre uma área de trabalho, com barra de tarefas.
 */
export function DesktopWindow({ app, menu, status, children }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0b14]">
      {/* papel de parede */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.20),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(99,102,241,0.20),transparent_45%)]" />

      <Link
        href="/preview"
        className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Voltar ao site
      </Link>

      {/* a janela do programa */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-3 pb-16 pt-16 md:p-6 md:pb-20 md:pt-16">
        <Appear className="w-full max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-[#11131d] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
            {/* barra de título */}
            <div className="flex items-center justify-between bg-[#1a1d2b] px-3 py-2.5">
              <div className="flex items-center gap-2.5 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white">
                  F
                </span>
                <span className="font-medium">{app}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="grid h-7 w-9 place-items-center rounded text-white/50 transition-colors hover:bg-white/10" aria-label="Minimizar">
                  <Minus size={15} />
                </button>
                <button className="grid h-7 w-9 place-items-center rounded text-white/50 transition-colors hover:bg-white/10" aria-label="Maximizar">
                  <span className="h-3 w-3 rounded-[2px] border border-white/60" />
                </button>
                <button className="grid h-7 w-9 place-items-center rounded text-white/50 transition-colors hover:bg-red-500 hover:text-white" aria-label="Fechar">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* barra de menu */}
            <div className="flex items-center gap-0.5 border-b border-white/10 bg-[#161824] px-2 py-1 text-[13px] text-white/60">
              {menu.map((m) => (
                <span key={m} className="cursor-default rounded px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-white">
                  {m}
                </span>
              ))}
            </div>

            {/* conteúdo do app */}
            <div className="bg-[#0e1018]">{children}</div>

            {/* barra de status */}
            <div className="flex items-center justify-between border-t border-white/10 bg-[#1a1d2b] px-4 py-1.5 text-[11px] text-white/40">
              <span>{status}</span>
              <span className="flex items-center gap-3">
                <Wifi size={12} /> <Volume2 size={12} /> Conectado
              </span>
            </div>
          </div>
        </Appear>
      </div>

      {/* barra de tarefas do windows */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/50 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <Power size={16} />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded bg-white/10 text-xs font-bold ring-1 ring-white/25">F</span>
        </div>
        <div className="text-right text-[11px] leading-tight text-white/50">
          <div>14:32</div>
          <div>09/06/2026</div>
        </div>
      </div>
    </div>
  );
}
