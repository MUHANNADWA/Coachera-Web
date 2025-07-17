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
  } flex justify-center rounded-2xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  const variantClasses = {
    primary:
      "bg-primary hover:bg-secondary font-semibold text-white py-3 px-6 my-4",
    gradiant: "gradiant font-semibold py-3 px-6 my-4",
    secondary:
      "hover:bg-primary-light text-primary py-3 px-6 my-4 font-semibold border border-primary",
    danger:
      "bg-danger hover:bg-red-700 font-semibold text-white py-3 px-6 my-4",
    primaryInverted:
      "bg-white hover:bg-primary-light font-semibold text-secondary py-3 px-6 my-4",
    secondaryInverted:
      "hover:bg-secondary text-white py-3 px-6 my-4 font-semibold border border-white",
    dangerInverted:
      "bg-danger hover:bg-red-700 font-semibold text-white py-3 px-6 my-4",
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
