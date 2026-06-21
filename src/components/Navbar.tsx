"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks, solutionsMenu } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

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

  // Fecha o menu mobile ao trocar de página.
  useEffect(() => {
    setOpen(false);
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
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className={`text-sm transition-colors hover:text-white ${
              pathname === "/" ? "text-white" : "text-muted"
            }`}
          >
            Início
          </Link>

          {/* Dropdown Soluções */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-white">
              Soluções
              <ChevronDown
                size={14}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="glass w-72 rounded-2xl border border-white/10 p-2 shadow-2xl shadow-black/40">
                {solutionsMenu.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand/20 to-cyan/10 text-cyan ring-1 ring-white/10">
                      <Icon name={s.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{s.label}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted">
                        {s.desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks
            .filter((l) => l.href !== "/")
            .map((l) => (
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
            className="shine rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
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
        <div className="glass mx-4 mt-3 max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 p-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className={`rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-white ${
                pathname === "/" ? "bg-white/5 text-white" : "text-muted"
              }`}
            >
              Início
            </Link>

            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-muted/70">
              Soluções
            </p>
            {solutionsMenu.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-cyan">
                  <Icon name={s.icon} className="h-4 w-4" />
                </span>
                {s.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            {navLinks
              .filter((l) => l.href !== "/")
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
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
                    className="rounded-lg px-3 py-3 font-semibold text-brand transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/conta"
                  className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  Minha conta
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                Entrar
              </Link>
            )}
            <Link
              href="/contato"
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
