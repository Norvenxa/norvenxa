import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES } from "@/data/articles";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/articulos/")({
  head: () => ({
    meta: [
      { title: `Todos los artículos (${ARTICLES.length}) — NORVENXA` },
      { name: "description", content: `Explora ${ARTICLES.length} artículos de tecnología: IA, ciberseguridad, cloud, hardware y desarrollo. Análisis, guías y noticias con criterio.` },
      { property: "og:title", content: "Todos los artículos — NORVENXA" },
      { property: "og:description", content: `Explora ${ARTICLES.length} artículos de tecnología con criterio.` },
      { property: "og:url", content: "/articulos" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/articulos" }],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Todos los artículos</h1>
          <p className="mt-2 text-muted-foreground">
            {ARTICLES.length} análisis, guías y noticias sobre tecnología.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
