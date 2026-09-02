"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/calculators/CalculatorHeader";
import CalculatorInput from "@/components/calculators/CalculatorInput";
import CalculatorResult from "@/components/calculators/CalculatorResult";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import CalculatorSelect from "@/components/calculators/CalculatorSelect";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";

import {
  convertAwgMm2,
  type AwgMm2Result,
} from "@/lib/calculators/awg-mm2";

type ConversionMode =
  | "awg-to-mm2"
  | "mm2-to-awg";

const AWG_OPTIONS = [
  20,
  18,
  16,
  14,
  12,
  10,
  8,
  6,
  4,
  3,
  2,
  1,
  0,
  -1,
  -2,
  -3,
  -4,
  -5,
  -6,
  -7,
  -8,
];

function formatAwg(value: number): string {
  if (value === 0) {
    return "1/0";
  }

  if (value < 0) {
    return `${Math.abs(value) + 1}/0`;
  }

  return String(value);
}

function formatNumber(
  value: number,
  maximumFractionDigits = 3,
): string {
  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits,
  }).format(value);
}

export default function AwgMm2Calculator() {
  const [mode, setMode] =
    useState<ConversionMode>("awg-to-mm2");

  const [awg, setAwg] = useState("12");
  const [mm2, setMm2] = useState("3.31");

  const [result, setResult] =
    useState<AwgMm2Result | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function handleModeChange(value: string) {
    const nextMode =
      value as ConversionMode;

    setMode(nextMode);
    setResult(null);
    setError(null);
  }

  function handleCalculate() {
    setResult(null);
    setError(null);

    try {
      if (mode === "awg-to-mm2") {
        const value = Number(awg);

        if (!Number.isFinite(value)) {
          throw new Error(
            "Introduce un valor AWG válido.",
          );
        }

        const calculated =
          convertAwgMm2({
            awg: value,
          });

        setResult(calculated);
        return;
      }

      const value = Number(
        mm2.replace(",", "."),
      );

      if (!Number.isFinite(value)) {
        throw new Error(
          "Introduce una sección válida.",
        );
      }

      const calculated =
        convertAwgMm2({
          mm2: value,
        });

      setResult(calculated);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "No se ha podido realizar la conversión.",
      );
    }
  }

  return (
    <CalculatorShell>
      <CalculatorHeader
        title="Conversor AWG ↔ mm²"
        description="Consulta la equivalencia aproximada entre calibres AWG y secciones métricas en mm²."
      />

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <CalculatorSelect
            id="awg-mm2-mode"
            label="Conversión"
            value={mode}
            onChange={handleModeChange}
            options={[
              {
                value: "awg-to-mm2",
                label: "AWG → mm²",
              },
              {
                value: "mm2-to-awg",
                label: "mm² → AWG",
              },
            ]}
          />

          {mode === "awg-to-mm2" ? (
            <CalculatorSelect
              id="awg-value"
              label="Calibre AWG"
              value={awg}
              onChange={setAwg}
              options={AWG_OPTIONS.map(
                (value) => ({
                  value: String(value),
                  label: `${formatAwg(value)} AWG`,
                }),
              )}
              helpText="Selecciona un calibre disponible en la tabla de equivalencias."
            />
          ) : (
            <CalculatorInput
              id="mm2-value"
              label="Sección"
              unit="mm²"
              type="number"
              value={mm2}
              onChange={setMm2}
              min={0}
              step="0.001"
              placeholder="Ej. 3,31"
              helpText="Introduce la sección métrica para encontrar el AWG comercial más próximo."
            />
          )}

          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            Calcular equivalencia
          </button>
        </div>

        <div className="min-w-0">
          {error ? (
            <CalculatorResult
              title="No se puede realizar la conversión"
              status="warning"
            >
              <p className="text-sm text-amber-800">
                {error}
              </p>
            </CalculatorResult>
          ) : result ? (
            <CalculatorResult
              title={
                result.direction ===
                "awg-to-mm2"
                  ? "Equivalencia encontrada"
                  : "AWG más próximo"
              }
              status="success"
            >
              {result.direction ===
              "awg-to-mm2" ? (
                <>
                  <CalculatorResultRow
                    label="Calibre"
                    value={formatAwg(
                      result.awg ?? 0,
                    )}
                    unit="AWG"
                    highlight
                  />

                  <CalculatorResultRow
                    label="Sección equivalente"
                    value={formatNumber(
                      result.mm2 ?? 0,
                    )}
                    unit="mm²"
                    highlight
                  />
                </>
              ) : (
                <>
                  <CalculatorResultRow
                    label="Sección introducida"
                    value={formatNumber(
                      result.mm2 ?? 0,
                    )}
                    unit="mm²"
                  />

                  <CalculatorResultRow
                    label="AWG más próximo"
                    value={
                      result.nearestAwg !==
                      undefined
                        ? formatAwg(
                            result.nearestAwg,
                          )
                        : "—"
                    }
                    unit="AWG"
                    highlight
                  />

                  <CalculatorResultRow
                    label="Sección de referencia"
                    value={formatNumber(
                      result.nearestMm2 ?? 0,
                    )}
                    unit="mm²"
                  />
                </>
              )}

              <TechnicalWarning>
                {result.warning}
              </TechnicalWarning>
            </CalculatorResult>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Introduce los datos
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  El resultado de la equivalencia
                  aparecerá aquí.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}