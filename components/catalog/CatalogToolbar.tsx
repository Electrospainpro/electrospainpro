import CatalogSearch from "./CatalogSearch";

interface CatalogToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalProducts: number;
}

export default function CatalogToolbar({
  search,
  onSearchChange,
  totalProducts,
}: CatalogToolbarProps) {
  return (
    <section className="mb-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <CatalogSearch
            value={search}
            onChange={onSearchChange}
          />
        </div>

        <div className="text-sm text-gray-500">
          {totalProducts} producto{totalProducts !== 1 ? "s" : ""}
        </div>
      </div>
    </section>
  );
}