"use client";

import Image from "next/image";
import Link from "next/link";

import useCartCount from "@/hooks/useCartCount";

export default function Header() {
  const cartCount = useCartCount();

  return (
    <header className="bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="IN Project"
            width={54}
            height={60}
            priority
          />
        </Link>
        <Link
          aria-label={`Cart (${cartCount} items)`}
          className="relative flex h-10 w-10 items-center justify-center self-end text-zinc-900"
          href="/cart"
        >
          <img src="/assets/icons/vector.png" alt="" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D86A5A] px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
