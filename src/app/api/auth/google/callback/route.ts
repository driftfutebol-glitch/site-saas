import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { exchangeCodeForToken, fetchGoogleProfile } from "@/lib/google";
import { users } from "@/lib/db";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

/**
 * Recebe o retorno do Google. Valida o `state`, troca o código pelo perfil,
 * cria/encontra o usuário e abre a sessão.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const cookieState = req.cookies.get("oauth_state")?.value;

  const fail = (motivo: string) => {
    const res = NextResponse.redirect(new URL(`/login?erro=${motivo}`, req.url));
    res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  };

  // O usuário negou, ou veio sem código.
  if (error || !code) return fail("google");

  // Anti-CSRF: o `state` da URL precisa bater com o do cookie.
  if (!state || !cookieState || state !== cookieState) return fail("google_state");

  try {
    const accessToken = await exchangeCodeForToken(code);
    const profile = await fetchGoogleProfile(accessToken);

    // Só confiamos no e-mail se o Google confirmou que é verificado.
    if (!profile.emailVerified || !profile.email) return fail("google_email");

    // Identidade ancorada no `sub` (id imutável do Google), não no e-mail (que pode mudar):
    //  1) procura pelo sub;  2) na 1ª vez, cai pro e-mail e vincula o sub à conta;
    //  3) senão, cria conta nova já com o sub.
    let user = await users.findByGoogleSub(profile.sub);
    if (!user) {
      const existing = await users.findByEmail(profile.email);
      if (existing) {
        if (!existing.google_sub) await users.linkGoogleSub(existing.id, profile.sub);
        user = existing;
      } else {
        const id = randomUUID();
        await users.create({
          id,
          name: profile.name,
          email: profile.email,
          password_hash: null,
          image: profile.picture,
          provider: "google",
          google_sub: profile.sub,
        });
        user = (await users.findById(id))!;
      }
    }

    const token = await createSessionToken({ id: user.id, email: user.email, name: user.name });
    const res = NextResponse.redirect(new URL("/conta", req.url));
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    console.error("[auth/google/callback] erro:", err);
    return fail("google");
  }
}
