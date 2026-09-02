interface AdSlotProps {
  label?: string;
  className?: string;
}

export default function AdSlot({
  label = "Publicidad",
  className = "",
}: AdSlotProps) {
  return (
    <aside
      aria-label={label}
      className={`my-8 flex min-h-[100px] w-full items-center justify-center px-4 ${className}`}
    >
      <div className="w-full text-center">
        <div className="mx-auto mb-3 h-px w-full max-w-[720px] bg-slate-100" />

        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>

        <div className="mt-2 min-h-[50px] text-[10px] text-slate-300">
          Espacio publicitario
        </div>

        <div className="mx-auto mt-3 h-px w-full max-w-[720px] bg-slate-100" />
      </div>
    </aside>
  );
}