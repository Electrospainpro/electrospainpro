interface GuideContentProps {
  content: string;
}

export default function GuideContent({
  content,
}: GuideContentProps) {
  return (
    <section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Contenido
      </h2>

      <p className="leading-8 text-gray-700">
        {content}
      </p>
    </section>
  );
}