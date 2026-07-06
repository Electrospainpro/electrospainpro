type PrimaryButtonProps = {
  children: React.ReactNode;
};

export default function PrimaryButton({
  children,
}: PrimaryButtonProps) {
  return (
    <button
      className="
      rounded-lg
      bg-blue-600
      px-6
      py-3
      font-medium
      text-white
      transition
      hover:bg-blue-700
      active:scale-95
      "
    >
      {children}
    </button>
  );
}