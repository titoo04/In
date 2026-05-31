import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export default function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={`rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 ${
        className ?? ""
      }`.trim()}
      {...props}
    />
  );
}
