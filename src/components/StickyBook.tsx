"use client";
import { useEffect, useState } from "react";

/** Mobile booking bar. Appears only after the hero has scrolled away, so it never covers the intro or hero CTAs. */
export default function StickyBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => {
      const book = document.getElementById("book");
      const inBook = book ? book.getBoundingClientRect().top < window.innerHeight * 0.5 && book.getBoundingClientRect().bottom > 0 : false;
      const film = document.getElementById("arrival");
      const fr = film?.getBoundingClientRect();
      const inFilm = fr ? fr.top < window.innerHeight * 0.5 && fr.bottom > window.innerHeight * 0.5 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !inBook && !inFilm);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  return (
    <div className={`sticky-book ${show ? "sticky-book--on" : ""}`} aria-hidden={!show}>
      <a className="btn btn--crimson btn--block" href="#book" tabIndex={show ? 0 : -1}>BOOK NOW</a>
    </div>
  );
}
