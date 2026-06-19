import type { MetadataRoute } from "next";

const BASE = "https://site-saas-zeta.vercel.app";

const paths = [
  "",
  "/servicos",
  "/preview",
  "/preview/estacionamento",
  "/preview/restaurante",
  "/preview/estoque",
  "/preview/bots",
  "/preview/agendamentos",
  "/preview/desktop",
  "/planos",
  "/fundador",
  "/sobre",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
