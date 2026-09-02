"use client";

import { useState } from "react";

import CalculatorHeader from "./CalculatorHeader";
import CalculatorInput from "./CalculatorInput";
import CalculatorResult from "./CalculatorResult";
import CalculatorResultRow from "./CalculatorResultRow";
import CalculatorSelect from "./CalculatorSelect";
import CalculatorShell from "./CalculatorShell";

import {
  calculateCableSection,
  type CableSectionResult,
} from "@/lib/calculators/cable-section";

type SystemValue =
  | "single-phase"
  | "three-phase";

type MaterialValue =
  | "copper"
  | "aluminum";

type CalculationMode =
  | "current"
  | "power";

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

export default function CableSectionCalculator() {
  const [system, setSystem] =
    useState<SystemValue>(
      "single-phase",
    );

  const [mode, setMode] =
    useState<CalculationMode>(
      "current",
    );

  const [voltage, setVoltage] =
    useState("230");

  const [length, setLength] =
    useState("30");

  const [current, setCurrent] =
    useState("16");

  const [power, setPower] =
    useState("3680");

  const [powerFactor, setPowerFactor] =
    useState("1");

  const [material, setMaterial] =
    useState<MaterialValue>(
      "copper",
    );

  const [limitPercent, setLimitPercent] =
    useState("3");

  const [result, setResult] =
    useState<CableSectionResult | null>(
      null,
    );

  const [error, setError] =
    useState("");

  function handleCalculate() {
    setError("");
    setResult(null);

    try {
      const calculation =
        calculateCableSection({
          system,
          voltage: Number(voltage),
          length: Number(length),
          material,
          limitPercent:
            Number(limitPercent),

          ...(mode === "current"
            ? {
                current: Number(current),
              }
            : {
                power: Number(power),
                powerFactor:
                  Number(powerFactor),
              }),
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

  const hasResult =
    result !== null;

  const recommendedSection =
    result?.recommendedSection;

  const alternatives =
    result?.alternatives ?? [];

  return (
    <CalculatorShell>
      <CalculatorHeader
        title="Calculadora de sección de cable"
        description="Calcula una sección orientativa según potencia o intensidad, tensión, longitud, material y límite de caída de tensión."
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
              id="mode"
              label="Calcular desde"
              value={mode}
              onChange={(value) =>
                setMode(
                  value as CalculationMode,
                )
              }
              options={[
                {
                  value: "current",
                  label: "Intensidad",
                },
                {
                  value: "power",
                  label: "Potencia",
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

            {mode === "current" ? (
              <CalculatorInput
                id="current"
                label="Intensidad"
                unit="A"
                value={current}
                onChange={setCurrent}
                min={0}
                step="any"
                required
                helpText="Introduce la intensidad prevista o calculada de la línea."
              />
            ) : (
              <CalculatorInput
                id="power"
                label="Potencia"
                unit="W"
                value={power}
                onChange={setPower}
                min={0}
                step="any"
                required
                helpText="Potencia activa de la carga."
              />
            )}

            {mode === "power" ? (
              <CalculatorInput
                id="powerFactor"
                label="Factor de potencia"
                unit="cos φ"
                value={powerFactor}
                onChange={setPowerFactor}
                min={0}
                max={1}
                step="0.01"
                required
                helpText="Valor entre 0 y 1."
              />
            ) : null}

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
              id="limit"
              label="Límite de caída"
              unit="%"
              value={limitPercent}
              onChange={setLimitPercent}
              min={0}
              step="any"
              required
              helpText="Límite máximo que quieres comprobar."
            />
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto"
          >
            Calcular sección
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
              title="Sección recomendada"
              status={
                recommendedSection
                  ? "success"
                  : "warning"
              }
            >
              {recommendedSection ? (
                <>
                  <div className="mb-5 rounded-2xl bg-emerald-100/70 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                      Primera sección que cumple
                    </p>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight text-slate-950">
                        {formatNumber(
                          recommendedSection,
                          2,
                        )}
                      </span>

                      <span className="text-sm font-semibold text-slate-600">
                        mm²
                      </span>
                    </div>
                  </div>

                  <CalculatorResultRow
                    label="Intensidad calculada"
                    value={formatNumber(
                      result.current,
                      2,
                    )}
                    unit="A"
                    highlight
                  />

                  <CalculatorResultRow
                    label="Caída de tensión"
                    value={formatNumber(
                      result.voltageDrop ?? 0,
                      2,
                    )}
                    unit="V"
                  />

                  <CalculatorResultRow
                    label="Caída porcentual"
                    value={formatNumber(
                      result.voltageDropPercent ?? 0,
                      2,
                    )}
                    unit="%"
                  />

                  <CalculatorResultRow
                    label="Tensión final"
                    value={formatNumber(
                      result.finalVoltage ?? 0,
                      2,
                    )}
                    unit="V"
                  />
                </>
              ) : (
                <div className="rounded-2xl bg-amber-100/70 p-5">
                  <p className="text-sm font-bold text-amber-950">
                    No se ha encontrado una sección
                    dentro del rango disponible que
                    cumpla el límite introducido.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-900/80">
                    Prueba con una sección mayor,
                    una longitud menor o revisa los
                    parámetros introducidos.
                  </p>
                </div>
              )}

              {alternatives.length > 0 ? (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Alternativas
                  </p>

                  <div className="rounded-xl border border-slate-200 bg-white px-3">
                    {alternatives
                      .filter(
                        (alternative) =>
                          alternative.withinLimit,
                      )
                      .slice(0, 4)
                      .map((alternative) => (
                        <CalculatorResultRow
                          key={
                            alternative.section
                          }
                          label={`${formatNumber(
                            alternative.section,
                            2,
                          )} mm²`}
                          value={formatNumber(
                            alternative.voltageDropPercent,
                            2,
                          )}
                          unit="%"
                        />
                      ))}
                  </div>
                </div>
              ) : null}
            </CalculatorResult>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-slate-200">
                  🔌
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  Calcula la sección necesaria
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Introduce las condiciones de la
                  línea y ElectroTools buscará la
                  primera sección que cumpla el límite
                  de caída indicado.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
        <p className="text-xs leading-5 text-slate-500">
          Resultado orientativo. La sección definitiva
          debe comprobarse también según la intensidad
          admisible, método de instalación, temperatura,
          agrupamiento, características de la carga y
          normativa aplicable.
        </p>
      </div>
    </CalculatorShell>
  );
}