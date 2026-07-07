interface ProductHeaderProps {
  name: string;
  brand: string;
  rating: number;
  shortDescription: string;
}

export default function ProductHeader({
  name,
  brand,
  rating,
  shortDescription,
}: ProductHeaderProps) {
  return (
    <section className="mb-10 rounded-xl border bg-white p-8 shadow-sm">
      <div className="mb-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {brand}
        </span>
      </div>

      <h1 className="text-4xl font-bold">
        {name}
      </h1>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-yellow-500">★★★★★</span>

        <span className="font-semibold">
          {rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
        {shortDescription}
      </p>
    </section>
  );
}