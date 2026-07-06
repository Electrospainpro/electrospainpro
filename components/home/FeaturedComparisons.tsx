import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const comparisons = [
  {
    title: "Los mejores multímetros digitales de 2026",
    description: "Comparativa completa de precisión, calidad y precio.",
  },
  {
    title: "Los mejores taladros percutores",
    description: "Analizamos potencia, autonomía y resistencia.",
  },
  {
    title: "Las mejores placas solares",
    description: "Las opciones más eficientes para autoconsumo.",
  },
];

export default function FeaturedComparisons() {
  return (
    <Section>
      <Container>
        <h2 className="mb-8 text-3xl font-bold">
          Comparativas destacadas
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {comparisons.map((comparison) => (
            <Card key={comparison.title}>
              <h3 className="text-xl font-semibold">
                {comparison.title}
              </h3>

              <p className="mt-3 text-gray-500">
                {comparison.description}
              </p>

              <div className="mt-6">
                <Button>Leer comparativa</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}