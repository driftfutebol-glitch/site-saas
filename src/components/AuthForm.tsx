"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { loginSchema, signupSchema } from "@/lib/auth-schema";

type Mode = "login" | "signup";

export function AuthForm({ mode, initialError = "" }: { mode: Mode; initialError?: string }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState(initialError);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      ...(isSignup ? { name: String(form.get("name") ?? "") } : {}),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const schema = isSignup ? signupSchema : loginSchema;
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(isSignup ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        setGeneralError(json.error ?? "Não foi possível continuar. Tente novamente.");
        setLoading(false);
        return;
      }

      // Sucesso → vai para a conta e atualiza o estado (Navbar, etc.)
      router.push("/conta");
      router.refresh();
    } catch {
      setGeneralError("Falha de conexão. Verifique sua internet e tente de novo.");
      setLoading(false);
    }
  }

  const fieldError = (name: string) => errors[name]?.[0];

  return (
    <div className="mx-auto max-w-md px-5 pb-24">
      <div className="glass border-gradient rounded-2xl p-6 md:p-8">
        {generalError && (
          <p className="mb-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {generalError}
          </p>
        )}

        {/* Google */}
        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
        >
          <GoogleIcon />
          Continuar com Google
        </a>

        <div className="my-6 flex items-center gap-4 text-xs text-muted">
          <span className="h-px flex-1 bg-white/10" />
          ou com e-mail
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {isSignup && (
            <Field label="Nome" error={fieldError("name")}>
              <input name="name" placeholder="Seu nome" className="input" autoComplete="name" />
            </Field>
          )}

          <Field label="E-mail" error={fieldError("email")}>
            <input
              name="email"
              type="email"
              placeholder="voce@email.com"
              className="input"
              autoComplete="email"
            />
          </Field>

          <Field label="Senha" error={fieldError("password")}>
            <input
              name="password"
              type="password"
              placeholder={isSignup ? "Mínimo de 8 caracteres" : "Sua senha"}
              className="input"
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="glow-brand inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {isSignup ? "Criando conta..." : "Entrando..."}
              </>
            ) : isSignup ? (
              "Criar minha conta"
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {isSignup ? (
            <>
              Já tem conta?{" "}
              <Link href="/login" className="font-semibold text-brand hover:underline">
                Entrar
              </Link>
            </>
          ) : (
            <>
              Ainda não tem conta?{" "}
              <Link href="/registrar" className="font-semibold text-brand hover:underline">
                Criar conta grátis
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.5 26.9 35.5 24 35.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.4 36.5 44 30.8 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
