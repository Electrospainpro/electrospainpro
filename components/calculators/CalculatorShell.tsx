interface CalculatorShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalculatorShell({
  children,
  className = "",
}: CalculatorShellProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}