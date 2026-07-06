"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;

    alert(`En el futuro buscaremos: ${query}`);
  }

  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-3xl gap-4 px-4">
        <input
          type="text"
          placeholder="Busca productos, marcas o comparativas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl border px-5 py-3"
        />

        <Button onClick={handleSearch}>
          Buscar
        </Button>
      </div>
    </section>
  );
}