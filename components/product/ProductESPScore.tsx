import type { ESPScore } from "@/types/esp";
import type { ESPEvidence } from "@/types/evidence";

interface ProductESPScoreProps {
  score?: ESPScore;
  pros?: string[];
  cons?: string[];
  buyUrl?: string;
}

const criteria = [
  {
    key: "quality",
    label: "Calidad",
    weight: "20 %",
    icon: "shield",
  },
  {
    key: "reliability",
    label: "Fiabilidad",
    weight: "20 %",
    icon: "verified",
  },
  {
    key: "valueForMoney",
    label: "Relación calidad/precio",
    weight: "15 %",
    icon: "money",
  },
  {
    key: "installation",
    label: "Facilidad de instalación",
    weight: "10 %",
    icon: "tool",
  },
  {
    key: "durability",
    label: "Durabilidad",
    weight: "15 %",
    icon: "shield",
  },
  {
    key: "availability",
    label: "Disponibilidad",
    weight: "10 %",
    icon: "box",
  },
  {
    key: "warranty",
    label: "Garantía",
    weight: "10 %",
    icon: "award",
  },
] as const;

function formatScore(value: number | null): string {
  if (value === null) {
    return "—";
  }

  return value.toLocaleString("es-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatDate(value?: string): string | null {
  if (!value) {
    return null;
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getConfidenceLabel(
  confidence: ESPScore["confidence"],
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
  status: ESPScore["status"],
): string {
  if (status === "published") {
    return "Publicada";
  }

  if (status === "reviewed") {
    return "Revisada";
  }

  return "Pendiente";
}

function getEvidenceLabel(
  type: ESPEvidence["type"],
): string {
  if (type === "manufacturer") {
    return "Fabricante";
  }

  if (type === "distributor") {
    return "Distribuidor";
  }

  if (type === "installer") {
    return "Instalador";
  }

  if (type === "field-experience") {
    return "Experiencia de campo";
  }

  if (type === "independent") {
    return "Fuente independiente";
  }

  if (type === "official-document") {
    return "Documento oficial";
  }

  return "Otra fuente";
}

function getEvidenceBadgeClass(
  type: ESPEvidence["type"],
): string {
  if (
    type === "installer" ||
    type === "field-experience"
  ) {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  if (type === "manufacturer") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (type === "distributor") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (type === "independent") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

function getEvidenceConfidenceLabel(
  confidence: ESPEvidence["confidence"],
): string {
  if (confidence === "high") {
    return "Alta";
  }

  if (confidence === "medium") {
    return "Media";
  }

  return "Baja";
}

function getExperienceScope(
  evidence: ESPEvidence,
): "brand" | "product" | null {
  if (
    evidence.type !== "installer" &&
    evidence.type !== "field-experience"
  ) {
    return null;
  }

  if ("experienceScope" in evidence) {
    if (evidence.experienceScope === "product") {
      return "product";
    }

    if (evidence.experienceScope === "brand") {
      return "brand";
    }
  }

  return "brand";
}

function getExperienceScopeLabel(
  evidence: ESPEvidence,
): string | null {
  const scope = getExperienceScope(evidence);

  if (scope === "product") {
    return "Experiencia directa con este producto";
  }

  if (scope === "brand") {
    return "Experiencia de marca";
  }

  return null;
}

function getEvidenceItems(
  score: ESPScore,
): ESPEvidence[] {
  const evidenceMap = new Map<string, ESPEvidence>();

  Object.values(score.criteria).forEach(
    (criterion) => {
      if (!criterion.evidence?.length) {
        return;
      }

      criterion.evidence.forEach(
        (item: ESPEvidence) => {
          const key = [
            item.type,
            item.title,
            item.source ?? "",
            item.date ?? "",
          ].join("|");

          if (!evidenceMap.has(key)) {
            evidenceMap.set(key, item);
          }
        },
      );
    },
  );

  return Array.from(evidenceMap.values());
}

/* ============================================================
   COMPONENTE PRINCIPAL
============================================================ */

export default function ProductESPScore({
  score,
}: ProductESPScoreProps) {
  if (!score) {
    return (
      <section className="mt-10 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <div className="px-6 py-8 sm:px-8 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            ElectroSpainPro
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            ESP Score
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Valoración profesional pendiente.
          </p>
        </div>
      </section>
    );
  }

  const evidence = getEvidenceItems(score);

  const evaluatedDate = formatDate(
    score.evaluatedAt,
  );

  return (
    <section className="mt-10 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.055)]">
      {/* ======================================================
          CABECERA
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white px-6 py-7 sm:px-8 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                ElectroSpainPro
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              ESP Score
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Valoración editorial propia basada en siete
              criterios ponderados específicamente para
              profesionales.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
                Confianza:
                <strong className="text-slate-950">
                  {getConfidenceLabel(score.confidence)}
                </strong>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
                Estado:
                <strong className="text-slate-950">
                  {getStatusLabel(score.status)}
                </strong>
              </span>

              {score.methodologyVersion && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
                  Metodología:
                  <strong className="text-slate-950">
                    {score.methodologyVersion}
                  </strong>
                </span>
              )}

              {evaluatedDate && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
                  Revisado:
                  <strong className="text-slate-950">
                    {evaluatedDate}
                  </strong>
                </span>
              )}
            </div>
          </div>

          {/* SCORE GLOBAL */}

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50/80 to-slate-50 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-[112px] w-[112px] shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)]">
                <span className="text-4xl font-bold leading-none tracking-tight">
                  {formatScore(score.overall)}
                </span>

                <span className="mt-2 text-sm font-semibold text-blue-100">
                  /10
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-blue-700">
                  ESP Score global
                </p>

                <p className="mt-2 text-base font-bold text-slate-950">
                  Valoración profesional
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Siete criterios evaluados
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

 {/* ======================================================
    CRITERIOS
====================================================== */}

<section className="bg-slate-50/60 px-6 py-8 sm:px-8 lg:px-10">
  {/* CABECERA DE EVALUACIÓN */}

  <div>
    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
      Evaluación
    </p>

    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
      Criterios del ESP Score
    </h3>

    <p className="mt-2 text-xs font-medium text-slate-500">
      Ponderación total: 100 %
    </p>
  </div>

  {/* ======================================================
      TARJETAS DE CRITERIOS
  ====================================================== */}

  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {criteria.map((criterion) => {
      const criterionData = score.criteria[criterion.key];

      const scoreValue =
        criterionData.score === null
          ? 0
          : criterionData.score;

      const scorePercent = Math.max(
        0,
        Math.min(100, scoreValue * 10),
      );

      return (
        <article
          key={criterion.key}
          className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_3px_12px_rgba(15,23,42,0.04)]"
        >
          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="flex items-start gap-3">
            {/* ICONO */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              {criterion.icon === "money" ? (
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M15 9.5c0-1.1-1.2-2-3-2s-3 .9-3 2 1.2 2 3 2 3 .9 3 2-1.2 2-3 2-3-.9-3-2" />
                </svg>
              ) : criterion.icon === "tool" ? (
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a4 4 0 0 0-5.1 5.1L4 17l3 3 5.6-5.6a4 4 0 0 0 5.1-5.1l-2.2 2.2-2.1-.6-.6-2.1z" />
                </svg>
              ) : criterion.icon === "box" ? (
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
                  <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
                </svg>
              ) : criterion.icon === "award" ? (
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M8.5 11.5 7 21l5-3 5 3-1.5-9.5" />
                </svg>
              ) : (
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3 5 6v5c0 4.5 2.9 8.2 7 10 4.1-1.8 7-5.5 7-10V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              )}
            </div>

            {/* NOMBRE + PUNTUACIÓN */}

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="min-w-0 pr-1 text-[15px] font-bold leading-5 text-slate-950">
                  {criterion.label}
                </h4>

                <div className="shrink-0 whitespace-nowrap text-right">
                  <span className="text-[18px] font-bold leading-none text-blue-600">
                    {formatScore(criterionData.score)}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-700">
                    /10
                  </span>
                </div>
              </div>

              {/* BARRA */}

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{
                    width: `${scorePercent}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              PESO
          ================================================== */}

          <div className="mt-4">
            <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
              Peso {criterion.weight}
            </span>
          </div>

          {/* ==================================================
              EXPLICACIÓN
          ================================================== */}

          <p className="mt-4 text-[12px] leading-[1.6] text-slate-600">
            {criterionData.reason}
          </p>
        </article>
      );
    })}
  </div>
</section>

      {/* ======================================================
          EVIDENCIAS ESP
      ====================================================== */}

      {evidence.length > 0 && (
        <section className="border-t border-slate-200 bg-white px-6 py-8 sm:px-8 lg:px-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Evidencias ESP
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              ¿Por qué esta puntuación?
            </h3>

            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-600">
              Cada valoración puede apoyarse en diferentes
              tipos de evidencia. ElectroSpainPro identifica
              su procedencia, nivel y confianza para
              diferenciar los datos técnicos de la experiencia
              profesional.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {evidence.map((item, index) => {
              const scope =
                getExperienceScope(item);

              const scopeLabel =
                getExperienceScopeLabel(item);

              return (
                <article
                  key={`${item.type}-${item.title}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]"
                >
                  {/* CABECERA EVIDENCIA */}

                  <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${getEvidenceBadgeClass(
                          item.type,
                        )}`}
                      >
                        {getEvidenceLabel(item.type)}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
                        Nivel {item.level}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
                        Confianza{" "}
                        {getEvidenceConfidenceLabel(
                          item.confidence,
                        )}
                      </span>
                    </div>
                  </div>

                  {/* CONTENIDO */}

                  <div className="px-5 py-5 sm:px-6">
                    {scopeLabel && (
                      <div
                        className={`mb-5 rounded-xl border px-4 py-3 ${
                          scope === "brand"
                            ? "border-violet-200 bg-violet-50/70"
                            : "border-blue-200 bg-blue-50/70"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              scope === "brand"
                                ? "bg-violet-100 text-violet-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            ✓
                          </div>

                          <div>
                            <p
                              className={`text-[11px] font-bold uppercase tracking-[0.08em] ${
                                scope === "brand"
                                  ? "text-violet-700"
                                  : "text-blue-700"
                              }`}
                            >
                              Alcance de la evidencia
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {scopeLabel}
                            </p>

                            {scope === "brand" && (
                              <p className="mt-1 text-xs leading-5 text-violet-700">
                                Esta experiencia corresponde a la
                                marca y no implica experiencia directa
                                con este modelo.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <h4 className="text-base font-bold text-slate-950">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  {/* FUENTE */}

                  {(item.sourceName || item.date) && (
                    <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
                      {item.sourceName && (
                        <span className="text-slate-500">
                          <strong className="text-slate-700">
                            Fuente:
                          </strong>{" "}
                          {item.sourceName}
                        </span>
                      )}

                      {item.date && (
                        <span className="text-slate-400">
                          Evidencia registrada:{" "}
                          {formatDate(item.date)}
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* NOTA METODOLÓGICA */}

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                i
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-950">
                  Nota metodológica
                </h4>

                <p className="mt-1 text-[11px] leading-5 text-slate-600">
                  La experiencia profesional de campo puede
                  utilizarse como evidencia contextual. Cuando
                  la experiencia corresponde a otros productos
                  de una misma marca, se identifica expresamente
                  como experiencia de marca y no como experiencia
                  directa con el modelo evaluado.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          AVISO EDITORIAL
      ====================================================== */}

      <div className="border-t border-slate-200 px-6 py-5 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
              !
            </div>

            <p className="text-[11px] leading-5 text-slate-600">
              El ESP Score es una valoración editorial propia
              de ElectroSpainPro. No sustituye las
              especificaciones técnicas, certificaciones ni
              documentación oficial del fabricante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}