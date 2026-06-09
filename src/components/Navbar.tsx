"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

type MeUser = { name: string | null; email: string; isAdmin?: boolean } | null;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<MeUser>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verifica o login — re-checa ao trocar de página (ex.: depois de entrar/sair).
  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (active) setUser(d.user);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Página inicial">
          <Logo idSuffix="nav" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-white ${
                isActive(l.href) ? "text-white" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className={`text-sm font-semibold transition-colors hover:text-white ${
                    isActive("/admin") ? "text-white" : "text-brand"
                  }`}
                >
                  Admin
                </Link>
              )}
              <Link
                href="/conta"
                className={`text-sm transition-colors hover:text-white ${
                  isActive("/conta") ? "text-white" : "text-muted"
                }`}
              >
                Minha conta
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-muted transition-colors hover:text-white"
            >
              Entrar
            </Link>
          )}
          <Link
            href="/contato"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            Pedir orçamento
          </Link>
        </div>

        {/* Botão mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="glass mx-4 mt-3 rounded-2xl border border-white/10 p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-white ${
                  isActive(l.href) ? "bg-white/5 text-white" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 font-semibold text-brand transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/conta"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  Minha conta
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                Entrar
              </Link>
            )}
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Pedir orçamento
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
