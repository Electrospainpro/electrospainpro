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

type RelationKind = "variant" | "related" | "comparison";

interface ProductRelationCardProps {
  item: ProductRelationItem;
  kind: RelationKind;
}

function getKindLabel(kind: RelationKind): string {
  switch (kind) {
    case "variant":
      return "Variante";
    case "related":
      return "Relacionado";
    case "comparison":
      return "Comparativa";
  }
}

function getKindIcon(kind: RelationKind): React.ReactNode {
  switch (kind) {
    case "variant":
      return (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M7 3h10l4 4-9 14L3 7l4-4Z" />
          <path d="M7 3l5 5 5-5" />
          <path d="M3 7h18" />
        </svg>
      );

    case "related":
      return (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="7" cy="12" r="3" />
          <circle cx="17" cy="7" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="m9.5 10.5 5-2" />
          <path d="m9.5 13.5 5 2" />
        </svg>
      );

    case "comparison":
      return (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M6 4v16" />
          <path d="M18 4v16" />
          <path d="M3 8h6" />
          <path d="M15 8h6" />
          <path d="M3 16h6" />
          <path d="M15 16h6" />
        </svg>
      );
  }
}

function ProductRelationCard({
  item,
  kind,
}: ProductRelationCardProps) {
  const { product, relation } = item;

  const espScore = product.espScore?.overall;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* CABECERA */}

      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            {getKindIcon(kind)}
            {getKindLabel(kind)}
          </span>

          {espScore !== undefined && espScore !== null && (
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
              ESP {espScore.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* CONTENIDO */}

      <div className="flex flex-1 flex-col p-5">
        {/* MARCA */}

        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {product.brand}
        </p>

        {/* NOMBRE */}

        <h3 className="mt-2 text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-blue-600 sm:text-lg">
          {product.name}
        </h3>

        {/* MPN */}

        {product.mpn && (
          <p className="mt-2 text-[11px] font-medium text-slate-400">
            MPN:{" "}
            <span className="text-slate-500">
              {product.mpn}
            </span>
          </p>
        )}

        {/* DESCRIPCIÓN */}

        {product.shortDescription && (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {product.shortDescription}
          </p>
        )}

        {/* MOTIVO EDITORIAL */}

        {relation.editorialReason && (
          <div className="mt-auto pt-5">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Por qué aparece aquí
              </p>

              <p className="mt-1.5 text-xs leading-5 text-slate-600">
                {relation.editorialReason}
              </p>
            </div>
          </div>
        )}

        {/* CTA VISUAL */}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-semibold text-slate-500 transition-colors group-hover:text-blue-600">
            Ver producto
          </span>

          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function RelationGroup({
  title,
  description,
  items,
  kind,
}: {
  title: string;
  description: string;
  items: ProductRelationItem[];
  kind: RelationKind;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      {/* CABECERA DEL GRUPO */}

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            {getKindIcon(kind)}
            {getKindLabel(kind)}
          </div>

          <h3 className="text-xl font-bold tracking-tight text-slate-950">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <span className="text-xs font-medium text-slate-400">
          {items.length}{" "}
          {items.length === 1 ? "resultado" : "resultados"}
        </span>
      </div>

      {/* TARJETAS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductRelationCard
            key={`${item.relation.sourceId}-${item.relation.targetId}-${item.relation.type}`}
            item={item}
            kind={kind}
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
    <section className="mt-16 border-t border-slate-200 pt-12">
      {/* CABECERA PRINCIPAL */}

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            Catálogo ElectroSpainPro
          </span>
        </div>

        <h2 className="text-[28px] font-bold tracking-tight text-slate-950 sm:text-[32px]">
          Relaciones del producto
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Productos y contenidos relacionados definidos por la
          estructura editorial del catálogo ElectroSpainPro.
        </p>
      </div>

      {/* VARIANTES */}

      <RelationGroup
        title="Variantes"
        description="Productos que representan otras variantes del producto actual."
        items={variants}
        kind="variant"
      />

      {/* RELACIONADOS */}

      <RelationGroup
        title="Productos relacionados"
        description="Productos relacionados por contexto, aplicación o utilidad profesional."
        items={related}
        kind="related"
      />

      {/* COMPARACIONES */}

      <RelationGroup
        title="También comparado con"
        description="Productos que el catálogo identifica como comparables dentro de la misma necesidad."
        items={comparisons}
        kind="comparison"
      />
    </section>
  );
}