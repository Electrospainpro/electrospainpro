import Link from "next/link";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { Guide } from "@/types/guide";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({
  guide,
}: GuideCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-blue-600">
        Guía Técnica
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {guide.title}
      </h2>

      <p className="mt-4 text-gray-600">
        {guide.summary}
      </p>

      <div className="mt-8">
        <Link href={`/guias/${guide.slug}`}>
          <Button className="w-full">
            Leer guía
          </Button>
        </Link>
      </div>
    </Card>
  );
}