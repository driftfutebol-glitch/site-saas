import "server-only";

/**
 * Login com Google via OAuth2 (fluxo "authorization code"), implementado à mão.
 *
 * Segurança:
 *  - O `redirect_uri` é montado a partir de APP_URL (valor fixo do servidor),
 *    nunca de entrada do usuário.
 *  - O `client_secret` só existe no servidor.
 *  - Quem chama deve validar o parâmetro `state` (anti-CSRF) — ver a rota de callback.
 *  - Só confiamos no e-mail se o Google disser `email_verified === true`.
 */

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://openidconnect.googleapis.com/v1/userinfo";

export function isGoogleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

function getRedirectUri(): string {
  const base = process.env.APP_URL;
  if (!base) {
    // Em produção, falhar alto em vez de gerar um redirect_uri de localhost por engano.
    if (process.env.NODE_ENV === "production") {
      throw new Error("APP_URL não definido. Configure a URL pública no ambiente de produção.");
    }
    return "http://localhost:3000/api/auth/google/callback";
  }
  return `${base}/api/auth/google/callback`;
}

/** Monta a URL de consentimento do Google. */
export function buildGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

/** Troca o `code` recebido por um access token (no servidor). */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: getRedirectUri(),
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) throw new Error("Falha ao trocar o código pelo token do Google.");
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Resposta do Google sem access_token.");
  return data.access_token;
}

export type GoogleProfile = {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  picture: string | null;
};

/** Busca os dados do usuário no Google usando o access token. */
export async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
  const res = await fetch(USERINFO_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Falha ao buscar o perfil do Google.");

  const data = (await res.json()) as {
    sub: string;
    email: string;
    email_verified?: boolean;
    name?: string;
    picture?: string;
  };

  return {
    sub: data.sub,
    email: data.email,
    emailVerified: data.email_verified === true,
    name: data.name ?? null,
    picture: data.picture ?? null,
  };
}
