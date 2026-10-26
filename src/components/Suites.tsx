"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { site, type Suite } from "@/content/site";
import { buildSuiteEnquiry, whatsappUrl } from "@/lib/whatsapp";
import "./SuitesExperience.css";

type OpenRoom = { index: number; rect: DOMRect } | null;

const GLOW: Record<Suite["id"], [string, string]> = {
  ferrari: ["#ff1f2d", "#ffd166"],
  lamborghini: ["#f5c400", "#fff1a8"],
  porsche: ["#e31b23", "#d7d9dc"],
  jaguar: ["#8b6a3d", "#c6a56b"],
};

function priceLabel(s: Suite) {
  if (!s.price) return "Rate on request";
  return `${s.price.currency} ${s.price.amount.toLocaleString("en-NG")} / NIGHT`;
}

function enquiry(s: Suite) {
  return whatsappUrl(site.contact.whatsappNumber, buildSuiteEnquiry(site.brand.name, s.name));
}

export default function Suites() {
  const [open, setOpen] = useState<OpenRoom>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const openRoom = (index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;
    setExpanded(false);
    setActiveImage(0);
    setOpen({ index, rect: el.getBoundingClientRect() });
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
  };

  const close = useCallback(() => {
    setExpanded(false);
    window.setTimeout(() => setOpen(null), 700);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setExpanded(true);
    setActiveImage(0);
    setOpen((o) => o ? { ...o, index: (o.index + dir + site.suites.length) % site.suites.length } : o);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const onMove = (e: PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    stage.style.setProperty("--px", String(x));
    stage.style.setProperty("--py", String(y));
  };

  const current = open ? site.suites[open.index] : null;
  const glow = current ? GLOW[current.id] : ["#fff", "#fff"];
  const currentImage = current?.images[activeImage] ?? current?.images[0];

  let startClip = "inset(0)";
  if (open && typeof window !== "undefined") {
    startClip = `inset(${open.rect.top}px ${window.innerWidth - open.rect.right}px ${window.innerHeight - open.rect.bottom}px ${open.rect.left}px round 18px)`;
  }

  return (
    <section id="suites" className="section world-suites" aria-labelledby="suites-title">
      <div className="wrap world-suites__intro">
        <p className="eyebrow">THE SUITE COLLECTION</p>
        <h2 id="suites-title" className="display display--xl">CHOOSE YOUR WORLD<b>.</b></h2>
        <p className="lede lede--narrow">Four automotive-inspired suites. Hover to feel the colour. Click to step inside.</p>
      </div>

      <div className="world-suites__grid wrap">
        {site.suites.map((suite, i) => {
          const [glow1, glow2] = GLOW[suite.id];
          const image = suite.images[0];
          return (
            <button
              key={suite.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              type="button"
              className={`world-card world-card--${suite.id}`}
              style={{ "--glow": glow1, "--glow2": glow2 } as CSSProperties}
              onClick={() => openRoom(i)}
              aria-label={`Enter the ${suite.name} suite, ${priceLabel(suite)}`}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              ) : null}
              <span className="world-card__wash" />
              <span className="world-card__vignette" />
              <span className="world-card__scan" />
              <span className="world-card__copy">
                <span className="world-card__number">0{i + 1}</span>
                <strong>{suite.name}</strong>
                <em>{priceLabel(suite)}</em>
                {image?.kind === "concept" && <small>DESIGN CONCEPT</small>}
              </span>
              <span className="world-card__enter">ENTER →</span>
              <span className="world-card__price" aria-hidden>{suite.price ? `₦${suite.price.amount.toLocaleString("en-NG")}` : "ON REQUEST"}</span>
            </button>
          );
        })}
      </div>

      {open && current && currentImage && (
        <div
          className={`room-world ${expanded ? "is-open" : ""}`}
          style={{
            "--glow": glow[0],
            "--glow2": glow[1],
            clipPath: expanded ? "inset(0px 0px 0px 0px round 0px)" : startClip,
          } as CSSProperties}
          onPointerMove={onMove}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} suite`}
        >
          <div className="room-world__stage" ref={stageRef} key={`${current.id}-${activeImage}`}>
            <img
              className="room-world__cinematic"
              src={site.images.cinematicSuiteTransition.src}
              alt=""
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="room-world__img" src={currentImage.src} alt={currentImage.alt} />
            <div className="room-world__glow" />
            <div className="room-world__vignette" />
            <div className="room-world__particles" aria-hidden>
              {Array.from({ length: 18 }).map((_, k) => <i key={k} style={{ "--k": k } as CSSProperties} />)}
            </div>
          </div>

          <div className="room-world__ui">
            <div className="room-world__topline">
              <p className="room-world__eyebrow">ROOM {String(open.index + 1).padStart(2, "0")} / {String(site.suites.length).padStart(2, "0")}</p>
              <span className="room-world__price">{priceLabel(current)}</span>
            </div>
            <h3>{current.name}</h3>
            <p>{current.description}</p>
            {currentImage.caption && <span className="room-world__caption">{currentImage.caption}</span>}
            {currentImage.kind === "concept" && <span className="room-world__concept">DESIGN CONCEPT — VISUAL DIRECTION</span>}

            {current.images.length > 1 && (
              <div className="room-world__gallery" aria-label={`${current.name} gallery`}>
                {current.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={index === activeImage ? "is-active" : ""}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${current.name} image ${index + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.src} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            <div className="room-world__actions">
              <a className="room-world__cta" href={enquiry(current)} target="_blank" rel="noopener noreferrer">ENQUIRE ON WHATSAPP</a>
              <a className="room-world__secondary" href="#book" onClick={close}>VIEW BOOKING FORM</a>
            </div>
          </div>

          <button className="room-world__close" onClick={close} aria-label="Close room">×</button>
          <button className="room-world__nav room-world__nav--prev" onClick={() => go(-1)} aria-label="Previous room">‹</button>
          <button className="room-world__nav room-world__nav--next" onClick={() => go(1)} aria-label="Next room">›</button>
        </div>
      )}
    </section>
  );
}
