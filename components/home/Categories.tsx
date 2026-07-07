import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { categories } from "@/data/categories";
import Link from "next/link";

export default function Categories() {
  return (
    <Section>
      <Container>
        <h2 className="mb-10 text-3xl font-bold">
          Categorías principales
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="rounded-xl border p-6 transition hover:shadow-lg hover:border-blue-500"
            >
              <div className="mb-4 text-4xl">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}