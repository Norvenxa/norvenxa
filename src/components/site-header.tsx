import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/articles";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-foreground">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight">NORVENXA</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Inicio</Link>
          <Link to="/articulos" className="text-sm font-medium text-muted-foreground hover:text-foreground">Artículos</Link>
          <Link to="/sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground">Sobre</Link>
          <Link to="/contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground">Contacto</Link>
        </nav>
        <button
          className="md:hidden"
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <nav className="flex flex-col gap-3">
              <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
              <Link to="/articulos" onClick={() => setOpen(false)}>Artículos</Link>
              <Link to="/sobre" onClick={() => setOpen(false)}>Sobre</Link>
              <Link to="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
              <div className="mt-2 border-t border-border pt-3 text-xs uppercase tracking-wider text-muted-foreground">
                Categorías
              </div>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
