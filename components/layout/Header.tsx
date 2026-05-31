"use client";

import Image from "next/image";
import Link from "next/link";

import useCartCount from "@/hooks/useCartCount";

export default function Header() {
  const cartCount = useCartCount();

  return (
    <header className="bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="IN Project"
            width={64}
            height={48}
            priority
          />
        </Link>
        <Link
          aria-label={`Cart (${cartCount} items)`}
          className="relative flex h-10 w-10 items-center justify-center0 text-zinc-900"
          href="/cart"
        >
          <img src="/assets/icons/vector.png" alt="" />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-black" />
          )}
        </Link>
      </div>
    </header>
  );
}
