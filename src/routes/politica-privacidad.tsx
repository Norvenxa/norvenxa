import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute()({
  component: PoliticaPrivacidad,
});

function PoliticaPrivacidad() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Política de Privacidad
      </h1>

      <p className="mb-6">
        En NORVENXA respetamos la privacidad de nuestros visitantes.
        Esta página explica qué datos pueden recopilarse y cómo se utilizan.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Datos recopilados
      </h2>

      <p className="mb-6">
        Actualmente este sitio no solicita registros de usuarios ni recopila
        datos personales de forma directa.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Analítica
      </h2>

      <p className="mb-6">
        En el futuro este sitio podrá utilizar herramientas de análisis para
        conocer estadísticas anónimas sobre las visitas y mejorar la
        experiencia de navegación.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Enlaces externos
      </h2>

      <p className="mb-6">
        Algunos artículos pueden contener enlaces hacia páginas de terceros.
        NORVENXA no es responsable de las políticas de privacidad de dichos
        sitios web.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Cambios en esta política
      </h2>

      <p>
        Esta política podrá actualizarse cuando sea necesario para adaptarse a
        cambios legales o al funcionamiento del sitio.
      </p>
    </main>
  );
}