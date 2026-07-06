import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const categories = [
  {
    title: "Electricidad",
    icon: "⚡",
  },
  {
    title: "Telecomunicaciones",
    icon: "📡",
  },
  {
    title: "Fotovoltaica",
    icon: "🌞",
  },
  {
    title: "Herramientas",
    icon: "🔧",
  },
  {
    title: "Instrumentación",
    icon: "📐",
  },
  {
    title: "Seguridad",
    icon: "🦺",
  },
];

export default function Categories() {
  return (
    <Section>
      <Container>
        <h2 className="mb-10 text-3xl font-bold">
          Categorías principales
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border p-6 transition hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}