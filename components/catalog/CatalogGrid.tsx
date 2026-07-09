import { Product } from "@/types/product";

import CatalogCard from "./CatalogCard";

interface CatalogGridProps {
  products: Product[];
}

export default function CatalogGrid({
  products,
}: CatalogGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-gray-500">
        No se han encontrado productos.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <CatalogCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}