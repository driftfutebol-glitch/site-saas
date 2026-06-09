import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { site } from "@/lib/site";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";
import { users, messages } from "@/lib/db";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: `Admin — ${site.name}` };

function formatDate(s: string): string {
  return new Date(s.replace(" ", "T") + "Z").toLocaleString("pt-BR");
}

export default async function AdminPage() {
  // Proteção em duas camadas: precisa estar logado E ser admin.
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/"); // não é admin → manda pra home

  const [userList, messageList] = await Promise.all([users.all(), messages.all()]);

  return (
    <>
      <PageHero
        eyebrow="Painel"
        title={
          <>
            Área <span className="text-gradient">administrativa</span>
          </>
        }
        subtitle="Quem entrou em contato pelo site e quem se cadastrou. Só você vê isto."
      />

      <section className="mx-auto max-w-5xl px-5 pb-24">
        {/* Resumo */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard value={messageList.length} label="Mensagens recebidas" />
          <StatCard value={userList.length} label="Usuários cadastrados" />
        </div>

        {/* Mensagens */}
        <h2 className="mb-4 mt-12 text-2xl font-bold">📨 Mensagens de contato</h2>
        {messageList.length === 0 ? (
          <Empty>Nenhuma mensagem ainda. Quando alguém preencher o formulário, aparece aqui.</Empty>
        ) : (
          <div className="space-y-3">
            {messageList.map((m) => (
              <article key={m.id} className="glass border-gradient rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-semibold">{m.name}</span>
                    <a
                      href={`mailto:${m.email}`}
                      className="ml-2 break-all text-sm text-brand hover:underline"
                    >
                      {m.email}
                    </a>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{formatDate(m.created_at)}</span>
                </div>

                {(m.phone || m.service) && (
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    {m.phone && <span>📞 {m.phone}</span>}
                    {m.service && <span>🏷️ {m.service}</span>}
                  </div>
                )}

                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {m.message}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Usuários */}
        <h2 className="mb-4 mt-12 text-2xl font-bold">👥 Usuários cadastrados</h2>
        {userList.length === 0 ? (
          <Empty>Ninguém cadastrado ainda.</Empty>
        ) : (
          <div className="glass overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-muted">
                  <th className="p-4 font-medium">Nome</th>
                  <th className="p-4 font-medium">E-mail</th>
                  <th className="p-4 font-medium">Acesso</th>
                  <th className="p-4 font-medium">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 last:border-0">
                    <td className="p-4">{u.name ?? "—"}</td>
                    <td className="break-all p-4 text-muted">{u.email}</td>
                    <td className="p-4">
                      <span className="whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 text-xs ring-1 ring-white/10">
                        {u.provider === "google" ? "Google" : "E-mail/senha"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap p-4 text-muted">{formatDate(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass border-gradient rounded-2xl p-6 text-center">
      <div className="text-gradient text-4xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="glass rounded-2xl p-8 text-center text-muted">{children}</div>;
}
