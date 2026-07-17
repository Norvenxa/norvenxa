import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>

      <p className="mb-6">
        Bienvenido a NORVENXA. Este sitio web tiene como finalidad ofrecer
        información, análisis y contenido divulgativo sobre tecnología,
        inteligencia artificial, ciberseguridad, hardware, software y otras
        materias relacionadas.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Propiedad intelectual
      </h2>

      <p className="mb-6">
        Todos los contenidos publicados en NORVENXA, salvo indicación
        contraria, son propiedad de sus respectivos autores y están protegidos
        por la legislación aplicable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Limitación de responsabilidad
      </h2>

      <p className="mb-6">
        Aunque se procura mantener la información actualizada y verificada,
        NORVENXA no garantiza la ausencia de errores ni se responsabiliza del
        uso que terceros puedan hacer de la información publicada.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Contacto
      </h2>

      <p>
        Si deseas contactar con el responsable del sitio, podrás hacerlo a
        través del correo electrónico que se publicará en esta página.
      </p>
    </main>
  );
}