import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre NORVENXA — Tecnología con criterio" },
      { name: "description", content: "NORVENXA es un medio independiente de tecnología. Escribimos análisis, guías y noticias sin humo ni marketing disfrazado." },
      { property: "og:title", content: "Sobre NORVENXA" },
      { property: "og:description", content: "Contenido independiente para entender la tecnología que realmente importa." },
      { property: "og:url", content: "/sobre" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Sobre NORVENXA</h1>
        <div className="prose mt-6 space-y-5 text-[17px] leading-relaxed text-muted-foreground">
          <p>
            NORVENXA es un proyecto independiente dedicado a explicar la
            tecnología con claridad, contexto y criterio. Nuestro objetivo es
            ofrecer información útil, comprensible y basada en fuentes fiables.
          </p>
          <p>
            Creemos que el mejor contenido tecnológico es el que ayuda a
            entender, comparar y decidir. Por eso evitamos el marketing
            disfrazado de análisis y, cuando existe un conflicto de intereses,
            lo declaramos con transparencia.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-foreground">Qué cubrimos</h2>
          <p>
            Inteligencia artificial aplicada, ciberseguridad, desarrollo de
            software, cloud, hardware y ciencia con impacto tecnológico.
            Análisis, comparativas y guías prácticas para tomar mejores
            decisiones, sin caer en el hype ni en el cinismo.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-foreground">Cómo trabajamos</h2>
          <p>
            Cada artículo se apoya en investigación, fuentes originales y una
            revisión editorial antes de publicarse. Actualizamos los textos
            cuando la información cambia, para que sigan siendo útiles con el
            paso del tiempo.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
