"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import Brand from "./Brand";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled || open ? "header--solid" : ""}`}>
      <div className="header__bar">
        <a href="#top" className="header__brand" aria-label={`${site.brand.name}, back to top`}>
          <Brand />
        </a>
        <nav className="header__nav" aria-label="Main">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="header__actions">
          <a className="btn btn--crimson btn--sm" href="#book">BOOK NOW</a>
          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className={`burger ${open ? "burger--x" : ""}`} />
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>
        {site.nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a className="btn btn--crimson" href="#book" onClick={() => setOpen(false)}>BOOK NOW</a>
      </nav>
    </header>
  );
}
