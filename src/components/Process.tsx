import { steps } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="processo" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Como funciona"
            title="Do primeiro 'oi' até o sistema rodando"
            subtitle="Um processo simples e transparente, sem enrolação."
          />
        )}

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* linha de conexão (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.1} className="relative">
              <div className="glass border-gradient relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold">
                <span className="text-gradient">{s.number}</span>
              </div>
              <h3 className="mt-5 text-center text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-muted">
                {s.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
