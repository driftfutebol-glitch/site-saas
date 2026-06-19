import type { MetadataRoute } from "next";

const BASE = "https://site-saas-zeta.vercel.app";

/**
 * Gera /robots.txt — libera as páginas públicas e mantém as áreas
 * privadas (admin, conta, sistemas, API) fora dos buscadores.
 * (A segurança real dessas áreas é a autenticação no servidor; isto é só SEO/privacidade.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/conta", "/sistema/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
