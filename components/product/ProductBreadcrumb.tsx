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
    <nav className="mb-7" aria-label="Migas de pan">
      <div className="flex flex-wrap items-center gap-2 text-[13px]">
        <Link
          href="/"
          className="font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          Inicio
        </Link>

        <span className="text-slate-300">
          /
        </span>

        <Link
          href={`/${category}`}
          className="font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          {category}
        </Link>

        <span className="text-slate-300">
          /
        </span>

        <span className="text-slate-500">
          {subcategory}
        </span>

        <span className="text-slate-300">
          /
        </span>

        <span className="max-w-[280px] truncate font-semibold text-slate-900">
          {product}
        </span>
      </div>
    </nav>
  );
}