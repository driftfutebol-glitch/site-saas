"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

/** Botão flutuante de WhatsApp, fixo no canto inferior direito. */
export function FloatingWhatsApp() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.name} e quero falar sobre um projeto.`,
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 16, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)]"
    >
      {/* anel pulsante */}
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40 [animation-duration:2.5s]" />
      <MessageCircle size={26} className="relative" />

      {/* rótulo no hover (desktop) */}
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-[#0c0c16] px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Fale com a gente
      </span>
    </motion.a>
  );
}
