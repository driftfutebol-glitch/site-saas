import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="px-5 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="border-gradient glow-brand relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-surface px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
          <h2 className="relative text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Pronto pra tirar sua ideia do papel?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-balance text-lg text-muted">
            Conte o que seu negócio precisa. A primeira conversa é gratuita e sem compromisso.
          </p>
          <Link
            href="/contato"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-105"
          >
            Falar com a gente agora
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
