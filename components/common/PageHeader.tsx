interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        {description}
      </p>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </header>
  );
}