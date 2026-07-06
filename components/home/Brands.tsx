import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

import { brands } from "@/data/brands";

export default function Brands() {
  return (
    <Section title="Marcas destacadas">
      <Container>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <Card key={brand.id} className="p-6 text-center">
              <h3 className="font-semibold">{brand.name}</h3>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}