"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { contactSchema } from "@/lib/contact-schema";
import { services, site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

export function Contact({ showHeading = true }: { showHeading?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const form = new FormData(e.currentTarget);
    const budget = String(form.get("budget") ?? "");
    const deadline = String(form.get("deadline") ?? "");
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      service: String(form.get("service") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""), // honeypot
    };

    // Validação no navegador (feedback imediato). O servidor revalida de qualquer forma.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      setStatus("error");
      return;
    }

    // Embute orçamento e prazo na mensagem enviada (ajuda a qualificar o lead).
    const extras = [
      budget ? `Orçamento: ${budget}` : null,
      deadline ? `Prazo: ${deadline}` : null,
    ].filter(Boolean);
    const sendPayload = {
      ...payload,
      message: extras.length ? `${extras.join(" · ")}\n\n${payload.message}` : payload.message,
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendPayload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        setMessage(json.error ?? "Não foi possível enviar. Tente novamente.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setMessage("Falha de conexão. Verifique sua internet e tente de novo.");
      setStatus("error");
    }
  }

  const fieldError = (name: string) => errors[name]?.[0];

  return (
    <section id="contato" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Vamos conversar"
            title="Conte sua ideia — a gente cuida do resto"
            subtitle="Responda rápido. Sem compromisso, sem robô do outro lado."
          />
        )}

        <div className={`grid gap-8 lg:grid-cols-5 ${showHeading ? "mt-14" : ""}`}>
          {/* Infos de contato */}
          <div className="space-y-4 lg:col-span-2">
            <ContactInfo icon={<Mail size={18} />} label="E-mail" value={site.email} />
            <ContactInfo icon={<Phone size={18} />} label="Telefone / WhatsApp" value={site.phone} />
            <ContactInfo icon={<MapPin size={18} />} label="Atendimento" value={site.location} />
            <div className="glass border-gradient rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-muted">
                Prefere ir direto ao ponto? Manda mensagem no WhatsApp e fala com quem
                realmente desenvolve o seu sistema.
              </p>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full bg-gradient-to-r from-brand-600 to-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          {/* Formulário */}
          <div className="glass border-gradient rounded-2xl p-6 md:p-8 lg:col-span-3">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={56} className="text-green-400" />
                <h3 className="mt-4 text-2xl font-semibold">Mensagem enviada! 🎉</h3>
                <p className="mt-2 max-w-sm text-muted">
                  Recebemos seu contato e respondemos em breve. Obrigado!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* honeypot invisível para bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nome" error={fieldError("name")}>
                    <input name="name" placeholder="Seu nome" className="input" />
                  </Field>
                  <Field label="E-mail" error={fieldError("email")}>
                    <input name="email" type="email" placeholder="voce@email.com" className="input" />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Telefone (opcional)" error={fieldError("phone")}>
                    <input name="phone" placeholder="(00) 90000-0000" className="input" />
                  </Field>
                  <Field label="Tipo de projeto" error={fieldError("service")}>
                    <select name="service" defaultValue="" className="input">
                      <option value="">Selecione...</option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Outro">Outro</option>
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Orçamento disponível">
                    <select name="budget" defaultValue="" className="input">
                      <option value="">Selecione...</option>
                      <option value="R$ 500 a R$ 1.000">R$ 500 a R$ 1.000</option>
                      <option value="R$ 1.000 a R$ 3.000">R$ 1.000 a R$ 3.000</option>
                      <option value="R$ 3.000+">R$ 3.000+</option>
                      <option value="Ainda não sei">Ainda não sei</option>
                    </select>
                  </Field>
                  <Field label="Prazo desejado">
                    <select name="deadline" defaultValue="" className="input">
                      <option value="">Selecione...</option>
                      <option value="Urgente">Urgente</option>
                      <option value="Até 15 dias">Até 15 dias</option>
                      <option value="Até 30 dias">Até 30 dias</option>
                      <option value="Sem pressa">Sem pressa</option>
                    </select>
                  </Field>
                </div>

                <Field label="Mensagem" error={fieldError("message")}>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Conte o que você precisa..."
                    className="input resize-none"
                  />
                </Field>

                {status === "error" && message && (
                  <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="glow-brand inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem <Send size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass flex items-center gap-4 rounded-2xl p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan/10 text-brand ring-1 ring-white/10">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
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
