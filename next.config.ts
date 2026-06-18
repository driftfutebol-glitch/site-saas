import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança aplicados a todas as páginas.
 * Protegem contra clickjacking, MIME sniffing e vazamento de informação.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Só tem efeito em HTTPS (produção). Inofensivo em localhost.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Não revela ao mundo que o site roda em Next.js.
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Próximo passo de segurança: adicionar uma Content-Security-Policy (CSP).
  // Deixei fora por enquanto porque uma CSP mal configurada quebra o site —
  // vale configurar com calma quando for pra produção.
};

export default nextConfig;
