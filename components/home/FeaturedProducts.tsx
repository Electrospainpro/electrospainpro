import Link from "next/link";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <Section>
      <Container>
        <h2 className="mb-8 text-3xl font-bold">
          Productos destacados
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <div className="aspect-video rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                Imagen pendiente
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                {product.name}
              </h3>

              <p className="mt-2 text-gray-500">
                {product.brand}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {product.category}
              </p>

              {product.price && (
                <p className="mt-4 text-2xl font-bold text-blue-600">
                  {product.price}
                </p>
              )}

              <div className="mt-6">
                <Link href={`/productos/${product.slug}`}>
                  <Button>
                    Ver análisis
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}