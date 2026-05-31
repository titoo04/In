"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Card from "@/components/ui/Card";
import { addCartItem } from "@/lib/cart";
import type { StateProduct } from "@/data/state-products";

type StateProductCardProps = {
  product: StateProduct;
};

export default function StateProductCard({ product }: StateProductCardProps) {
  const [pendingQuantity, setPendingQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const commitTimerRef = useRef<number | null>(null);
  const productHref = `/products/${product.id}`;

  useEffect(() => {
    return () => {
      if (commitTimerRef.current) {
        window.clearTimeout(commitTimerRef.current);
      }
    };
  }, []);

  const commitQuantity = (nextQuantity: number) => {
    if (nextQuantity > 0) {
      addCartItem(product.id, nextQuantity);
    }
    setPendingQuantity(0);
    setIsEditing(false);
  };

  const scheduleCommit = (nextQuantity: number) => {
    if (commitTimerRef.current) {
      window.clearTimeout(commitTimerRef.current);
    }

    commitTimerRef.current = window.setTimeout(() => {
      commitQuantity(nextQuantity);
    }, 4000);
  };

  const handleAdd = () => {
    setPendingQuantity(1);
    setIsEditing(true);
    scheduleCommit(1);
  };

  const handleIncrement = () => {
    setPendingQuantity((value) => {
      const next = value + 1;
      scheduleCommit(next);
      return next;
    });
  };

  const handleDecrement = () => {
    setPendingQuantity((value) => {
      const next = Math.max(0, value - 1);
      if (next === 0) {
        commitQuantity(0);
        return 0;
      }
      scheduleCommit(next);
      return next;
    });
  };

  return (
    <Card className="flex h-full flex-col gap-4 border-4 border-[#D3E0FF] items-center">
      <Link className="flex flex-col gap-1 items-center" href={productHref}>
        <div className="aspect-[3.1/3] overflow-hidden rounded-2xl">
          <img
            alt={product.name}
            className="h-full w-full object-cover"
            src={product.image}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm   text-zinc-900">
            {product.price}
          </p>
          <p className="text-xs  font-extrabold  ">
            {product.name}
          </p>
        </div>
      </Link>
      <div className="mt-auto">
        {!isEditing ? (
          <button
            className=" pillar border-4 border-[#D3E0FF] px-2 py-1 text-xs font-bold   transition-colors hover:bg-zinc-100"
            type="button"
            onClick={handleAdd}
          >
            Add To Cart
          </button>
        ) : (
          <div className="flex w-full items-center justify-between overflow-hidden rounded-full border-2 border-[#D3E0FF]">
            <button
              aria-label={`Decrease ${product.name}`}
              className="bg-[#D3E0FF] px-3 py-2 text-sm font-semibold text-zinc-900"
              type="button"
              onClick={handleDecrement}
            >
              -
            </button>
            <button
              className="border-x border-[#D3E0FF] px-4 text-xs font-semibold text-zinc-900"
              type="button"
              onClick={() => commitQuantity(pendingQuantity)}
            >
              {pendingQuantity}
            </button>
            <button
              aria-label={`Increase ${product.name}`}
              className="bg-[#D3E0FF] px-3 py-2 text-sm font-semibold text-zinc-900"
              type="button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
