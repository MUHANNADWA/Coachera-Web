import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "custom";
  full?: boolean;
}

export function Button({
  children,
  isLoading = false,
  full = false,
  className = "",
  variant = "custom",
  ...props
}: ButtonProps) {
  const baseClasses = `cursor-pointer ${
    full && "w-full"
  } flex justify-center rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 shadow-sm my-4",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 shadow-sm my-4",
    danger: "bg-red-600 hover:bg-red-700 text-white py-2 px-4 shadow-sm my-4",
    custom: "hover:bg-gray-100",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading || props.disabled}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}
