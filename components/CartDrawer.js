"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import Photo from "@/components/Photo";

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal } = useCart();
  const [preview, setPreview] = useState(false);
  const closeRef = useRef(null);
  const reviewing = preview && lines.length > 0;

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setPreview(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  function close() {
    setPreview(false);
    setOpen(false);
  }

  return (
    <div className={`cart-root${open ? " is-open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        className="scrim"
        tabIndex={-1}
        onClick={close}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        inert={!open}
      >
        <div className="drawer-head">
          <h2 id="bag-title">{reviewing ? "Order preview" : "Your bag"}</h2>
          <button
            ref={closeRef}
            type="button"
            className="text-btn"
            onClick={close}
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your bag is empty.</p>
            <p>The collection is waiting.</p>
            <Link className="btn" href="/#fragrances" onClick={close}>
              View fragrances
            </Link>
          </div>
        ) : reviewing ? (
          <div className="drawer-preview">
            <p className="preview-flag">
              Checkout preview. No payment is processed and no order is placed.
            </p>
            <ul className="preview-list">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                return (
                  <li key={line.id}>
                    <span>
                      {product.name}
                      <small> × {line.qty}</small>
                    </span>
                    <span>{formatPrice(product.price * line.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <p className="subtotal">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </p>
            <p className="preview-note">
              Delivery within Lagos is shown here only as a story. This
              demonstration does not collect card details.
            </p>
            <button type="button" className="btn" onClick={() => setPreview(false)}>
              Return to bag
            </button>
          </div>
        ) : (
          <>
            <ul className="bag-list">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                return (
                  <li key={line.id}>
                    <div className="frame frame-bag">
                      <Photo
                        src={product.image}
                        alt=""
                        position={product.position}
                        sizes="88px"
                      />
                    </div>
                    <div className="bag-info">
                      <p className="index">No. {product.number}</p>
                      <h3>{product.name}</h3>
                      <p className="price">{formatPrice(product.price)}</p>
                      <div className="qty">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                        >
                          −
                        </button>
                        <span aria-live="polite">{line.qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                          disabled={line.qty >= 8}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-btn"
                        onClick={() => remove(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <p className="subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </p>
              <p className="preview-note">Demonstration pricing. Taxes are not calculated.</p>
              <button type="button" className="btn btn-fill" onClick={() => setPreview(true)}>
                Checkout preview
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
