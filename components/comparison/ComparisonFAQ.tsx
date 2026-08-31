import type { ComparisonFAQ as ComparisonFAQItem } from "@/types/comparison";

interface ComparisonFAQProps {
  faq?: ComparisonFAQItem[];
}

export default function ComparisonFAQ({
  faq = [],
}: ComparisonFAQProps) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Preguntas frecuentes
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Preguntas frecuentes
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Resolvemos las dudas más habituales sobre los productos
          analizados en esta comparativa.
        </p>
      </div>

      <div className="space-y-4">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border bg-white p-6 shadow-sm"
          >
            <summary className="cursor-pointer list-none pr-8 text-lg font-semibold">
              <span className="flex items-center justify-between gap-4">
                <span>{item.question}</span>

                <span className="text-2xl text-gray-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>

            <div className="mt-4 border-t pt-4 text-gray-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}