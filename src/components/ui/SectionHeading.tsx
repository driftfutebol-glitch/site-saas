import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-balance text-lg text-muted">{subtitle}</p>}
    </Reveal>
  );
}
