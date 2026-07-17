import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Mail, Github, Twitter } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — NORVENXA" },
      { name: "description", content: "Contacta con NORVENXA: sugerencias, correcciones, colaboraciones y prensa. Respondemos a todos los mensajes serios." },
      { property: "og:title", content: "Contacto — NORVENXA" },
      { property: "og:description", content: "Escríbenos: sugerencias, correcciones, colaboraciones y prensa." },
      { property: "og:url", content: "/contacto" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
        <p className="mt-3 text-muted-foreground">
          Sugerencias, correcciones, colaboraciones o prensa: aquí nos tienes.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a href="mailto:hola@norvenxa.com" className="rounded-xl border border-border/60 bg-card p-5 hover:border-primary/40">
            <Mail className="h-5 w-5 text-primary" />
            <div className="mt-3 text-sm font-semibold">Email</div>
            <div className="text-xs text-muted-foreground">hola@norvenxa.com</div>
          </a>
          <a href="#" className="rounded-xl border border-border/60 bg-card p-5 hover:border-primary/40">
            <Twitter className="h-5 w-5 text-primary" />
            <div className="mt-3 text-sm font-semibold">X / Twitter</div>
            <div className="text-xs text-muted-foreground">@norvenxa</div>
          </a>
          <a href="#" className="rounded-xl border border-border/60 bg-card p-5 hover:border-primary/40">
            <Github className="h-5 w-5 text-primary" />
            <div className="mt-3 text-sm font-semibold">GitHub</div>
            <div className="text-xs text-muted-foreground">/norvenxa</div>
          </a>
        </div>

        <form className="mt-12 space-y-4 rounded-2xl border border-border/60 bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium">Nombre</label>
              <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="text-xs font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="tu@email.com" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Mensaje</label>
            <textarea rows={5} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Cuéntanos..." />
          </div>
          <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Enviar mensaje
          </button>
          <p className="text-xs text-muted-foreground">
            Este formulario es solo demostrativo. Escríbenos directamente al email.
          </p>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
