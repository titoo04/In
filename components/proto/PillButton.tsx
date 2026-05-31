import type { ButtonHTMLAttributes } from "react";

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "light" | "dark";
};

export default function PillButton({
  className,
  tone = "light",
  ...props
}: PillButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-[11px] uppercase tracking-[0.25em]";
  const toneClasses =
    tone === "light"
      ? "border border-white/70 text-white"
      : "border border-black/70 text-black";

  return (
    <button
      className={`${base} ${toneClasses} ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
