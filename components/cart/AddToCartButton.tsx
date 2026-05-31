"use client";

import type { ButtonHTMLAttributes } from "react";

import { addCartItem } from "@/lib/cart";

type AddToCartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  incrementBy?: number;
  productId: string;
};

export default function AddToCartButton({
  className,
  incrementBy = 1,
  productId,
  children = "Add to cart",
  ...props
}: AddToCartButtonProps) {
  const handleClick = () => {
    addCartItem(productId, incrementBy);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
