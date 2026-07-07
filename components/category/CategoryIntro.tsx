interface CategoryIntroProps {
  children: React.ReactNode;
}

export default function CategoryIntro({
  children,
}: CategoryIntroProps) {
  return (
    <section className="mb-12 rounded-xl border bg-gray-50 p-8">
      <h2 className="mb-4 text-2xl font-bold">
        Introducción
      </h2>

      <div className="space-y-4 text-gray-700 leading-7">
        {children}
      </div>
    </section>
  );
}