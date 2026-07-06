import Container from "./Container";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <Container>
        {title && (
          <h2 className="mb-8 text-3xl font-bold">
            {title}
          </h2>
        )}

        {children}
      </Container>
    </section>
  );
}