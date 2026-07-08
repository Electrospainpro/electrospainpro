import Link from "next/link";

interface ProductBreadcrumbProps {
  category: string;
  subcategory: string;
  product: string;
}

export default function ProductBreadcrumb({
  category,
  subcategory,
  product,
}: ProductBreadcrumbProps) {
  return (
    <nav className="mb-8 text-sm text-gray-500">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/">Inicio</Link>

        <span>/</span>

        <Link href={`/${category}`}>
          {category}
        </Link>

        <span>/</span>

        <span>{subcategory}</span>

        <span>/</span>

        <span className="font-medium text-gray-800">
          {product}
        </span>
      </div>
    </nav>
  );
}