interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CatalogSearch({
  value,
  onChange,
  placeholder = "Buscar productos...",
}: CatalogSearchProps) {
  return (
    <div className="mb-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-600"
      />
    </div>
  );
}