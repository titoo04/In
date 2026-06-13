"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { shopItems } from "@/data/prototype";
import { stateProducts } from "@/data/state-products";
import {
  CART_EVENT,
  clearCartItems,
  readCartItems,
  type CartItem,
} from "@/lib/cart";

type CatalogItem = {
  id: string;
  name: string;
  price: string;
};

const governorates = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Qalyubia",
  "Port Said",
  "Suez",
  "Dakahlia",
  "Sharqia",
  "Gharbia",
  "Kafr El Sheikh",
  "Beheira",
  "Ismailia",
  "Monufia",
  "Damietta",
  "Aswan",
  "Asyut",
  "Beni Suef",
  "Fayoum",
  "Minya",
  "Qena",
  "Sohag",
  "Luxor",
  "Red Sea",
  "New Valley",
  "Matruh",
  "North Sinai",
  "South Sinai",
];

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
    };
  }

  return base;
})();

function parsePrice(value: string) {
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatEgp(value: number) {
  return `${value.toLocaleString("en-US")} EGP`;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [city, setCity] = useState("Cairo");

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

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const data = catalogById[item.id];
      if (!data) {
        return sum;
      }
      return sum + parsePrice(data.price) * item.quantity;
    }, 0);
  }, [items]);

  const shippingFee = 0;
  const codFee = paymentMethod === "cod" ? 30 : 0;
  const total = subtotal + shippingFee + codFee;

  if (orderPlaced) {
    return (
      <section className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-around bg-black px-6 py-10 text-center text-white md:px-10 md:py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D86A5A]">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l4 4 10-10" />
            </svg>
          </div>
          <p className="text-sm uppercase font-lightthin tracking-[0.1em]">
            Order placed <br /> successfully!
          </p>
        </div>

        <div className="flex flex-col  gap-4">
          <img src="/assets/images/youAreIn.png" alt="" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Back to
          </p>
          <Link
            className="pillar bg-[#D5E0FF] px-10 py-3 text-lg font-semibold text-black"
            href="/shop/noise"
          >
            <span className="font-script text-2xl">The shop</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-10 px-6 py-12 md:max-w-2xl md:px-10 lg:max-w-3xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">
            Deliver to
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
              Governorate
            </p>
            <div className="relative">
              <select
                className="w-full appearance-none bg-transparent text-lg text-zinc-900 md:text-xl"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              >
                {governorates.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
                ▼
              </span>
            </div>
            <div className="h-px w-full bg-black/80" />
            <p className="text-[11px] text-zinc-500">Delivery To {city}: 1-2</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
          Payment <br /> method
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            className={`pillar w-full max-w-[20rem] px-6 py-4 text-sm uppercase tracking-[0.12em] transition-colors md:max-w-[24rem] ${
              paymentMethod === "cod"
                ? "bg-[#D5E0FF] text-black"
                : "border border-black/70 text-black/80"
            }`.trim()}
            type="button"
            onClick={() => setPaymentMethod("cod")}
          >
            Cash on delivery
          </button>
          <button
            className={`pillar w-full max-w-[20rem] px-6 py-4 text-sm uppercase tracking-[0.12em] transition-colors md:max-w-[24rem] ${
              paymentMethod === "card"
                ? "bg-[#D5E0FF] text-black"
                : "border border-black/90 text-black/80"
            }`.trim()}
            type="button"
            onClick={() => setPaymentMethod("card")}
          >
            Visa / Mastercard
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-sm text-zinc-900">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{formatEgp(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping . {city}</span>
          <span className="font-semibold">
            {shippingFee === 0 ? "FREE" : formatEgp(shippingFee)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>COD fee</span>
          <span className="font-semibold">{formatEgp(codFee)}</span>
        </div>
        <div className="h-px w-full bg-black/80" />
        <div className="flex items-center justify-between text-base">
          <span className="uppercase tracking-[0.2em]">Total</span>
          <span className="font-semibold">{formatEgp(total)}</span>
        </div>
        <p className="text-[11px] text-zinc-500">
          Estimated delivery to {city}
          <br />
          1-2 days from order
        </p>
      </div>

      <button
        className="pillar mx-auto w-full max-w-[20rem] bg-[#D86A5A] py-3 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c45b4c] md:max-w-[24rem]"
        type="button"
        onClick={() => {
          clearCartItems();
          setOrderPlaced(true);
        }}
      >
        Place order
      </button>

      <Link
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700"
        href="/where-are-you-now"
      >
        <span className="text-lg leading-none">&lt;</span>
        Back
      </Link>
    </section>
  );
}
