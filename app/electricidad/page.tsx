import PageHeader from "@/components/common/PageHeader";
import CategoryIntro from "@/components/category/CategoryIntro";
import SubcategoryGrid from "@/components/category/SubcategoryGrid";

import { electricidadSubcategories } from "@/data/electricidad";

export default function ElectricidadPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <PageHeader
        title="Electricidad"
        description="Comparativas, guías y productos recomendados para profesionales de la electricidad."
      />

      <CategoryIntro>
        <p>
          La categoría de Electricidad reúne una selección de
          comparativas, análisis y guías técnicas sobre el material
          eléctrico más utilizado por instaladores y profesionales.
        </p>

        <p>
          Nuestro objetivo es ayudarte a elegir los mejores productos
          según calidad, precio, normativa y experiencia de uso.
        </p>
      </CategoryIntro>

      <SubcategoryGrid
        title="Subcategorías"
        category="electricidad"
        items={electricidadSubcategories}
      />
    </main>
  );
}