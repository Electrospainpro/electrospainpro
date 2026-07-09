import Link from "next/link";

import { categories } from "@/data/categories";

export default function CatalogSidebar() {
  return (
    <aside className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Categorías
      </h3>

      <nav>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/${category.slug}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-gray-100 hover:text-blue-600"
              >
                <span>{category.icon}</span>

                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}