import { notFound } from "next/navigation";

import BrandHeader from "@/components/brand/BrandHeader";

import { getBrandBySlug } from "@/lib/brands";

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
          Productos
        </h2>

        <p className="mt-4 text-gray-600">
          Próximamente mostraremos todos los productos de esta marca.
        </p>
      </section>

      <section className="mt-10 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Comparativas
        </h2>

        <p className="mt-4 text-gray-600">
          Aquí aparecerán las comparativas donde participa esta marca.
        </p>
      </section>

      <section className="mt-10 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Guías relacionadas
        </h2>

        <p className="mt-4 text-gray-600">
          Próximamente encontrarás guías técnicas relacionadas con esta marca.
        </p>
      </section>
    </main>
  );
}