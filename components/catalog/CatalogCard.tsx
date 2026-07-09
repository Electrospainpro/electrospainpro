import Link from "next/link";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { Product } from "@/types/product";

interface CatalogCardProps {
  product: Product;
}

export default function CatalogCard({
  product,
}: CatalogCardProps) {
  return (
    <Card className="p-6">
      <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        Imagen pendiente
      </div>

      <h2 className="mt-6 text-xl font-bold">
        {product.name}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {product.brand}
      </p>

      <p className="mt-1 text-sm capitalize text-gray-500">
        {product.category}
      </p>

      {product.espScore && (
        <div className="mt-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            ESP Score {product.espScore.overall}
          </span>
        </div>
      )}

      <p className="mt-4 line-clamp-3 text-gray-600">
        {product.shortDescription}
      </p>

      <div className="mt-6">
        <Link href={`/productos/${product.slug}`}>
          <Button className="w-full">
            Ver análisis
          </Button>
        </Link>
      </div>
    </Card>
  );
}