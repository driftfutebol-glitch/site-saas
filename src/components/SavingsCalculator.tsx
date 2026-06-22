"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, PiggyBank, CalendarDays, Calculator, MessageCircle } from "lucide-react";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Anima um número de um valor para outro toda vez que o alvo muda. */
function useTween(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (from === to) return;
    let raf = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setValue(current);
      fromRef.current = current;
      if (t < 1) raf = requestAnimationFrame(step);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const costOptions = [25, 40, 60, 90];

export function SavingsCalculator() {
  const [hours, setHours] = useState(10); // horas/semana em tarefas repetitivas
  const [people, setPeople] = useState(2); // pessoas no processo
  const [cost, setCost] = useState(40); // custo médio por hora (R$)

  // ~70% do trabalho repetitivo vira automático
  const manualHoursMonth = hours * 4.33 * people;
  const savedHoursMonth = Math.round(manualHoursMonth * 0.7);
  const savedMoneyMonth = savedHoursMonth * cost;
  const savedMoneyYear = savedMoneyMonth * 12;
  const freeDays = savedHoursMonth / 8;

  const tHours = useTween(savedHoursMonth);
  const tMonth = useTween(savedMoneyMonth);
  const tYear = useTween(savedMoneyYear);
  const tDays = useTween(freeDays);

  let message = "Já dá pra tirar um peso das suas costas todo mês.";
  if (savedMoneyYear >= 40000) message = "Isso muda o patamar do seu negócio. 🚀";
  else if (savedMoneyYear >= 12000) message = "Isso é quase um funcionário a mais — de graça.";
  else if (savedMoneyYear >= 4000) message = "Dá pra reinvestir no seu negócio o ano todo.";

  // Abre o WhatsApp já com o resultado do teste preenchido.
  const waText = `Olá! Fiz o teste de economia no site da ${site.name} 👋

Minha rotina hoje:
• ${hours}h por semana em tarefas repetitivas
• ${people} pessoa(s) nesse trabalho
• Custo médio de R$${cost}/hora

Resultado estimado com automação:
• ${savedHoursMonth}h livres por mês
• ${brl(savedMoneyMonth)} por mês
• ${brl(savedMoneyYear)} por ano

Quero economizar esse tempo. Bora conversar?`;
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <section id="calculadora" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Faça o teste · 30 segundos"
          title="Quanto a automação economiza pra você?"
          subtitle="Mexa nos controles e veja, na hora, o tempo e o dinheiro que você ganha de volta."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Controles */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass border-gradient rounded-3xl p-7 md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-cyan/15 text-brand ring-1 ring-white/10">
                <Calculator size={20} />
              </span>
              <h3 className="text-lg font-semibold">Conte sobre a sua rotina</h3>
            </div>

            {/* Horas/semana */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label className="text-sm text-foreground/90">
                  Horas por semana em tarefas repetitivas
                </label>
                <span className="text-gradient font-mono text-lg font-bold">{hours}h</span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="range mt-3"
                aria-label="Horas por semana em tarefas repetitivas"
              />
            </div>

            {/* Pessoas */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label className="text-sm text-foreground/90">
                  Pessoas que fazem esse trabalho
                </label>
                <span className="text-gradient font-mono text-lg font-bold">{people}</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="range mt-3"
                aria-label="Pessoas que fazem esse trabalho"
              />
            </div>

            {/* Custo/hora */}
            <div className="mt-8">
              <label className="text-sm text-foreground/90">Custo médio por hora</label>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {costOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCost(c)}
                    className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
                      cost === c
                        ? "border-brand/60 bg-brand/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06]"
                    }`}
                  >
                    R${c}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-7 text-xs text-muted">
              * Estimativa baseada em automatizar ~70% do trabalho repetitivo. Os números reais a
              gente levanta junto com você, sem compromisso.
            </p>
          </motion.div>

          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="border-gradient animate-glow-pulse relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-surface p-7 md:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand/20 blur-3xl" />

            <span className="relative text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              O seu resultado
            </span>

            {/* Destaque: por ano */}
            <div className="relative mt-3">
              <div className="text-muted text-sm">Você economiza por ano</div>
              <div className="text-gradient mt-1 text-5xl font-extrabold tracking-tight md:text-6xl">
                {brl(tYear)}
              </div>
            </div>

            {/* Mini-cards */}
            <div className="relative mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <Clock size={18} className="text-cyan" />
                <div className="mt-2 text-2xl font-bold">{Math.round(tHours)}h</div>
                <div className="text-xs text-muted">livres por mês</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <PiggyBank size={18} className="text-fuchsia" />
                <div className="mt-2 text-2xl font-bold">{brl(tMonth)}</div>
                <div className="text-xs text-muted">por mês</div>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <CalendarDays size={18} className="text-brand" />
                <div className="mt-2 text-2xl font-bold">
                  {tDays.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} dias
                </div>
                <div className="text-xs text-muted">úteis de trabalho recuperados todo mês</div>
              </div>
            </div>

            <p className="relative mt-5 text-balance font-medium">{message}</p>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group shine glow-brand relative mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
              Quero economizar esse tempo
            </a>
            <p className="relative mt-3 text-center text-xs text-muted">
              Abre o WhatsApp com o seu resultado já preenchido.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
