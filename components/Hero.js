"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/Photo";

export default function Hero() {
  const stage = useRef(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return undefined;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--px", x.toFixed(3));
      node.style.setProperty("--py", y.toFixed(3));
    };
    const onLeave = () => {
      node.style.setProperty("--px", "0");
      node.style.setProperty("--py", "0");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" aria-label="Introduction" ref={stage}>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-media">
        <div className="hero-tilt">
          <Photo
            src="/images/collection.jpg"
            alt="The noire scents collection: unlabelled glass perfume bottles arranged on a dark surface in hard studio light."
            position="center 70%"
            priority
            tone
            sizes="(max-width: 960px) 100vw, 60vw"
          />
        </div>
        <p className="hero-caption">Studio still · the four signatures</p>
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-enter" style={{ animationDelay: "80ms" }}>
          Maison de parfum
          <span aria-hidden="true"> · </span>
          Lagos
        </p>
        <h1 className="hero-title hero-enter" style={{ animationDelay: "180ms" }}>
          <span>A scent</span>
          <span>that stays.</span>
        </h1>
        <p className="hero-support hero-enter" style={{ animationDelay: "320ms" }}>
          Compositions crafted to become part of your signature.
        </p>
        <div className="hero-actions hero-enter" style={{ animationDelay: "460ms" }}>
          <a className="btn btn-fill" href="#fragrances">
            Discover the Collection
          </a>
          <a className="btn btn-ghost" href="#story">
            Explore Our World
          </a>
        </div>
      </div>
    </section>
  );
}
