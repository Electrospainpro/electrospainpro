interface AffiliateLink {
  store: string;
  url: string;
}

interface ProductAffiliateButtonsProps {
  affiliateLinks: AffiliateLink[];
}

export default function ProductAffiliateButtons({
  affiliateLinks,
}: ProductAffiliateButtonsProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-bold">
        Dónde comprar
      </h2>

      <div className="flex flex-wrap gap-4">
        {affiliateLinks.map((link) => (
          <a
            key={link.store}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Ver en {link.store}
          </a>
        ))}
      </div>
    </section>
  );
}