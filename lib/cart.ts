export const CART_COUNT_KEY = "cartCount";
export const CART_ITEMS_KEY = "cartItems";
export const CART_EVENT = "cart-updated";

export type CartItem = {
  id: string;
  quantity: number;
};

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as { id?: unknown; quantity?: unknown };
      const id = typeof record.id === "string" ? record.id : "";
      const quantity = Number(record.quantity ?? 0);

      if (!id || !Number.isFinite(quantity)) {
        return null;
      }

      const safeQuantity = Math.max(0, Math.floor(quantity));
      if (safeQuantity === 0) {
        return null;
      }

      return { id, quantity: safeQuantity } satisfies CartItem;
    })
    .filter((item): item is CartItem => Boolean(item));
}

export function readCartCount(): number {
  if (!isBrowser()) {
    return 0;
  }

  const raw = window.localStorage.getItem(CART_COUNT_KEY);
  const value = Number(raw ?? 0);
  return Number.isFinite(value) ? value : 0;
}

export function setCartCount(nextCount: number) {
  if (!isBrowser()) {
    return;
  }

  const safeCount = Math.max(0, Math.floor(nextCount));
  window.localStorage.setItem(CART_COUNT_KEY, String(safeCount));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function readCartItems(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(CART_ITEMS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return normalizeCartItems(parsed);
  } catch {
    return [];
  }
}

export function getCartItemQuantity(id: string): number {
  if (!id) {
    return 0;
  }

  const items = readCartItems();
  return items.find((item) => item.id === id)?.quantity ?? 0;
}

export function writeCartItems(items: CartItem[]) {
  if (!isBrowser()) {
    return;
  }

  const normalized = normalizeCartItems(items);
  window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(normalized));
  setCartCount(normalized.reduce((sum, item) => sum + item.quantity, 0));
}

export function addCartItem(id: string, delta = 1) {
  if (!id || !Number.isFinite(delta) || delta === 0) {
    return;
  }

  const items = readCartItems();
  const index = items.findIndex((item) => item.id === id);
  const current = index >= 0 ? items[index].quantity : 0;
  const nextQuantity = Math.max(0, current + Math.floor(delta));

  if (nextQuantity === 0) {
    if (index >= 0) {
      items.splice(index, 1);
    }
    writeCartItems(items);
    return;
  }

  if (index >= 0) {
    items[index] = { id, quantity: nextQuantity };
  } else {
    items.push({ id, quantity: nextQuantity });
  }

  writeCartItems(items);
}

export function setCartItemQuantity(id: string, quantity: number) {
  if (!id || !Number.isFinite(quantity)) {
    return;
  }

  const safeQuantity = Math.max(0, Math.floor(quantity));
  const items = readCartItems();
  const index = items.findIndex((item) => item.id === id);

  if (safeQuantity === 0) {
    if (index >= 0) {
      items.splice(index, 1);
      writeCartItems(items);
    }
    return;
  }

  if (index >= 0) {
    items[index] = { id, quantity: safeQuantity };
  } else {
    items.push({ id, quantity: safeQuantity });
  }

  writeCartItems(items);
}

export function removeCartItem(id: string) {
  if (!id) {
    return;
  }

  const items = readCartItems().filter((item) => item.id !== id);
  writeCartItems(items);
}

export function clearCartItems() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
  setCartCount(0);
}
