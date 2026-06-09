const items = [
  "Estacionamento",
  "Restaurante",
  "Controle de Estoque",
  "Criação de Sites",
  "Apps Desktop (.exe)",
  "Bots WhatsApp & Telegram",
  "Sistemas sob medida",
  "Segurança de verdade",
];

/** Faixa de palavras deslizando infinitamente (loop perfeito). */
export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-6">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-medium text-muted">
            {t}
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
      {/* desbotamento nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06060c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06060c] to-transparent" />
    </section>
  );
}
