"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSearch() {
    const value = query.trim();

    if (!value) {
      router.push("/productos");
      return;
    }

    router.push(
      `/productos?q=${encodeURIComponent(value)}`
    );
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-3xl gap-4 px-4">
        <input
          type="text"
          placeholder="Busca productos, marcas o comparativas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-blue-600"
        />

        <Button onClick={handleSearch}>
          Buscar
        </Button>
      </div>
    </section>
  );
}