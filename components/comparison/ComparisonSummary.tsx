import type { Product } from "@/types/product";

interface ComparisonSummaryProps {
  products: Product[];
}

interface Difference {
  label: string;
  productA: string;
  productB: string;
  description: string;
}

function getSpecification(
  product: Product,
  label: string
): string | undefined {
  return product.specifications?.find(
    (specification) =>
      specification.label.toLowerCase() ===
      label.toLowerCase()
  )?.value;
}

function buildDifferences(
  productA: Product,
  productB: Product
): Difference[] {
  const differences: Difference[] = [];

  const currentA = getSpecification(
    productA,
    "Corriente AC"
  );

  const currentB =
    getSpecification(
      productB,
      "Corriente AC/DC"
    );

  if (currentA || currentB) {
    differences.push({
      label: "Medición de corriente",
      productA: currentA ?? "—",
      productB: currentB ?? "—",
      description:
        "La información disponible muestra que el Fluke 325 incorpora medición AC/DC, mientras que en el Fluke 323 se indica medición de corriente AC.",
    });
  }

  const temperatureB =
    getSpecification(
      productB,
      "Temperatura"
    );

  if (temperatureB) {
    differences.push({
      label: "Medición de temperatura",
      productA:
        getSpecification(
          productA,
          "Temperatura"
        ) ?? "No indicada",
      productB: temperatureB,
      description:
        "La ficha de datos disponible para el Fluke 325 incluye medición de temperatura.",
    });
  }

  const frequencyB =
    getSpecification(
      productB,
      "Frecuencia"
    );

  if (frequencyB) {
    differences.push({
      label: "Medición de frecuencia",
      productA:
        getSpecification(
          productA,
          "Frecuencia"
        ) ?? "No indicada",
      productB: frequencyB,
      description:
        "La ficha de datos disponible para el Fluke 325 incluye medición de frecuencia.",
    });
  }

  return differences;
}

export default function ComparisonSummary({
  products,
}: ComparisonSummaryProps) {
  if (products.length < 2) {
    return null;
  }

  const [productA, productB] = products;

  const differences = buildDifferences(
    productA,
    productB
  );

  if (differences.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Análisis
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Diferencias principales
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Estas diferencias se muestran a partir de las
          especificaciones técnicas actualmente verificadas
          en ElectroSpainPro.
        </p>
      </div>

      <div className="space-y-6">
        {differences.map((difference) => (
          <article
            key={difference.label}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold">
              {difference.label}
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-500">
                  {productA.name}
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {difference.productA}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-500">
                  {productB.name}
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {difference.productB}
                </p>
              </div>
            </div>

            <p className="mt-5 text-gray-600">
              {difference.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}