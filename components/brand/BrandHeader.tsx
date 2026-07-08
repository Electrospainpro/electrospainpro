interface BrandHeaderProps {
  name: string;
  country: string;
  specialty: string;
  description: string;
}

export default function BrandHeader({
  name,
  country,
  specialty,
  description,
}: BrandHeaderProps) {
  return (
    <header className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold">
        {name}
      </h1>

      <div className="mt-4 flex flex-wrap gap-6 text-gray-600">
        <span>
          <strong>País:</strong> {country}
        </span>

        <span>
          <strong>Especialidad:</strong> {specialty}
        </span>
      </div>

      <p className="mt-6 max-w-4xl text-lg text-gray-700">
        {description}
      </p>
    </header>
  );
}