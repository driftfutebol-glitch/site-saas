"use client";

import { usePathname } from "next/navigation";
import { Background } from "@/components/ui/Background";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/Navbar";

/**
 * Moldura do site (fundo, cursor, barra de progresso, navbar).
 * Some nas páginas de demonstração (/preview/*) para elas parecerem apps reais.
 */
export function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/preview") || pathname.startsWith("/sistema")) return null;

  return (
    <>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
    </>
  );
}
