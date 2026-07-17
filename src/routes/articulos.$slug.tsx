import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, getRelated } from "@/data/articles";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/articulos/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artículo no encontrado — NORVENXA" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    const url = `/articulos/${params.slug}`;
    return {
      meta: [
        { title: `${a.title} — NORVENXA` },
        { name: "description", content: a.description },
        { name: "author", content: a.author },
        { name: "keywords", content: a.tags.join(", ") },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.cover },
        { property: "article:published_time", content: a.date },
        { property: "article:author", content: a.author },
        { property: "article:section", content: a.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            author: { "@type": "Person", name: a.author },
            publisher: { "@type": "Organization", name: "NORVENXA" },
            articleSection: a.category,
            keywords: a.tags.join(", "),
            inLanguage: "es",
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Artículo no encontrado</h1>
        <p className="mt-2 text-muted-foreground">Puede que haya sido movido o retirado.</p>
        <Link to="/articulos" className="mt-6 inline-block text-primary hover:underline">Ver todos los artículos</Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Algo ha fallado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = getRelated(article.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <div className="relative overflow-hidden bg-muted">
          <img
            src={article.cover}
            alt={article.title}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-white md:py-24">
            <Link
              to="/categoria/$slug"
              params={{ slug: article.categorySlug }}
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur hover:bg-white/25"
            >
              {article.category}
            </Link>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-white/85 md:text-lg">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span>{article.author}</span>
              <span>·</span>
              <span>·</span>
              <span>{article.readingMinutes} min de lectura</span>
            </div>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link to="/articulos" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Todos los artículos
          </Link>
          <div className="prose-content space-y-5 text-[17px] leading-relaxed text-foreground">
            {article.content.map((block: string, i: number) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-10 text-2xl font-bold tracking-tight">
                    {block.replace(/^##\s+/, "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-muted-foreground">
                  {block}
                </p>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-border/60 pt-6">
            {article.tags.map((t: string) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                #{t}
              </span>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-4">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">También te puede interesar</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
