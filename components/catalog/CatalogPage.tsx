"use client";

import { useMemo, useState } from "react";

import CatalogToolbar from "./CatalogToolbar";
import CatalogSidebar from "./CatalogSidebar";
import CatalogGrid from "./CatalogGrid";

import { Product } from "@/types/product";

interface CatalogPageProps {
  products: Product[];
}

export default function CatalogPage({
  products,
}: CatalogPageProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      );
    });
  }, [products, search]);

  return (
    <div className="grid gap-10 lg:grid-cols-4">
      <aside>
        <CatalogSidebar />
      </aside>

      <section className="lg:col-span-3">
        <CatalogToolbar
          search={search}
          onSearchChange={setSearch}
          totalProducts={filteredProducts.length}
        />

        <CatalogGrid
          products={filteredProducts}
        />
      </section>
    </div>
  );
}