interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        {description}
      </p>
    </header>
  );
}