import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl  bg-white p-2 ${
        className ?? ""
      }`.trim()}
      {...props}
    />
  );
}
