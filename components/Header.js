"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/#fragrances", label: "Fragrances" },
  { href: "/#collections", label: "Collections" },
  { href: "/#story", label: "Our Story" },
  { href: "/#journal", label: "Journal" },
];

export default function Header() {
  const { count, open, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menu || open);
    return () => document.body.classList.remove("is-locked");
  }, [menu, open]);

  useEffect(() => {
    if (!menu) return undefined;
    firstLinkRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="header-bar">
        <div className="header-side">
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((value) => !value)}
          >
            <span className="sr-only">{menu ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {menu ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 8h18M3 16h12" />
              )}
            </svg>
          </button>
          <nav className="desk-nav" aria-label="Primary">
            {links.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="wordmark" aria-label="NOIRÉ home">
          NOIRÉ
        </Link>

        <div className="header-side header-side-right">
          <nav className="desk-nav" aria-label="Secondary">
            {links.slice(2).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="icon-btn bag-btn"
            onClick={() => {
              setMenu(false);
              setOpen(true);
            }}
            aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 8.5h11l-.8 11h-9.4l-.8-11z" />
              <path d="M9 8.5V7.2a3 3 0 0 1 6 0v1.3" />
            </svg>
            {count > 0 ? <span className="bag-count">{count}</span> : null}
          </button>
        </div>
      </div>

      {menu ? (
        <div
          id="site-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav aria-label="Mobile">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={() => setMenu(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setMenu(false);
              setOpen(true);
            }}
          >
            Bag{count > 0 ? ` · ${count}` : ""}
          </button>
        </div>
      ) : null}
    </header>
  );
}
