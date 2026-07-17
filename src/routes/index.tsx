import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES } from "@/data/articles";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NORVENXA — Tecnología sin humo: IA, ciberseguridad y desarrollo" },
      { name: "description", content: "Análisis, guías y noticias de tecnología con criterio. Más de 50 artículos sobre IA, ciberseguridad, cloud, hardware y desarrollo de software." },
      { property: "og:title", content: "NORVENXA — Tecnología sin humo" },
      { property: "og:description", content: "Análisis, guías y noticias de tecnología con criterio: IA, ciberseguridad, cloud, hardware y desarrollo." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NORVENXA",
          description: "Análisis, guías y noticias de tecnología con criterio.",
          inLanguage: "es",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = ARTICLES[0];
  const latest = ARTICLES.slice(1, 7);
  const popular = ARTICLES.slice(7, 13);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Nueva edición semanal
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                Tecnología con criterio, sin humo.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                NORVENXA reúne más de 50 análisis, guías y noticias sobre
                inteligencia artificial, ciberseguridad, cloud, hardware y
                desarrollo. Contenido claro, honesto y útil.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/articulos"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explorar artículos <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: "inteligencia-artificial" }}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Empezar por IA
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Destacado</h2>
          </div>
          <ArticleCard article={featured} featured />
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Explora por categoría</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow"
              >
                <div className="text-sm font-semibold text-foreground group-hover:text-primary">{c.name}</div>
                <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Últimos artículos</h2>
            <Link to="/articulos" className="text-sm font-medium text-primary hover:underline">Ver todos →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">También populares</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
