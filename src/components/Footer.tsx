import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" aria-label="Página inicial">
            <Logo idSuffix="footer" />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
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

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-sm text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            Feito com <span className="text-brand">♥</span> e código limpo.
          </p>
        </div>
      </div>
    </footer>
  );
}
