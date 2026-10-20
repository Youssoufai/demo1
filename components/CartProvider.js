"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { getProduct, purchaseLimit } from "@/lib/catalog";

const CartContext = createContext(null);
const STORAGE_KEY = "noire-demo-cart";
const EMPTY = [];

const listeners = new Set();
let memoryRaw = null;
let cachedRaw = null;
let cachedLines = EMPTY;

function emit() {
  listeners.forEach((listener) => listener());
}

function sanitise(value) {
  if (!Array.isArray(value)) return EMPTY;
  const next = [];
  for (const line of value) {
    if (!line || typeof line.id !== "string" || !Number.isInteger(line.qty) || line.qty <= 0) {
      continue;
    }
    const product = getProduct(line.id);
    const limit = purchaseLimit(product);
    if (limit <= 0) continue;
    next.push({ id: line.id, qty: Math.min(line.qty, limit) });
  }
  return next.length ? next : EMPTY;
}

function getSnapshot() {
  if (memoryRaw !== null) {
    if (memoryRaw !== cachedRaw) {
      cachedRaw = memoryRaw;
      try {
        cachedLines = sanitise(JSON.parse(memoryRaw));
      } catch {
        cachedLines = EMPTY;
      }
    }
    return cachedLines;
  }

  let raw = "[]";
  try {
    raw = window.localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
    return cachedLines;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedLines = sanitise(JSON.parse(raw));
    } catch {
      cachedLines = EMPTY;
    }
  }
  return cachedLines;
}

function getServerSnapshot() {
  return EMPTY;
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(lines) {
  const raw = JSON.stringify(lines);
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
    memoryRaw = null;
  } catch {
    memoryRaw = raw;
  }
  cachedRaw = raw;
  cachedLines = lines.length ? lines : EMPTY;
  emit();
}

export function CartProvider({ children }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const value = useMemo(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => {
      const product = getProduct(line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);

    return {
      lines,
      open,
      setOpen,
      notice,
      count,
      subtotal,
      add(id, qty = 1) {
        const product = getProduct(id);
        const limit = purchaseLimit(product);
        if (!product || limit <= 0) return;
        const current = getSnapshot();
        const existing = current.find((line) => line.id === id);
        if (existing && existing.qty >= limit) return;
        const next = existing
          ? current.map((line) =>
              line.id === id ? { ...line, qty: Math.min(limit, line.qty + qty) } : line
            )
          : [...current, { id, qty: Math.min(limit, qty) }];
        write(next);
        setNotice(`${product.name} added to bag.`);
      },
      setQty(id, qty) {
        const product = getProduct(id);
        const limit = purchaseLimit(product);
        if (!product) return;
        const current = getSnapshot();
        if (qty <= 0 || limit <= 0) {
          write(current.filter((line) => line.id !== id));
          setNotice(`${product.name} removed from bag.`);
          return;
        }
        write(
          current.map((line) =>
            line.id === id ? { ...line, qty: Math.min(limit, qty) } : line
          )
        );
        setNotice(`${product.name} quantity updated.`);
      },
      remove(id) {
        const product = getProduct(id);
        write(getSnapshot().filter((line) => line.id !== id));
        if (product) setNotice(`${product.name} removed from bag.`);
      },
    };
  }, [lines, open, notice]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite">
        {notice}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
