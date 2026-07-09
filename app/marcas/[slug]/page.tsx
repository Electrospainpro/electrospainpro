import Link from "next/link";
import { notFound } from "next/navigation";

import BrandHeader from "@/components/brand/BrandHeader";

import { getBrandBySlug } from "@/lib/brands";
import { getProductsByBrand } from "@/lib/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BrandPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const products = getProductsByBrand(
    brand.name
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BrandHeader
        name={brand.name}
        country={brand.country}
        specialty={brand.specialty}
        description={brand.description ?? ""}
      />

      <section className="mt-12 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Productos de {brand.name}
        </h2>

        {products.length === 0 ? (
          <p className="mt-4 text-gray-600">
            Todavía no hay productos publicados de esta marca.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="rounded-xl border p-6 transition hover:border-blue-600 hover:shadow-lg"
              >
                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {product.shortDescription}
                </p>

                {product.espScore && (
                  <div className="mt-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      ESP Score {product.espScore.overall}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Comparativas
        </h2>

        <p className="mt-4 text-gray-600">
          Próximamente mostraremos las comparativas donde participa esta marca.
        </p>
      </section>

      <section className="mt-10 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Guías relacionadas
        </h2>

        <p className="mt-4 text-gray-600">
          Próximamente encontrarás las guías técnicas relacionadas con esta marca.
        </p>
      </section>
    </main>
  );
}