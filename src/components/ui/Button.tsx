import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline: "bg-white border border-border text-ink",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-5 py-3 font-semibold ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
