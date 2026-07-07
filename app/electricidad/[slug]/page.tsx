import PageHeader from "@/components/common/PageHeader";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SubcategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title={slug.replace(/-/g, " ")}
        description="Página en construcción."
      />

      <p className="mt-8 text-lg text-gray-700">
        Próximamente encontrarás comparativas, productos,
        guías y análisis específicos para esta subcategoría.
      </p>
    </main>
  );
}