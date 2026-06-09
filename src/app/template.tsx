"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * template.tsx re-renderiza a cada navegação — usamos para animar a
 * transição suave (fade + leve subida + blur) ao trocar de página.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
