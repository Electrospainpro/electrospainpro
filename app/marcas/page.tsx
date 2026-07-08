import Link from "next/link";
import { brands } from "@/data/brands";

export default function BrandsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Marcas
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        Descubre los principales fabricantes del sector eléctrico,
        fotovoltaico, telecomunicaciones e instrumentación.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/marcas/${brand.slug}`}
            className="rounded-xl border p-6 transition hover:border-blue-500 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">
              {brand.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {brand.country}
            </p>

            <p className="mt-4 text-sm text-gray-600">
              {brand.specialty}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}