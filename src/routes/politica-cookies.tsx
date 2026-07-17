import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-cookies")({
  component: PoliticaCookies,
});

function PoliticaCookies() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Política de Cookies
      </h1>

      <p className="mb-6">
        NORVENXA utiliza cookies únicamente cuando son necesarias para el
        funcionamiento del sitio o para obtener estadísticas anónimas de uso.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        ¿Qué son las cookies?
      </h2>

      <p className="mb-6">
        Las cookies son pequeños archivos que el navegador guarda en el
        dispositivo del usuario para recordar determinada información durante
        la navegación.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Tipos de cookies
      </h2>

      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Cookies técnicas necesarias para el funcionamiento del sitio.</li>
        <li>Cookies de análisis para obtener estadísticas anónimas.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Cómo desactivar las cookies
      </h2>

      <p className="mb-6">
        Puedes configurar tu navegador para bloquear o eliminar las cookies en
        cualquier momento. Algunas funciones del sitio podrían dejar de
        funcionar correctamente.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Cambios en esta política
      </h2>

      <p>
        Esta política podrá actualizarse cuando el funcionamiento del sitio o
        la legislación aplicable así lo requieran.
      </p>
    </main>
  );
}