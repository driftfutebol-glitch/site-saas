import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isGoogleConfigured, buildGoogleAuthUrl } from "@/lib/google";

/** Inicia o login com Google: gera `state` (anti-CSRF) e redireciona ao consentimento. */
export async function GET(req: NextRequest) {
  if (!isGoogleConfigured()) {
    // Credenciais do Google ainda não configuradas no .env.local
    return NextResponse.redirect(new URL("/login?erro=google_indisponivel", req.url));
  }

  const state = randomUUID();
  const res = NextResponse.redirect(buildGoogleAuthUrl(state));
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 min
  });
  return res;
}
