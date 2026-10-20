"use client";

import { useEffect, useState } from "react";
import { getProduct, purchaseLimit } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";

export default function AddButton({ id, variant = "line" }) {
  const { add, lines, setOpen } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const product = getProduct(id);
  const limit = purchaseLimit(product);
  const quantity = lines.find((line) => line.id === id)?.qty || 0;
  const unavailable = limit === 0;

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  return (
    <div className={`add add-${variant}`}>
      <button
        type="button"
        className="btn"
        disabled={unavailable || quantity >= limit}
        onClick={() => {
          add(id);
          setJustAdded(true);
        }}
      >
        {unavailable ? "Out of stock" : justAdded ? "Added" : "Add to bag"}
      </button>
      {quantity > 0 ? (
        <button type="button" className="add-link" onClick={() => setOpen(true)}>
          {quantity} in bag
        </button>
      ) : null}
    </div>
  );
}
