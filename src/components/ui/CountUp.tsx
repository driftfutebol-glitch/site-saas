"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Anima um número de 0 até o valor final quando ele entra na tela.
 * Aceita valores com texto: "100%", "24/7", "<1s", "0" — anima só a parte numérica.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parts = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(parts ? `${parts[1]}0${parts[3]}` : value);

  useEffect(() => {
    if (!parts || !inView) return;
    const prefix = parts[1];
    const target = parseFloat(parts[2]);
    const suffix = parts[3];
    const decimals = (parts[2].split(".")[1] ?? "").length;

    let raf = 0;
    let startTime = 0;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return <span ref={ref}>{parts ? display : value}</span>;
}
