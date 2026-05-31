"use client";

import { useEffect, useState } from "react";

import { CART_EVENT, readCartCount, setCartCount } from "@/lib/cart";

export default function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(readCartCount());

    update();
    window.addEventListener("storage", update);
    window.addEventListener(CART_EVENT, update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(CART_EVENT, update);
    };
  }, []);

  return count;
}

export { setCartCount };
