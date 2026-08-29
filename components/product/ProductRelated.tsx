import Link from "next/link";

import type { Product } from "@/types/product";
import type { CatalogRelation } from "@/types/relations";

interface ProductRelationItem {
  product: Product;
  relation: CatalogRelation;
}

interface ProductRelatedProps {
  variants: ProductRelationItem[];
  related: ProductRelationItem[];
  comparisons: ProductRelationItem[];
}

function ProductRelationCard({
  item,
}: {
  item: ProductRelationItem;
}) {
  const {
    product,
    relation,
  } = item;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block rounded-xl border p-6 transition hover:shadow-lg"
    >
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
        {product.brand}
      </div>

      <h3 className="font-semibold group-hover:underline">
        {product.name}
      </h3>

      {product.shortDescription && (
        <p className="mt-2 text-sm text-gray-600">
          {product.shortDescription}
        </p>
      )}

      {relation.editorialReason && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm">
          <span className="font-medium">
            Motivo:
          </span>{" "}
          {relation.editorialReason}
        </div>
      )}
    </Link>
  );
}

function RelationGroup({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ProductRelationItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="mb-5">
        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <ProductRelationCard
            key={`${item.relation.sourceId}-${item.relation.targetId}-${item.relation.type}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductRelated({
  variants,
  related,
  comparisons,
}: ProductRelatedProps) {
  if (
    variants.length === 0 &&
    related.length === 0 &&
    comparisons.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Relaciones del producto
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Relaciones editoriales definidas en el
          catálogo ElectroSpainPro.
        </p>
      </div>

      <RelationGroup
        title="Variantes"
        description="Productos que representan variantes del producto actual."
        items={variants}
      />

      <RelationGroup
        title="Productos relacionados"
        description="Productos relacionados por contexto o utilidad."
        items={related}
      />

      <RelationGroup
        title="También comparado con"
        description="Productos que el catálogo identifica como comparables."
        items={comparisons}
      />
    </section>
  );
}