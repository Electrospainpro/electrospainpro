interface ProductImageProps {
  image: string;
  name: string;
}

export default function ProductImage({
  image,
  name,
}: ProductImageProps) {
  return (
    <section className="mb-10">
      <div className="flex justify-center rounded-xl border bg-white p-10 shadow-sm">
        {image ? (
          <img
            src={image}
            alt={name}
            className="max-h-96 object-contain"
          />
        ) : (
          <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">
            Imagen pendiente
          </div>
        )}
      </div>
    </section>
  );
}