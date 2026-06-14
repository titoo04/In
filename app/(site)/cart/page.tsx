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
    <section className="mx-auto flex w-full bg-white max-w-5xl flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Your cart
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
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
        <Card className="flex flex-col items-center gap-4 p-8 text-center md:p-10">
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
          {lineItems.map((item) =>
            (() => {
              const copyLabel = item.quantity === 1 ? "copy" : "copies";

              return (
                <Card
                  key={item.id}
                  className="flex gap-4 p-4 sm:flex-row sm:items-center md:p-5"
                >
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <Link
                        className="text-base font-semibold text-zinc-900 md:text-lg"
                        href={`/products/${item.id}`}
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-zinc-600">{item.price}</p>
                      <div className="flex flex-wrap items-center gap-4 md:gap-5">
                        <button
                          className="text-sm font-semibold underline tracking-[0.1em] transition-colors hover:text-zinc-900"
                          type="button"
                          onClick={() => removeCartItem(item.id)}
                        >
                          Remove
                        </button>
                        <p className="text-sm font-semibold text-[#D86A5A]">
                          {item.quantity} {copyLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* <div className="flex items-center gap-3 rounded-full border border-zinc-200 px-3 py-2">
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
                      </div> */}
                    </div>
                  </div>
                  <Link
                    className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 sm:ml-4 md:h-24 md:w-24"
                    href={`/products/${item.id}`}
                  >
                    {item.image ? (
                      <img
                        alt={item.name}
                        className="h-full w-full object-cover"
                        src={item.image}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        No image
                      </span>
                    )}
                  </Link>
                </Card>
              );
            })(),
          )}
          <div className="flex flex-col items-center gap-4">
            <Link
              className="pillar border-0 bg-[#D3E0FF] px-5 py-1 text-sm font-bold uppercase tracking-[0.1em] text-black"
              href="/checkout"
            >
              Checkout
            </Link>
            <Link
              className="text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900"
              href="/products"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
