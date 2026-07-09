interface CatalogSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CatalogSort({
  value,
  onChange,
}: CatalogSortProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="catalog-sort"
        className="text-sm font-medium text-gray-600"
      >
        Ordenar por
      </label>

      <select
        id="catalog-sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
      >
        <option value="featured">Destacados</option>
        <option value="rating">Mejor valorados</option>
        <option value="name">Nombre</option>
      </select>
    </div>
  );
}