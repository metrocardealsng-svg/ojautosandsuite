"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./rooms.css";

type Room = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  glow: string; // main glow colour (hex)
  glow2: string; // secondary glow colour
};

const ROOMS: Room[] = [
  { id: "bmw", name: "BMW M Power Room", tagline: "Precision. Speed. Pure M.", image: "/rooms/bmw.jpg", glow: "#1c8dff", glow2: "#ff2a3d" },
  { id: "crystal", name: "Crystal Room", tagline: "Sleep inside a diamond.", image: "/rooms/crystal.jpg", glow: "#5ff3ff", glow2: "#b9c7ff" },
  { id: "porsche", name: "Porsche Room", tagline: "Engineered for the night.", image: "/rooms/porsche.jpg", glow: "#ff2a2a", glow2: "#d4a017" },
  { id: "ferrari", name: "Ferrari Room", tagline: "Rosso Corsa, all the way.", image: "/rooms/ferrari.jpg", glow: "#ff1e1e", glow2: "#ffd400" },
];

type Open = { index: number; rect: DOMRect } | null;

export default function Rooms() {
  const [open, setOpen] = useState<Open>(null);
  const [expanded, setExpanded] = useState(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const openRoom = (index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;
    setExpanded(false);
    setOpen({ index, rect: el.getBoundingClientRect() });
    // next frame -> animate clip-path from the card to full screen
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
  };

  const close = useCallback(() => {
    setExpanded(false);
    setTimeout(() => setOpen(null), 700);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setOpen((o) =>
      o ? { ...o, index: (o.index + dir + ROOMS.length) % ROOMS.length } : o
    );
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

  // mouse parallax inside the immersive view
  const onMove = (e: React.PointerEvent) => {
    const s = stageRef.current;
    if (!s) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    s.style.setProperty("--px", String(x));
    s.style.setProperty("--py", String(y));
  };

  const room = open ? ROOMS[open.index] : null;
  const r = open?.rect;
  const startClip = r
    ? `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round 20px)`
    : "inset(0)";

  return (
    <section className="rooms" id="rooms">
      <h2 className="rooms__title">Choose Your Room</h2>
      <p className="rooms__sub">Hover to feel it. Click to step inside.</p>

      <div className="rooms__grid">
        {ROOMS.map((rm, i) => (
          <button
            key={rm.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="room-card"
            style={{ "--glow": rm.glow, "--glow2": rm.glow2 } as React.CSSProperties}
            onClick={() => openRoom(i)}
            aria-label={`Enter ${rm.name}`}
          >
            <img src={rm.image} alt={rm.name} loading="lazy" />
            <span className="room-card__shade" />
            <span className="room-card__label">
              <strong>{rm.name}</strong>
              <em>{rm.tagline}</em>
            </span>
          </button>
        ))}
      </div>

      {open && room && (
        <div
          className={`world ${expanded ? "is-open" : ""}`}
          style={{
            "--glow": room.glow,
            "--glow2": room.glow2,
            clipPath: expanded ? "inset(0px 0px 0px 0px round 0px)" : startClip,
          } as React.CSSProperties}
          onPointerMove={onMove}
          role="dialog"
          aria-modal="true"
          aria-label={room.name}
        >
          <div className="world__stage" ref={stageRef} key={room.id}>
            <img className="world__img" src={room.image} alt={room.name} />
            <div className="world__wash" />
            <div className="world__vignette" />
            <div className="world__particles" aria-hidden>
              {Array.from({ length: 18 }).map((_, k) => (
                <i key={k} style={{ "--k": k } as React.CSSProperties} />
              ))}
            </div>
          </div>

          <div className="world__ui" key={room.id + "ui"}>
            <p className="world__eyebrow">Room {String(open.index + 1).padStart(2, "0")} / {String(ROOMS.length).padStart(2, "0")}</p>
            <h3 className="world__name">{room.name}</h3>
            <p className="world__tag">{room.tagline}</p>
            {/* change the href to your booking / contact link */}
            <a className="world__cta" href="#book">Book this room</a>
          </div>

          <button className="world__close" onClick={close} aria-label="Close">✕</button>
          <button className="world__nav world__nav--prev" onClick={() => go(-1)} aria-label="Previous room">‹</button>
          <button className="world__nav world__nav--next" onClick={() => go(1)} aria-label="Next room">›</button>
        </div>
      )}
    </section>
  );
}
