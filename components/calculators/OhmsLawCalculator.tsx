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
  calculateOhmsLaw,
  type OhmsLawResult,
  type OhmsLawVariable,
} from "@/lib/calculators/ohms-law";

type CalculateMode = OhmsLawVariable;

function formatNumber(
  value: number,
  maximumFractionDigits = 6,
): string {
  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits,
  }).format(value);
}

export default function OhmsLawCalculator() {
  const [mode, setMode] =
    useState<CalculateMode>("voltage");

  const [voltage, setVoltage] = useState("230");
  const [current, setCurrent] = useState("10");
  const [resistance, setResistance] = useState("23");

  const [result, setResult] =
    useState<OhmsLawResult | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function handleModeChange(value: string) {
    setMode(value as CalculateMode);
    setResult(null);
    setError(null);
  }

  function handleCalculate() {
    setResult(null);
    setError(null);

    try {
      let calculated: OhmsLawResult;

      if (mode === "voltage") {
        calculated = calculateOhmsLaw({
          current: Number(
            current.replace(",", "."),
          ),
          resistance: Number(
            resistance.replace(",", "."),
          ),
        });
      } else if (mode === "current") {
        calculated = calculateOhmsLaw({
          voltage: Number(
            voltage.replace(",", "."),
          ),
          resistance: Number(
            resistance.replace(",", "."),
          ),
        });
      } else {
        calculated = calculateOhmsLaw({
          voltage: Number(
            voltage.replace(",", "."),
          ),
          current: Number(
            current.replace(",", "."),
          ),
        });
      }

      setResult(calculated);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "No se ha podido realizar el cálculo.",
      );
    }
  }

  const inputDescription =
    mode === "voltage"
      ? "Introduce intensidad y resistencia."
      : mode === "current"
        ? "Introduce tensión y resistencia."
        : "Introduce tensión e intensidad.";

  return (
    <CalculatorShell>
      <CalculatorHeader
        title="Calculadora de Ley de Ohm"
        description="Calcula tensión, intensidad o resistencia introduciendo las otras dos magnitudes."
      />

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <CalculatorSelect
            id="ohms-law-mode"
            label="¿Qué quieres calcular?"
            value={mode}
            onChange={handleModeChange}
            options={[
              {
                value: "voltage",
                label: "Tensión (V)",
              },
              {
                value: "current",
                label: "Intensidad (A)",
              },
              {
                value: "resistance",
                label: "Resistencia (Ω)",
              },
            ]}
            helpText={inputDescription}
          />

          {mode === "voltage" ? (
            <>
              <CalculatorInput
                id="ohms-current"
                label="Intensidad"
                unit="A"
                type="number"
                value={current}
                onChange={setCurrent}
                min={0}
                step="any"
                placeholder="Ej. 2"
              />

              <CalculatorInput
                id="ohms-resistance"
                label="Resistencia"
                unit="Ω"
                type="number"
                value={resistance}
                onChange={setResistance}
                min={0}
                step="any"
                placeholder="Ej. 10"
              />
            </>
          ) : null}

          {mode === "current" ? (
            <>
              <CalculatorInput
                id="ohms-voltage"
                label="Tensión"
                unit="V"
                type="number"
                value={voltage}
                onChange={setVoltage}
                min={0}
                step="any"
                placeholder="Ej. 230"
              />

              <CalculatorInput
                id="ohms-resistance"
                label="Resistencia"
                unit="Ω"
                type="number"
                value={resistance}
                onChange={setResistance}
                min={0}
                step="any"
                placeholder="Ej. 46"
              />
            </>
          ) : null}

          {mode === "resistance" ? (
            <>
              <CalculatorInput
                id="ohms-voltage"
                label="Tensión"
                unit="V"
                type="number"
                value={voltage}
                onChange={setVoltage}
                min={0}
                step="any"
                placeholder="Ej. 230"
              />

              <CalculatorInput
                id="ohms-current"
                label="Intensidad"
                unit="A"
                type="number"
                value={current}
                onChange={setCurrent}
                min={0}
                step="any"
                placeholder="Ej. 10"
              />
            </>
          ) : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            Calcular
          </button>
        </div>

        <div className="min-w-0">
          {error ? (
            <CalculatorResult
              title="No se puede realizar el cálculo"
              status="warning"
            >
              <p className="text-sm text-amber-800">
                {error}
              </p>
            </CalculatorResult>
          ) : result ? (
            <CalculatorResult
              title="Resultado"
              status="success"
            >
              <CalculatorResultRow
                label="Tensión"
                value={formatNumber(
                  result.voltage,
                )}
                unit="V"
                highlight={
                  result.calculated ===
                  "voltage"
                }
              />

              <CalculatorResultRow
                label="Intensidad"
                value={formatNumber(
                  result.current,
                )}
                unit="A"
                highlight={
                  result.calculated ===
                  "current"
                }
              />

              <CalculatorResultRow
                label="Resistencia"
                value={formatNumber(
                  result.resistance,
                )}
                unit="Ω"
                highlight={
                  result.calculated ===
                  "resistance"
                }
              />

              <div className="mt-4 rounded-xl bg-slate-100 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                  Fórmula aplicada
                </p>

                <p className="mt-2 text-base font-bold text-slate-900">
                  {result.formula}
                </p>
              </div>

              <TechnicalWarning>
                {result.warning}
              </TechnicalWarning>
            </CalculatorResult>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Introduce los datos
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  El resultado aparecerá aquí.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}