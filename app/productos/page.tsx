import Container from "@/components/ui/Container";
import PageHeader from "@/components/common/PageHeader";
import CatalogPage from "@/components/catalog/CatalogPage";

import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <Container className="py-12">
      <PageHeader
        title="Catálogo de Productos"
        description="Encuentra productos profesionales analizados por ElectroSpainPro."
      />

      <CatalogPage
        products={products}
      />
    </Container>
  );
}