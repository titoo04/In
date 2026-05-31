import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-black text-white hover:bg-zinc-800",
  ghost: "border border-zinc-300 text-zinc-900 hover:bg-zinc-100",
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
