"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/** Rodapé do site — some nas páginas de demonstração (/preview/*). */
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/preview") || pathname.startsWith("/sistema")) return null;
  return <Footer />;
}
