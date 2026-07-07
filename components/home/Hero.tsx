import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Bienvenido a ElectroSpainPro
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            El comparador profesional para electricistas, instaladores y especialistas técnicos.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Descubre comparativas reales, análisis profesionales,
            guías técnicas y las mejores herramientas para elegir
            productos eléctricos, fotovoltaicos, telecomunicaciones
            e instrumentación.
          </p>

          <div className="mt-8 flex gap-4">
            <PrimaryButton href="/comparativa">
              Ver comparativas
            </PrimaryButton>

            <SecondaryButton href="/categorias">
              Explorar categorías
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}