import Link from "next/link";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

const navegacao = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
];

const mais = [
  { href: "/fundador", label: "Fundador" },
  { href: "/sobre", label: "Sobre a empresa" },
  { href: "/preview", label: "Demonstrações" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca + contato */}
          <div>
            <Link href="/" aria-label="Página inicial">
              <Logo idSuffix="footer" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}. Feito sob medida por um desenvolvedor fullstack que se importa
              com cada detalhe.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle size={15} className="text-cyan" />
                WhatsApp
              </a>
              <a
                href={`mailto:${site.email}`}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <Mail size={15} className="text-fuchsia" />
                E-mail
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="text-brand" />
              {site.location}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
              Navegação
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navegacao.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mais */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
              Mais
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {mais.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-sm text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por{" "}
            <Link href="/fundador" className="text-foreground/90 transition-colors hover:text-white">
              Pedro Ferraz
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
