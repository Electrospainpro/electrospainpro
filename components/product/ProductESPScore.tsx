import type {
  ESPScore,
} from "@/types/esp";

interface ProductESPScoreProps {
  score?: ESPScore;
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

function getConfidenceLabel(
  confidence: ESPScore["confidence"]
): string {
  if (confidence === "high") {
    return "Alta";
  }

  if (confidence === "medium") {
    return "Media";
  }

  return "Baja";
}

function getStatusLabel(
  status: ESPScore["status"]
): string {
  if (status === "published") {
    return "Valoración publicada";
  }

  if (status === "reviewed") {
    return "Valoración revisada";
  }

  return "Valoración pendiente";
}

function getCriterionScoreLabel(
  score: number | null
): string {
  if (score === null) {
    return "Pendiente";
  }

  return `${score}/10`;
}

function getProgressWidth(
  score: number | null
): string {
  if (score === null) {
    return "0%";
  }

  return `${Math.min(
    Math.max(score, 0),
    10
  ) * 10}%`;
}

export default function ProductESPScore({
  score,
}: ProductESPScoreProps) {
  if (!score) {
    return (
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            ElectroSpainPro
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            ESP Score
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Sistema de valoración propio de
            ElectroSpainPro para evaluar productos
            técnicos desde una perspectiva profesional.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-dashed bg-gray-50 p-5">
          <p className="font-semibold">
            Valoración pendiente
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Este producto todavía no dispone de una
            valoración ESP Score completa. La puntuación
            se publicará cuando finalice la revisión
            metodológica.
          </p>
        </div>
      </section>
    );
  }

  const isScoreComplete =
    score.overall !== null;

  return (
    <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            ElectroSpainPro
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            ESP Score
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Valoración editorial propia basada en
            siete criterios ponderados específicamente
            para profesionales.
          </p>
        </div>

        <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-50">
          <span className="text-3xl font-bold text-blue-700">
            {score.overall !== null
              ? score.overall
              : "—"}
          </span>

          <span className="text-xs font-medium text-blue-600">
            {score.overall !== null
              ? "/ 10"
              : "Pendiente"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          Confianza:{" "}
          {getConfidenceLabel(
            score.confidence
          )}
        </span>

        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          {getStatusLabel(
            score.status
          )}
        </span>

        {score.methodologyVersion && (
          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            Metodología{" "}
            {score.methodologyVersion}
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {criteria.map((criterion) => {
          const criterionData =
            score.criteria[
              criterion.key
            ];

          const criterionScore =
            criterionData.score;

          return (
            <div
              key={criterion.key}
              className="rounded-xl border bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {criterion.label}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Peso {criterion.weight}
                  </p>
                </div>

                <span
                  className={`font-bold ${
                    criterionScore === null
                      ? "text-gray-400"
                      : "text-blue-700"
                  }`}
                >
                  {getCriterionScoreLabel(
                    criterionScore
                  )}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width:
                      getProgressWidth(
                        criterionScore
                      ),
                  }}
                />
              </div>

              <p className="mt-3 text-sm leading-5 text-gray-600">
                {criterionData.reason ||
                  "Este criterio está pendiente de valoración editorial."}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>
            ESP Score global:
          </strong>{" "}
          {isScoreComplete
            ? `${score.overall}/10`
            : "Pendiente de valoración"}
        </p>

        <p className="mt-2 text-xs leading-5 text-blue-800">
          El ESP Score es una valoración editorial
          propia de ElectroSpainPro. No sustituye las
          especificaciones técnicas, certificaciones ni
          documentación oficial del fabricante.
        </p>
      </div>
    </section>
  );
}