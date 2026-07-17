import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { ARTICLES, type Article } from "@/data/articles";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PAGE_SIZE = 9;

const searchSchema = z.object({
  q: fallback(z.string().max(100), "").default(""),
  tag: fallback(z.string().max(60), "").default(""),
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/buscar")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Buscar artículos — NORVENXA" },
      { name: "description", content: "Busca entre más de 50 artículos de tecnología por título o etiquetas: IA, ciberseguridad, cloud, hardware y desarrollo." },
      { property: "og:title", content: "Buscar artículos — NORVENXA" },
      { property: "og:description", content: "Busca artículos por título o etiquetas." },
      { property: "og:url", content: "/buscar" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/buscar" }],
  }),
  component: SearchPage,
});

const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function SearchPage() {
  const { q, tag, page } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = useMemo<Article[]>(() => {
    const nq = normalize(q.trim());
    const nt = tag.trim();
    return ARTICLES.filter((a) => {
      if (nq && !normalize(a.title).includes(nq) && !normalize(a.description).includes(nq)) {
        return false;
      }
      if (nt && !a.tags.includes(nt)) return false;
      return true;
    });
  }, [q, tag]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Buscar artículos</h1>
          <p className="mt-2 text-muted-foreground">
            Filtra {ARTICLES.length} artículos por título o etiquetas.
          </p>
        </header>

        {/* Controls */}
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                const value = e.target.value.slice(0, 100);
                navigate({ search: (prev: { q: string; tag: string; page: number }) => ({ ...prev, q: value, page: 1 }), replace: true });
              }}
              placeholder="Buscar por título o descripción…"
              maxLength={100}
              aria-label="Buscar artículos"
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <div className="mt-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Etiquetas
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigate({ search: (prev: { q: string; tag: string; page: number }) => ({ ...prev, tag: "", page: 1 }) })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  tag === ""
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                Todas
              </button>
              {ALL_TAGS.map((t) => {
                const active = t === tag;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      navigate({ search: (prev: { q: string; tag: string; page: number }) => ({ ...prev, tag: active ? "" : t, page: 1 }) })
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    #{t}
                  </button>
                );
              })}
            </div>
          </div>

          {(q || tag) && (
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {results.length} resultado{results.length === 1 ? "" : "s"}
                {q && <> para “<span className="font-medium text-foreground">{q}</span>”</>}
                {tag && <> con etiqueta <span className="font-medium text-foreground">#{tag}</span></>}
              </span>
              <button
                type="button"
                onClick={() => navigate({ search: () => ({ q: "", tag: "", page: 1 }) })}
                className="font-medium text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-8">
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 bg-card p-12 text-center">
              <div className="text-lg font-semibold">Sin resultados</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Prueba con otras palabras clave o quita algún filtro.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Paginación"
                  className="mt-10 flex items-center justify-center gap-1"
                >
                  <Link
                    from="/buscar"
                    search={(prev: { q: string; tag: string; page: number }) => ({ ...prev, page: Math.max(1, currentPage - 1) })}
                    disabled={currentPage === 1}
                    aria-disabled={currentPage === 1}
                    className={`rounded-lg border border-border bg-card px-3 py-2 text-sm ${
                      currentPage === 1 ? "pointer-events-none opacity-40" : "hover:border-primary/40"
                    }`}
                  >
                    ← Anterior
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <Link
                      key={n}
                      from="/buscar"
                      search={(prev: { q: string; tag: string; page: number }) => ({ ...prev, page: n })}
                      className={`min-w-9 rounded-lg border px-3 py-2 text-center text-sm ${
                        n === currentPage
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      {n}
                    </Link>
                  ))}
                  <Link
                    from="/buscar"
                    search={(prev: { q: string; tag: string; page: number }) => ({ ...prev, page: Math.min(totalPages, currentPage + 1) })}
                    disabled={currentPage === totalPages}
                    aria-disabled={currentPage === totalPages}
                    className={`rounded-lg border border-border bg-card px-3 py-2 text-sm ${
                      currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:border-primary/40"
                    }`}
                  >
                    Siguiente →
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
