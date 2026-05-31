"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import { shopItems } from "@/data/prototype";
import { stateProducts } from "@/data/state-products";
import {
  CART_EVENT,
  addCartItem,
  clearCartItems,
  readCartItems,
  removeCartItem,
  type CartItem,
} from "@/lib/cart";

type CatalogItem = {
  id: string;
  name: string;
  price: string;
  image?: string;
};

const catalogById = (() => {
  const base: Record<string, CatalogItem> = {};

  for (const item of shopItems) {
    base[item.id] = { id: item.id, name: item.name, price: item.price };
  }

  for (const product of stateProducts) {
    base[product.id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  }

  return base;
})();

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const update = () => setItems(readCartItems());

    update();
    window.addEventListener("storage", update);
    window.addEventListener(CART_EVENT, update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(CART_EVENT, update);
    };
  }, []);

  const lineItems = useMemo(() => {
    return items.map((item) => {
      const data = catalogById[item.id];
      return {
        ...item,
        name: data?.name ?? "Unknown item",
        price: data?.price ?? "",
        image: data?.image,
      };
    });
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Your cart
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Cart ({totalCount})
          </h1>
          {items.length > 0 && (
            <button
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:text-zinc-900"
              type="button"
              onClick={clearCartItems}
            >
              Clear cart
            </button>
          )}
        </div>
      </header>

      {items.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <p className="text-lg font-semibold text-zinc-900">
            Your cart is empty.
          </p>
          <p className="text-sm text-zinc-600">
            Add something from the shop or product list to get started.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              href="/shop/noise"
            >
              Visit shop
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
              href="/products"
            >
              Browse products
            </Link>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {lineItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col gap-4 border border-zinc-100 p-4 sm:flex-row sm:items-center"
            >
              <Link
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-zinc-100"
                href={`/products/${item.id}`}
              >
                {item.image ? (
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    No image
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link
                  className="text-lg font-semibold text-zinc-900"
                  href={`/products/${item.id}`}
                >
                  {item.name}
                </Link>
                <p className="text-sm text-zinc-600">{item.price}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <div className="flex items-center gap-3 rounded-full border border-zinc-200 px-3 py-2">
                  <button
                    aria-label={`Decrease ${item.name}`}
                    className="text-sm font-semibold text-zinc-900"
                    type="button"
                    onClick={() => addCartItem(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center text-sm font-semibold text-zinc-900">
                    {item.quantity}
                  </span>
                  <button
                    aria-label={`Increase ${item.name}`}
                    className="text-sm font-semibold text-zinc-900"
                    type="button"
                    onClick={() => addCartItem(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-900"
                  type="button"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              className="text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900"
              href="/products"
            >
              Continue shopping
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              href="/checkout"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
