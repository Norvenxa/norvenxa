import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/articles";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="text-base font-semibold tracking-tight">NORVENXA</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Análisis, guías y noticias sobre tecnología explicadas de forma
            clara, rigurosa y sin humo.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Categorías</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/categoria/$slug" params={{ slug: c.slug }} className="hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">NORVENXA</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/articulos" className="hover:text-foreground">Todos los artículos</Link></li>
            <li><Link to="/sobre" className="hover:text-foreground">Sobre nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-foreground">Contacto</Link></li>
            <li><Link to="/aviso-legal" className="hover:text-foreground">Aviso Legal</Link></li>
            <li><Link to="/pilitica-privacidad" className="hover:text-foreground">Política de Privacidad</Link></li>
            <li><Link to="/politica-cookies" className="hover:text-foreground">Política de Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NORVENXA. Contenido con licencia CC BY 4.0.
      </div>
    </footer>
  );
}
