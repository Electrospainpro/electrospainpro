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
  calculateSinglePhasePower,
  type SinglePhasePowerResult,
} from "@/lib/calculators/single-phase-power";

type CalculateMode =
  | "power"
  | "current";

function formatNumber(
  value: number,
  maximumFractionDigits = 4,
): string {
  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits,
  }).format(value);
}

export default function SinglePhasePowerCalculator() {
  const [mode, setMode] =
    useState<CalculateMode>("power");

  const [voltage, setVoltage] =
    useState("230");

  const [current, setCurrent] =
    useState("10");

  const [power, setPower] =
    useState("2300");

  const [powerFactor, setPowerFactor] =
    useState("1");

  const [result, setResult] =
    useState<SinglePhasePowerResult | null>(
      null,
    );

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
      const voltageValue = Number(
        voltage.replace(",", "."),
      );

      const powerFactorValue = Number(
        powerFactor.replace(",", "."),
      );

      if (mode === "power") {
        const currentValue = Number(
          current.replace(",", "."),
        );

        const calculated =
          calculateSinglePhasePower({
            voltage: voltageValue,
            current: currentValue,
            powerFactor: powerFactorValue,
          });

        setResult(calculated);
        return;
      }

      const powerValue = Number(
        power.replace(",", "."),
      );

      const calculated =
        calculateSinglePhasePower({
          voltage: voltageValue,
          power: powerValue,
          powerFactor: powerFactorValue,
        });

      setResult(calculated);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "No se ha podido realizar el cálculo.",
      );
    }
  }

  return (
    <CalculatorShell>
      <CalculatorHeader
        title="Calculadora de potencia monofásica"
        description="Calcula potencia o intensidad en un sistema monofásico considerando la tensión y el factor de potencia."
      />

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <CalculatorSelect
            id="single-phase-mode"
            label="¿Qué quieres calcular?"
            value={mode}
            onChange={handleModeChange}
            options={[
              {
                value: "power",
                label: "Potencia (W)",
              },
              {
                value: "current",
                label: "Intensidad (A)",
              },
            ]}
          />

          <CalculatorInput
            id="single-phase-voltage"
            label="Tensión"
            unit="V"
            type="number"
            value={voltage}
            onChange={setVoltage}
            min={0}
            step="any"
            placeholder="Ej. 230"
            helpText="Tensión del sistema monofásico."
          />

          {mode === "power" ? (
            <CalculatorInput
              id="single-phase-current"
              label="Intensidad"
              unit="A"
              type="number"
              value={current}
              onChange={setCurrent}
              min={0}
              step="any"
              placeholder="Ej. 10"
              helpText="Intensidad que circula por el circuito."
            />
          ) : (
            <CalculatorInput
              id="single-phase-power"
              label="Potencia activa"
              unit="W"
              type="number"
              value={power}
              onChange={setPower}
              min={0}
              step="any"
              placeholder="Ej. 2300"
              helpText="Potencia activa que quieres utilizar para calcular la intensidad."
            />
          )}

          <CalculatorInput
            id="single-phase-power-factor"
            label="Factor de potencia"
            unit="cos φ"
            type="number"
            value={powerFactor}
            onChange={setPowerFactor}
            min={0}
            max={1}
            step="0.01"
            placeholder="Ej. 0,8"
            helpText="Valor entre 0 y 1. Si no se conoce, puede utilizarse 1 como referencia."
          />

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
              />

              <CalculatorResultRow
                label="Intensidad"
                value={formatNumber(
                  result.current,
                )}
                unit="A"
                highlight
              />

              <CalculatorResultRow
                label="Potencia activa"
                value={formatNumber(
                  result.power,
                )}
                unit="W"
                highlight={
                  mode === "power"
                }
              />

              <CalculatorResultRow
                label="Potencia aparente"
                value={formatNumber(
                  result.apparentPower,
                )}
                unit="VA"
              />

              <CalculatorResultRow
                label="Factor de potencia"
                value={formatNumber(
                  result.powerFactor,
                )}
                unit="cos φ"
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
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Introduce los datos
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  El resultado de potencia e intensidad
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