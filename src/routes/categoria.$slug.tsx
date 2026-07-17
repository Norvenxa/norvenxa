import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, byCategory } from "@/data/articles";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, articles: byCategory(params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Categoría no encontrada — NORVENXA" }, { name: "robots", content: "noindex" }] };
    const { category, articles } = loaderData;
    const url = `/categoria/${params.slug}`;
    return {
      meta: [
        { title: `${category.name} — ${articles.length} artículos — NORVENXA` },
        { name: "description", content: `${category.description} ${articles.length} artículos en NORVENXA.` },
        { property: "og:title", content: `${category.name} — NORVENXA` },
        { property: "og:description", content: category.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Categoría no encontrada</h1>
        <Link to="/articulos" className="mt-4 inline-block text-primary hover:underline">Ver todos los artículos</Link>
      </div>
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
  component: CategoryPage,
});

function CategoryPage() {
  const { category, articles } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">Categoría</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
          <div className="mt-1 text-sm text-muted-foreground">{articles.length} artículos</div>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a: import("@/data/articles").Article) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
