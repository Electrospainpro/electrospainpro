import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-900 hover:bg-black text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl px-6 py-3 font-semibold transition duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}