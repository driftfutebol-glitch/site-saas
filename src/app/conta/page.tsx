import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SquareParking, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { PageHero } from "@/components/PageHero";
import { LogoutButton } from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: `Minha conta — ${site.name}`,
};

export default async function ContaPage() {
  // Proteção de rota: checagem autoritativa no servidor.
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const initial = (user.name ?? user.email).charAt(0).toUpperCase();

  return (
    <>
      <PageHero
        eyebrow="Minha conta"
        title={
          <>
            Olá, <span className="text-gradient">{user.name ?? "bem-vindo"}</span> 👋
          </>
        }
        subtitle="Este é o seu painel. Em breve, seus projetos e sistemas aparecem aqui."
      />

      <section className="mx-auto max-w-2xl px-5 pb-24">
        <div className="glass border-gradient rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-cyan text-2xl font-bold text-white">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{user.name ?? "Sem nome"}</p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info label="Forma de acesso" value={user.provider === "google" ? "Google" : "E-mail e senha"} />
            <Info
              label="Membro desde"
              value={new Date(user.created_at.replace(" ", "T") + "Z").toLocaleDateString("pt-BR")}
            />
          </dl>

          <div className="mt-8 border-t border-white/10 pt-6">
            <LogoutButton />
          </div>
        </div>

        <h2 className="mb-4 mt-10 text-lg font-semibold">Seus sistemas</h2>
        <Link
          href="/sistema/estacionamento"
          className="glass border-gradient group flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <SquareParking size={22} />
            </span>
            <div>
              <div className="font-semibold">Estacionamento</div>
              <div className="text-sm text-muted">Registrar entradas, saídas e ver o faturamento.</div>
            </div>
          </div>
          <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1" />
        </Link>

        <p className="mt-6 text-center text-sm text-muted">
          🔒 Sua senha é guardada com hash bcrypt — nem a gente consegue vê-la.
        </p>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
