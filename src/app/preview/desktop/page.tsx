import type { Metadata } from "next";
import { ShoppingCart, Banknote, CreditCard, QrCode, Search, Trash2, Plus, Minus } from "lucide-react";
import { DesktopWindow } from "@/components/preview/DesktopWindow";

export const metadata: Metadata = { title: "Demo • App Desktop (.exe) — FerrazCode" };

const categorias = ["Lanches", "Bebidas", "Sobremesas", "Combos"];

const produtos = [
  { nome: "X-Burger", preco: "22,90", emoji: "🍔" },
  { nome: "X-Bacon", preco: "27,90", emoji: "🥓" },
  { nome: "X-Salada", preco: "24,90", emoji: "🥗" },
  { nome: "Batata Frita", preco: "16,90", emoji: "🍟" },
  { nome: "Onion Rings", preco: "18,90", emoji: "🧅" },
  { nome: "Refrigerante", preco: "7,00", emoji: "🥤" },
  { nome: "Suco Natural", preco: "9,90", emoji: "🧃" },
  { nome: "Milk Shake", preco: "18,90", emoji: "🍦" },
  { nome: "Combo Família", preco: "89,90", emoji: "🍱" },
];

const carrinho = [
  { qtd: 2, nome: "X-Bacon", preco: "55,80" },
  { qtd: 1, nome: "Batata Frita", preco: "16,90" },
  { qtd: 2, nome: "Refrigerante", preco: "14,00" },
];

export default function DesktopDemo() {
  return (
    <DesktopWindow
      app="FerrazPDV — Ponto de Venda"
      menu={["Arquivo", "Vendas", "Estoque", "Relatórios", "Ajuda"]}
      status="Operador: Pedro Ferraz • Caixa 01 • Turno aberto às 08:00"
    >
      <div className="grid md:grid-cols-[1fr_340px]">
        {/* Produtos */}
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          {/* busca */}
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/40">
            <Search size={15} /> Buscar produto ou código de barras...
          </div>

          {/* categorias */}
          <div className="mb-4 flex flex-wrap gap-2">
            {categorias.map((c, i) => (
              <span
                key={c}
                className={`cursor-default rounded-lg px-3 py-1.5 text-sm font-medium ${
                  i === 0 ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40" : "bg-white/5 text-white/50"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* grade de produtos */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {produtos.map((p) => (
              <button
                key={p.nome}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/10"
              >
                <div className="text-2xl">{p.emoji}</div>
                <div className="mt-2 text-sm font-medium leading-tight">{p.nome}</div>
                <div className="mt-1 text-sm font-semibold text-blue-300">R$ {p.preco}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Carrinho / venda atual */}
        <div className="flex flex-col bg-[#0b0d15]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 font-semibold">
              <ShoppingCart size={18} className="text-blue-400" /> Venda atual
            </div>
            <span className="text-xs text-white/40">5 itens</span>
          </div>

          {/* itens */}
          <div className="flex-1 space-y-2 p-4">
            {carrinho.map((item) => (
              <div key={item.nome} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div className="flex items-center gap-1 rounded-md bg-white/5 p-0.5">
                  <span className="grid h-6 w-6 place-items-center rounded text-white/40 hover:bg-white/10"><Minus size={13} /></span>
                  <span className="w-5 text-center text-sm font-semibold">{item.qtd}</span>
                  <span className="grid h-6 w-6 place-items-center rounded text-white/40 hover:bg-white/10"><Plus size={13} /></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item.nome}</div>
                  <div className="text-xs text-white/40">R$ {item.preco}</div>
                </div>
                <span className="grid h-7 w-7 place-items-center rounded text-white/30 hover:bg-red-500/15 hover:text-red-400">
                  <Trash2 size={14} />
                </span>
              </div>
            ))}
          </div>

          {/* totais */}
          <div className="border-t border-white/10 p-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span>R$ 86,70</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Desconto</span>
                <span>R$ 0,00</span>
              </div>
              <div className="mt-2 flex items-end justify-between border-t border-white/10 pt-2">
                <span className="font-medium">TOTAL</span>
                <span className="text-2xl font-bold text-blue-300">R$ 86,70</span>
              </div>
            </div>

            {/* pagamento */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <PayBtn icon={<Banknote size={16} />} label="Dinheiro" hint="F2" />
              <PayBtn icon={<CreditCard size={16} />} label="Cartão" hint="F3" />
              <PayBtn icon={<QrCode size={16} />} label="PIX" hint="F4" />
            </div>
            <button className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.02]">
              Finalizar venda (F12)
            </button>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}

function PayBtn({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <button className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white">
      <span className="text-blue-300">{icon}</span>
      {label}
      <span className="text-[10px] text-white/30">{hint}</span>
    </button>
  );
}
