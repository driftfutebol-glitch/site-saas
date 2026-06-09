import type { Variants } from "framer-motion";

/**
 * Curva de easing suave (cubic-bezier "ease-out-expo").
 * Tipada como tupla de 4 números — o Framer Motion v12 exige esse formato exato.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Animação padrão: surge de baixo com fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
