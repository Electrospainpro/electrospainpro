"use client";

import { useState } from "react";

import CalculatorHeader from "./CalculatorHeader";
import CalculatorInput from "./CalculatorInput";
import CalculatorResult from "./CalculatorResult";
import CalculatorResultRow from "./CalculatorResultRow";
import CalculatorSelect from "./CalculatorSelect";
import CalculatorShell from "./CalculatorShell";

import {
  calculateVoltageDrop,
  type VoltageDropResult,
} from "@/lib/calculators/voltage-drop";

type SystemValue =
  | "single-phase"
  | "three-phase";

type MaterialValue =
  | "copper"
  | "aluminum";

function formatNumber(
  value: number,
  decimals = 2,
): string {
  return new Intl.NumberFormat(
    "es-ES",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    },
  ).format(value);
}

export default function VoltageDropCalculator() {
  const [system, setSystem] =
    useState<SystemValue>(
      "single-phase",
    );

  const [voltage, setVoltage] =
    useState("230");

  const [length, setLength] =
    useState("30");

  const [current, setCurrent] =
    useState("16");

  const [section, setSection] =
    useState("2.5");

  const [material, setMaterial] =
    useState<MaterialValue>(
      "copper",
    );

  const [limitPercent, setLimitPercent] =
    useState("3");

  const [result, setResult] =
    useState<VoltageDropResult | null>(
      null,
    );

  const [error, setError] =
    useState("");

  function handleCalculate() {
    setError("");
    setResult(null);

    const voltageValue =
      Number(voltage);

    const lengthValue =
      Number(length);

    const currentValue =
      Number(current);

    const sectionValue =
      Number(section);

    const limitValue =
      Number(limitPercent);

    try {
      const calculation =
        calculateVoltageDrop({
          system,
          voltage: voltageValue,
          length: lengthValue,
          current: currentValue,
          section: sectionValue,
          material,
          limitPercent: limitValue,
        });

      setResult(calculation);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "No se ha podido realizar el cálculo.",
      );
    }
  }

  const isWithinLimit =
    result?.withinLimit === true;

  const hasResult =
    result !== null;

  return (
    <CalculatorShell>
      <CalculatorHeader
        title="Calculadora de caída de tensión"
        description="Calcula la caída de tensión de una línea eléctrica a partir de la tensión, longitud, intensidad, sección y material del conductor."
      />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            <CalculatorSelect
              id="system"
              label="Sistema eléctrico"
              value={system}
              onChange={(value) =>
                setSystem(
                  value as SystemValue,
                )
              }
              options={[
                {
                  value: "single-phase",
                  label: "Monofásica",
                },
                {
                  value: "three-phase",
                  label: "Trifásica",
                },
              ]}
            />

            <CalculatorSelect
              id="material"
              label="Material del conductor"
              value={material}
              onChange={(value) =>
                setMaterial(
                  value as MaterialValue,
                )
              }
              options={[
                {
                  value: "copper",
                  label: "Cobre",
                },
                {
                  value: "aluminum",
                  label: "Aluminio",
                },
              ]}
            />

            <CalculatorInput
              id="voltage"
              label="Tensión"
              unit="V"
              value={voltage}
              onChange={setVoltage}
              min={0}
              step="any"
              required
              helpText={
                system ===
                "single-phase"
                  ? "Ejemplo habitual: 230 V."
                  : "Introduce la tensión entre fases."
              }
            />

            <CalculatorInput
              id="length"
              label="Longitud de la línea"
              unit="m"
              value={length}
              onChange={setLength}
              min={0}
              step="any"
              required
            />

            <CalculatorInput
              id="current"
              label="Intensidad"
              unit="A"
              value={current}
              onChange={setCurrent}
              min={0}
              step="any"
              required
            />

            <CalculatorInput
              id="section"
              label="Sección del conductor"
              unit="mm²"
              value={section}
              onChange={setSection}
              min={0}
              step="any"
              required
            />

            <CalculatorInput
              id="limit"
              label="Límite de caída"
              unit="%"
              value={limitPercent}
              onChange={setLimitPercent}
              min={0}
              step="any"
              required
              helpText="Introduce el límite que quieras comprobar."
            />
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto"
          >
            Calcular caída de tensión
          </button>

          {error ? (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          ) : null}
        </div>

        <div>
          {hasResult ? (
            <CalculatorResult
              title="Resultado"
              status={
                isWithinLimit
                  ? "success"
                  : "warning"
              }
            >
              <div
                className={`mb-5 rounded-2xl p-5 ${
                  isWithinLimit
                    ? "bg-emerald-100/70"
                    : "bg-amber-100/70"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                  Caída de tensión
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-slate-950">
                    {formatNumber(
                      result.voltageDrop,
                      2,
                    )}
                  </span>

                  <span className="text-sm font-semibold text-slate-600">
                    V
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {formatNumber(
                    result.voltageDropPercent,
                    2,
                  )}
                  %
                </p>
              </div>

              <div>
                <CalculatorResultRow
                  label="Tensión final"
                  value={formatNumber(
                    result.finalVoltage,
                    2,
                  )}
                  unit="V"
                  highlight
                />

                <CalculatorResultRow
                  label="Resistencia de la línea"
                  value={formatNumber(
                    result.resistance,
                    4,
                  )}
                  unit="Ω"
                />

                <CalculatorResultRow
                  label="Límite introducido"
                  value={formatNumber(
                    result.limitPercent ?? 0,
                    2,
                  )}
                  unit="%"
                />

                <CalculatorResultRow
                  label="Estado"
                  value={
                    isWithinLimit
                      ? "Dentro del límite"
                      : "Supera el límite"
                  }
                />
              </div>
            </CalculatorResult>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-slate-200">
                  ⚡
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  Introduce los datos
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Completa los parámetros de la
                  línea y pulsa calcular para
                  obtener la caída de tensión.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </CalculatorShell>
  );
}