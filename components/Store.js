"use client";

import { useMemo, useState } from "react";
import { formatPrice, products, purchaseLimit, stockFilters } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";

function StoreActions({ product }) {
  const { add, remove, lines } = useCart();
  const quantity = lines.find((line) => line.id === product.id)?.qty || 0;
  const limit = purchaseLimit(product);
  const unavailable = limit === 0;
  const atLimit = quantity >= limit;

  return (
    <div className="store-actions">
      {quantity > 0 ? <p className="store-qty">{quantity} in bag</p> : null}
      <button
        type="button"
        className="btn"
        disabled={unavailable || atLimit}
        aria-label={
          unavailable
            ? `${product.name} is out of stock`
            : atLimit
              ? `No more ${product.name} available`
              : `Add ${product.name} to bag`
        }
        onClick={() => add(product.id)}
      >
        {unavailable ? "Out of stock" : atLimit ? "In bag" : quantity > 0 ? "Add another" : "Add to bag"}
      </button>
      {quantity > 0 ? (
        <button
          type="button"
          className="text-btn"
          aria-label={`Remove ${product.name} from bag`}
          onClick={() => remove(product.id)}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
}

export default function Store() {
  const [filter, setFilter] = useState("all");
  const inCount = products.filter((product) => product.stock > 0).length;
  const outCount = products.length - inCount;
  const items = useMemo(() => {
    if (filter === "in") return products.filter((product) => product.stock > 0);
    if (filter === "out") return products.filter((product) => product.stock <= 0);
    return products;
  }, [filter]);

  return (
    <>
      <section className="store-hero" aria-labelledby="store-title">
        <p className="eyebrow eyebrow-light">The store</p>
        <h1 id="store-title">On the shelf.</h1>
        <p className="store-lead">
          Every composition the house is showing. What remains can go in the bag.
          What has sold out stays listed, and waits.
        </p>
      </section>

      <section className="store-shelf" aria-labelledby="store-shelf-title">
        <div className="band-head">
          <div>
            <p className="eyebrow">The shelf</p>
            <h2 id="store-shelf-title">Every composition.</h2>
            <p className="stock-summary">
              {inCount} in stock
              <span aria-hidden="true"> · </span>
              {outCount} sold out
            </p>
          </div>
          <p className="band-note">
            Add a bottle while it is here, or take it back out of the bag. Prices
            are for this demonstration.
          </p>
        </div>

        <div className="filters" role="toolbar" aria-label="Filter by availability">
          {stockFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className="filter"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="empty-note">Nothing on the shelf matches this view.</p>
        ) : (
          <ul className="store-grid">
            {items.map((product, index) => {
              const inStock = product.stock > 0;
              return (
                <li key={product.id}>
                  <Reveal delay={index * 60}>
                    <article className={`store-card${inStock ? "" : " is-out"}`}>
                      <div className="frame frame-portrait">
                        <span
                          className={`stock-badge${inStock ? "" : " is-out"}`}
                          aria-hidden="true"
                        >
                          {inStock ? "In stock" : "Out of stock"}
                        </span>
                        <Photo
                          src={product.image}
                          alt={product.alt}
                          position={product.position}
                          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      </div>
                      <div className="store-copy">
                        <p className="index">No. {product.number}</p>
                        <h3>{product.name}</h3>
                        <p className="family">
                          {product.family}
                          <span aria-hidden="true"> · </span>
                          {product.concentration}
                        </p>
                        <p className="desc">{product.description}</p>
                        <p className="stock-line">
                          {inStock
                            ? `${product.stock} available`
                            : "Out of stock"}
                        </p>
                        <div className="buy-row">
                          <p className="price">
                            {formatPrice(product.price)}
                            <span>{product.size}</span>
                          </p>
                          <StoreActions product={product} />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
