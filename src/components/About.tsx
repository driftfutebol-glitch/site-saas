import { about } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section className="px-5 py-12 md:py-16">
      <Reveal className="mx-auto max-w-3xl">
        <p className="text-balance text-2xl font-medium leading-snug md:text-3xl">
          {about.intro}
        </p>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
