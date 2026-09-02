import type { Product } from "@/types/product";

interface ComparisonESPScoreProps {
  products: Product[];
}

const criteria = [
  {
    key: "quality",
    label: "Calidad",
    weight: "20 %",
  },
  {
    key: "reliability",
    label: "Fiabilidad",
    weight: "20 %",
  },
  {
    key: "valueForMoney",
    label: "Relación calidad/precio",
    weight: "15 %",
  },
  {
    key: "installation",
    label: "Facilidad de instalación",
    weight: "10 %",
  },
  {
    key: "durability",
    label: "Durabilidad",
    weight: "15 %",
  },
  {
    key: "availability",
    label: "Disponibilidad",
    weight: "10 %",
  },
  {
    key: "warranty",
    label: "Garantía",
    weight: "10 %",
  },
] as const;

type CriterionKey =
  (typeof criteria)[number]["key"];

function getCriterionScore(
  product: Product,
  key: CriterionKey
): number | undefined {
  const score =
    product.espScore?.criteria[key]?.score;

  if (
    score === null ||
    score === undefined
  ) {
    return undefined;
  }

  return score;
}

function getWinnerLabel(
  scoreA: number | undefined,
  scoreB: number | undefined,
  productA: Product,
  productB: Product
): string {
  if (
    scoreA === undefined ||
    scoreB === undefined
  ) {
    return "Sin valoración completa";
  }

  if (scoreA === scoreB) {
    return "Empate";
  }

  return scoreA > scoreB
    ? productA.name
    : productB.name;
}

function getConfidenceLabel(
  product: Product
): string {
  const confidence =
    product.espScore?.confidence;

  if (confidence === "high") {
    return "Alta";
  }

  if (confidence === "medium") {
    return "Media";
  }

  if (confidence === "low") {
    return "Baja";
  }

  return "No disponible";
}

function getStatusLabel(
  product: Product
): string {
  const status =
    product.espScore?.status;

  if (status === "published") {
    return "Publicado";
  }

  if (status === "reviewed") {
    return "Revisado";
  }

  if (status === "pending") {
    return "Pendiente";
  }

  return "No disponible";
}

export default function ComparisonESPScore({
  products,
}: ComparisonESPScoreProps) {
  const comparisonProducts =
    products.slice(0, 2);

  if (comparisonProducts.length < 2) {
    return null;
  }

  const [productA, productB] =
    comparisonProducts;

  const scoreA =
    productA.espScore?.overall ?? undefined;

  const scoreB =
    productB.espScore?.overall ?? undefined;

  const hasBothScores =
    scoreA !== undefined &&
    scoreB !== undefined;

  let globalWinner:
    | "A"
    | "B"
    | "tie"
    | null = null;

  if (hasBothScores) {
    if (scoreA > scoreB) {
      globalWinner = "A";
    } else if (scoreB > scoreA) {
      globalWinner = "B";
    } else {
      globalWinner = "tie";
    }
  }

  return (
    <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Valoración ElectroSpainPro
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ESP Score frente a frente
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Comparamos la valoración editorial propia
          de ElectroSpainPro para los dos productos
          utilizando los siete criterios de nuestra
          metodología ESP Score.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[productA, productB].map(
          (product, index) => {
            const score =
              product.espScore?.overall ??
              undefined;

            const isWinner =
              (index === 0 &&
                globalWinner === "A") ||
              (index === 1 &&
                globalWinner === "B");

            return (
              <article
                key={product.catalogId}
                className={`rounded-2xl border p-6 ${
                  isWinner
                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Producto{" "}
                      {index === 0
                        ? "A"
                        : "B"}
                    </span>

                    <h3 className="mt-2 text-xl font-bold leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {isWinner && (
                    <span className="shrink-0 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Mejor ESP Score
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-5xl font-bold text-blue-700">
                    {score ?? "—"}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">
                    / 10
                  </span>
                </div>

                {product.espScore && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
                      Confianza:{" "}
                      {getConfidenceLabel(
                        product
                      )}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
                      {getStatusLabel(
                        product
                      )}
                    </span>
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>

      {hasBothScores && (
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Resultado global
          </p>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            {globalWinner === "tie"
              ? `Ambos productos obtienen ${scoreA}/10 en el ESP Score.`
              : globalWinner === "A"
                ? `${productA.name} obtiene el ESP Score más alto con ${scoreA}/10 frente a ${scoreB}/10.`
                : `${productB.name} obtiene el ESP Score más alto con ${scoreB}/10 frente a ${scoreA}/10.`}
          </p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold">
          Comparación por criterios
        </h3>

        <div className="mt-4 overflow-hidden rounded-xl border">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.5fr] bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 md:grid">
            <span>Criterio</span>

            <span className="text-center">
              Producto A
            </span>

            <span className="text-center">
              Producto B
            </span>

            <span>Ganador</span>
          </div>

          <div className="divide-y">
            {criteria.map(
              (criterion) => {
                const criterionScoreA =
                  getCriterionScore(
                    productA,
                    criterion.key
                  );

                const criterionScoreB =
                  getCriterionScore(
                    productB,
                    criterion.key
                  );

                const winner =
                  getWinnerLabel(
                    criterionScoreA,
                    criterionScoreB,
                    productA,
                    productB
                  );

                return (
                  <div
                    key={criterion.key}
                    className="grid gap-3 px-4 py-4 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] md:items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {criterion.label}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Peso {criterion.weight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-center">
                      <span className="text-xs text-gray-400 md:hidden">
                        Producto A
                      </span>

                      <span
                        className={`font-bold ${
                          criterionScoreA !==
                            undefined &&
                          criterionScoreB !==
                            undefined &&
                          criterionScoreA >
                            criterionScoreB
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {criterionScoreA !==
                        undefined
                          ? `${criterionScoreA}/10`
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between md:justify-center">
                      <span className="text-xs text-gray-400 md:hidden">
                        Producto B
                      </span>

                      <span
                        className={`font-bold ${
                          criterionScoreA !==
                            undefined &&
                          criterionScoreB !==
                            undefined &&
                          criterionScoreB >
                            criterionScoreA
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {criterionScoreB !==
                        undefined
                          ? `${criterionScoreB}/10`
                          : "—"}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      {winner}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-gray-50 p-4">
        <p className="text-xs leading-5 text-gray-600">
          El ESP Score es una valoración editorial
          propia de ElectroSpainPro. El producto con
          mayor puntuación global no tiene por qué ser
          la mejor elección para todas las aplicaciones.
          La recomendación final también debe considerar
          las necesidades concretas del profesional y las
          especificaciones técnicas del producto.
        </p>
      </div>
    </section>
  );
}