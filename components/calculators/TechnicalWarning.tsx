interface TechnicalWarningProps {
  children?: React.ReactNode;
}

export default function TechnicalWarning({
  children,
}: TechnicalWarningProps) {
  return (
    <aside className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-base">
          ⚠️
        </div>

        <div>
          <h2 className="text-sm font-bold text-amber-950">
            Aviso técnico
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            {children ??
              "Resultado orientativo. La selección definitiva debe comprobarse según las condiciones reales de instalación y la normativa aplicable."}
          </p>
        </div>
      </div>
    </aside>
  );
}