import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

import { advantages } from "@/data/testimonials";

export default function Advantages() {
  return (
    <Section title="¿Por qué confiar en ElectroSpainPro?">
      <div className="grid gap-6 md:grid-cols-3">
        {advantages.map((item) => (
          <Card key={item.id} className="p-6">
            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}