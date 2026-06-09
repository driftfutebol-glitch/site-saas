"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Cartão com inclinação 3D que acompanha o cursor + um reflexo de luz
 * que segue o mouse por cima. Volta ao normal ao tirar o mouse.
 */
export function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 150,
    damping: 18,
  });

  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 45%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}
