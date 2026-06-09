import { faq } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** FAQ usando <details> nativo — acessível e sem JavaScript no cliente. */
export function Faq() {
  return (
    <section className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />

        <div className="mt-12 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="glass group rounded-2xl p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-2xl leading-none text-brand transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
