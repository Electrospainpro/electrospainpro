import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">

          <p className="mb-3 text-blue-600 font-semibold uppercase tracking-widest">
            Bienvenido a ElectroSpainPro
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Encuentra el mejor electrodoméstico al mejor precio.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Comparativas profesionales, opiniones verificadas,
            análisis en profundidad y los mejores enlaces de compra.
          </p>

          <div className="mt-8 flex gap-4">

            <PrimaryButton>
              Ver comparativas
            </PrimaryButton>

            <button className="rounded-lg border px-6 py-3 hover:bg-gray-100">
              Explorar productos
            </button>

          </div>

        </div>
      </Container>
    </Section>
  );
}