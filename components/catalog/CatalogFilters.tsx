import { brands } from "@/data/brands";
import { categories } from "@/data/categories";

interface CatalogFiltersProps {
  selectedBrand: string;
  selectedCategory: string;
  onBrandChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function CatalogFilters({
  selectedBrand,
  selectedCategory,
  onBrandChange,
  onCategoryChange,
}: CatalogFiltersProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Filtros
      </h3>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Marca
          </label>

          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Todas las marcas</option>

            {brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.name}
              >
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Categoría
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Todas las categorías</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.slug}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}