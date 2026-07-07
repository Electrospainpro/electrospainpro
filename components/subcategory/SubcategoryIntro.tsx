interface SubcategoryIntroProps {
  title: string;
  description: string;
}

export default function SubcategoryIntro({
  title,
  description,
}: SubcategoryIntroProps) {
  return (
    <section className="mb-12 rounded-xl border bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-3xl font-bold">
        {title}
      </h2>

      <p className="text-lg leading-8 text-gray-700">
        {description}
      </p>
    </section>
  );
}