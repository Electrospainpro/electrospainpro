import Link from "next/link";

import Section from "@/components/ui/Section";

import { brands } from "@/data/brands";

export default function FeaturedBrands() {
  const featuredBrands = brands.slice(0, 8);

  return (
    <Section title="Marcas destacadas">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {featuredBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/marcas/${brand.slug}`}
            className="rounded-xl border bg-white p-6 text-center transition hover:border-blue-600 hover:shadow-lg"
          >
            <h3 className="font-semibold">
              {brand.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {brand.country}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}