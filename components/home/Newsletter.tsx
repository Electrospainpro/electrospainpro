import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  return (
    <Section>
      <Container>
        <div className="rounded-2xl bg-blue-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Mantente al día del sector
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Recibe nuevas comparativas, guías técnicas, herramientas y
            recomendaciones profesionales directamente en tu correo.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 rounded-xl px-5 py-3 text-gray-900 outline-none"
            />

            <Button
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Suscribirme
            </Button>
          </form>

          <p className="mt-4 text-sm text-blue-100">
            Sin spam. Solo contenido técnico de valor.
          </p>
        </div>
      </Container>
    </Section>
  );
}