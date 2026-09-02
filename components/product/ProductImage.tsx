interface ProductImageProps {
  image: string;
  name: string;
}

export default function ProductImage({
  image,
  name,
}: ProductImageProps) {
  return (
    <section className="h-full">
      <div className="flex min-h-[420px] h-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:min-h-[480px] lg:min-h-[520px]">

        {image ? (
          <img
            src={image}
            alt={name}
            className="max-h-[460px] max-w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-10 w-10 text-slate-300"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l2.409 2.409m-1.5 1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l5.159 5.159M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 8.25h.008v.008H8.25V8.25Z"
                />
              </svg>

            </div>

            <p className="mt-5 text-sm font-semibold text-slate-700">
              Imagen pendiente
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
              Estamos incorporando la imagen oficial de este producto al
              catálogo.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}