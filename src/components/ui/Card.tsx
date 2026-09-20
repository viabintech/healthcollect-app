import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`bg-white border border-border rounded-card p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
