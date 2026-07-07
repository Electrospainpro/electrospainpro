import Link from "next/link";

interface SecondaryButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function SecondaryButton({
  children,
  href,
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        items-center
        justify-center
        rounded-lg
        border
        border-gray-300
        px-6
        py-3
        font-medium
        text-gray-700
        transition
        hover:border-blue-600
        hover:text-blue-600
      "
    >
      {children}
    </Link>
  );
}