interface AffiliateLink {
  store: string;
  url: string;
}

interface ProductAffiliateButtonsProps {
  affiliateLinks: AffiliateLink[];
}

function getStoreInitial(store: string) {
  return store.charAt(0).toUpperCase();
}

export default function ProductAffiliateButtons({
  affiliateLinks,
}: ProductAffiliateButtonsProps) {
  return (
    <section className="min-w-0 h-full min-h-[260px] rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.045)]">
      {/* CABECERA */}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <svg
            className="h-[19px] w-[19px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
        </div>

        <div className="min-w-0">
          <h2 className="text-[18px] font-bold tracking-tight text-slate-950">
            Dónde comprar
          </h2>

          <p className="mt-1 text-[12px] leading-5 text-slate-500">
            Compara tiendas y encuentra dónde comprar este producto.
          </p>
        </div>
      </div>

      {/* OFERTAS */}

      {affiliateLinks.length > 0 ? (
        <div className="mt-5 space-y-2.5">
          {affiliateLinks.slice(0, 4).map((link, index) => (
            <a
              key={`${link.store}-${index}`}
              href={link.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-all hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                  {getStoreInitial(link.store)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-slate-800">
                    {link.store}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Tienda online
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-[11px] font-bold text-blue-600 transition group-hover:translate-x-0.5">
                Ver oferta →
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
          <p className="text-[12px] font-semibold text-slate-700">
            Estamos recopilando ofertas
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Todavía no tenemos tiendas vinculadas para este producto.
          </p>
        </div>
      )}

      {/* NOTA DE AFILIACIÓN */}

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[10px] leading-4 text-slate-400">
          Algunos enlaces pueden ser de afiliado. Si realizas una compra,
          ElectroSpainPro puede recibir una comisión sin coste adicional.
        </p>
      </div>
    </section>
  );
}