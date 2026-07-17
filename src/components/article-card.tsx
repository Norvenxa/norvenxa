import { Link } from "@tanstack/react-router";
import type { Article } from "@/data/articles";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to="/articulos/$slug"
      params={{ slug: article.slug }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg ${featured ? "md:flex-row" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-muted ${featured ? "md:w-1/2 aspect-[16/10]" : "aspect-[16/9]"}`}
      >
        <img
          src={article.cover}
          alt={article.title}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-900 backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:p-8" : ""}`}>
        <h3 className={`font-bold leading-tight tracking-tight text-foreground group-hover:text-primary ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {article.title}
        </h3>
        <p className={`mt-2 line-clamp-3 text-sm text-muted-foreground ${featured ? "md:text-base" : ""}`}>
          {article.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.readingMinutes} min lectura</span>
        </div>
      </div>
    </Link>
  );
}
