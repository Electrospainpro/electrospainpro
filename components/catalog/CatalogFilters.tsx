interface CatalogFiltersProps {
  selectedCategory?: string;
}

export default function CatalogFilters({
  selectedCategory,
}: CatalogFiltersProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Filtros
      </h3>

      <p className="text-sm text-gray-500">
        Próximamente podrás filtrar por:
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li>• Categoría</li>
        <li>• Subcategoría</li>
        <li>• Marca</li>
        <li>• ESP Score</li>
      </ul>

      {selectedCategory && (
        <p className="mt-6 text-sm text-blue-600">
          Categoría seleccionada: {selectedCategory}
        </p>
      )}
    </section>
  );
}