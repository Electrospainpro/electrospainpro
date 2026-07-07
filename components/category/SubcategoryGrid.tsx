import Link from "next/link";
import { Subcategory } from "@/data/electricidad";

interface SubcategoryGridProps {
  title: string;
  category: string;
  items: Subcategory[];
}

export default function SubcategoryGrid({
  title,
  category,
  items,
}: SubcategoryGridProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${category}/${item.slug}`}
            className="rounded-xl border bg-white p-6 transition hover:border-blue-600 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">
              {item.name}
            </h3>

            <p className="mt-3 text-sm text-gray-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}