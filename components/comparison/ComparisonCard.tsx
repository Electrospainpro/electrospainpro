import Link from "next/link";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { Comparison } from "@/types/comparison";

interface ComparisonCardProps {
  comparison: Comparison;
}

export default function ComparisonCard({
  comparison,
}: ComparisonCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-blue-600">
        Comparativa
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {comparison.title}
      </h2>

      <p className="mt-4 text-gray-600">
        {comparison.summary}
      </p>

      <div className="mt-6">
        {comparison.winner && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            🏆 Ganador: {comparison.winner}
          </span>
        )}
      </div>

      <div className="mt-8">
        <Link href={`/comparativa/${comparison.slug}`}>
          <Button className="w-full">
            Ver comparativa
          </Button>
        </Link>
      </div>
    </Card>
  );
}