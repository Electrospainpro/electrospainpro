import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const products = [
  {
    name: "Multímetro Digital Profesional",
    category: "Instrumentación",
    price: "89,90 €",
  },
  {
    name: "Taladro Percutor Bosch",
    category: "Herramientas",
    price: "149,00 €",
  },
  {
    name: "Panel Solar 450W",
    category: "Fotovoltaica",
    price: "189,99 €",
  },
];

export default function FeaturedProducts() {
  return (
    <Section>
      <Container>
        <h2 className="mb-8 text-3xl font-bold">
          Productos destacados
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.name}>
              <div className="aspect-video rounded-lg bg-gray-200" />

              <h3 className="mt-4 text-xl font-semibold">
                {product.name}
              </h3>

              <p className="mt-2 text-gray-500">
                {product.category}
              </p>

              <p className="mt-4 text-2xl font-bold text-blue-600">
                {product.price}
              </p>

              <div className="mt-6">
                <Button>Ver análisis</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}