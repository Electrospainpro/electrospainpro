import Container from "@/components/ui/Container";
import PageHeader from "@/components/common/PageHeader";
import CatalogPage from "@/components/catalog/CatalogPage";

import { products } from "@/data/products";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  return (
    <Container className="py-12">
      <PageHeader
        title="Catálogo de Productos"
        description="Encuentra productos profesionales analizados por ElectroSpainPro."
      />

      <CatalogPage
        products={products}
        initialSearch={params.q ?? ""}
      />
    </Container>
  );
}