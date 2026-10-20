"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { bottles, filters, formatPrice } from "@/lib/catalog";
import Photo from "@/components/Photo";
import AddButton from "@/components/AddButton";
import Reveal from "@/components/Reveal";

export default function Fragrances() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(
    () =>
      bottles().filter((product) => filter === "all" || product.family === filter),
    [filter]
  );
  const [lead, ...rest] = items;

  return (
    <section className="band band-ivory" id="fragrances" aria-labelledby="fragrances-title">
      <div className="band-head">
        <div>
          <p className="eyebrow">The collection</p>
          <h2 id="fragrances-title">Four signatures.</h2>
        </div>
        <p className="band-note">
          Extrait de parfum, 50 ml. Prices are for this demonstration.{" "}
          <Link href="/store">Open the store</Link> to see what is in stock.
        </p>
      </div>

      <div className="filters" role="toolbar" aria-label="Filter fragrances">
        {filters.map((item) => (
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
        <p className="empty-note">Nothing in this family is on the table today.</p>
      ) : (
        <div className={`fragrance-layout${rest.length === 0 ? " is-single" : ""}`}>
          {lead ? (
            <Reveal className="feature-card">
              <article>
                <div className="frame frame-portrait">
                  <Photo
                    src={lead.image}
                    alt={lead.alt}
                    position={lead.position}
                    sizes="(max-width: 1100px) 100vw, 52vw"
                  />
                </div>
                <div className="feature-copy">
                  <p className="index">No. {lead.number}</p>
                  <h3>{lead.name}</h3>
                  <p className="family">{lead.family}</p>
                  <p className="desc">{lead.description}</p>
                  <div className="buy-row">
                    <p className="price">
                      {formatPrice(lead.price)}
                      <span>{lead.size}</span>
                    </p>
                    <AddButton id={lead.id} />
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="side-list">
              {rest.map((product, index) => (
                <Reveal key={product.id} delay={index * 70}>
                  <article className="side-card">
                    <div className="frame frame-square">
                      <Photo
                        src={product.image}
                        alt={product.alt}
                        position={product.position}
                        sizes="(max-width: 700px) 100vw, 180px"
                      />
                    </div>
                    <div>
                      <p className="index">No. {product.number}</p>
                      <h3>{product.name}</h3>
                      <p className="family">{product.family}</p>
                      <p className="desc">{product.description}</p>
                      <div className="buy-row">
                        <p className="price">
                          {formatPrice(product.price)}
                          <span>{product.size}</span>
                        </p>
                        <AddButton id={product.id} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
