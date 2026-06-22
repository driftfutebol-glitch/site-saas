import { stats } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function Stats() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass border-gradient lift glow-hover rounded-2xl px-4 py-6 text-center">
              <div className="text-gradient text-3xl font-bold md:text-4xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
