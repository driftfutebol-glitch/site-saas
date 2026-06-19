const items = [
  "Automação de Processos",
  "Estacionamento",
  "Restaurante",
  "Controle de Estoque",
  "Programador Fullstack",
  "Criação de Sites",
  "Apps Desktop (.exe)",
  "Bots WhatsApp & Telegram",
  "Economia de tempo",
  "Sistemas sob medida",
  "Segurança de verdade",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={`flex w-max items-center gap-10 whitespace-nowrap will-change-transform ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {row.map((t, i) => (
        <span key={i} className="flex items-center gap-10 text-lg font-medium text-muted">
          {t}
          <span className="text-brand">✦</span>
        </span>
      ))}
    </div>
  );
}

/** Duas faixas de palavras deslizando em sentidos opostos (loop perfeito). */
export function Marquee() {
  return (
    <section className="relative space-y-4 overflow-hidden border-y border-white/5 py-6">
      <Row />
      <Row reverse />
      {/* desbotamento nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06060c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06060c] to-transparent" />
    </section>
  );
}
