"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Photo({
  src,
  alt,
  position = "center",
  priority = false,
  sizes = "(max-width: 800px) 100vw, 50vw",
  tone = false,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (failed) {
    return (
      <div className="photo-fallback" role="img" aria-label={alt}>
        <span>NOIRÉ</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`photo-img${loaded ? " is-loaded" : ""}${tone ? " is-warm" : ""}`}
      style={{ objectPosition: position }}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
