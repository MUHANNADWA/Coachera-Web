import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "primaryInverted"
    | "secondaryInverted"
    | "dangerInverted"
    | "custom";
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
  } flex justify-center rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  const variantClasses = {
    primary:
      "bg-primary hover:bg-secondary font-semibold text-white py-2 px-4 my-4",
    gradiant:
      "bg-gradient-to-tr from-[#0f766e] via-[#0e9488] to-[#22d3ee] font-semibold text-white py-2 px-4 my-4",
    secondary:
      "hover:bg-primary-light text-primary py-2 px-4 my-4 font-semibold border border-primary",
    danger:
      "bg-red-600 hover:bg-red-700 font-semibold text-white py-2 px-4 my-4",
    primaryInverted:
      "bg-white hover:bg-primary-light font-semibold text-secondary py-2 px-4 my-4",
    secondaryInverted:
      "hover:bg-secondary text-white py-2 px-4 my-4 font-semibold border border-white",
    dangerInverted:
      "bg-red-600 hover:bg-red-700 font-semibold text-white py-2 px-4 my-4",
    custom: "hover:bg-primary-light",
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
