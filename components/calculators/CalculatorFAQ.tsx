interface CalculatorFAQItem {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  items: CalculatorFAQItem[];
}

export default function CalculatorFAQ({
  items,
}: CalculatorFAQProps) {
  return (
    <section className="mt-10">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Preguntas frecuentes
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Preguntas frecuentes sobre la caída de tensión
        </h2>
      </div>

      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.map((item) => (
          <details
            key={item.question}
            className="group px-5 py-5 sm:px-6"
          >
            <summary className="cursor-pointer list-none pr-8 text-sm font-bold text-slate-900 marker:hidden">
              <span className="relative block">
                {item.question}

                <span className="absolute right-0 top-0 text-lg font-normal text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}