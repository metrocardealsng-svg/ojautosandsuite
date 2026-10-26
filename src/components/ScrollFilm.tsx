"use client";
import { useEffect, useRef, useState } from "react";

const STAGE_LABELS = ["Above the clouds", "Over the property", "Your escape starts here"];

export default function ScrollFilm() {
  const root = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"film" | "still">("film");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const v = vid.current;
    const el = root.current;
    if (!v || !el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (reducedMotion) {
      setMode("still");
      return;
    }

    // Mobile browsers are unreliable when a video is constantly seeked to follow
    // scroll. On phones, play the muted inline film normally; keep scroll-scrubbing on desktop.
    if (mobile) {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = "auto";
      const playFilm = () => {
        v.play().then(() => setMode("film")).catch(() => setMode("still"));
      };
      const fail = () => setMode("still");
      v.addEventListener("canplay", playFilm, { once: true });
      v.addEventListener("error", fail);
      if (v.readyState >= 3) playFilm();
      else v.load();
      return () => {
        v.removeEventListener("canplay", playFilm);
        v.removeEventListener("error", fail);
        v.pause();
      };
    }

    let dur = 4.5;
    let target = 0;
    let cur = 0;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const d = target - cur;
      if (Math.abs(d) > 0.004) {
        cur += d * 0.22;
        if (v.readyState >= 2) {
          try { v.currentTime = cur; } catch { /* wait for the next frame */ }
        }
        raf = requestAnimationFrame(tick);
      }
    };
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", String(p));
      setStage(p < 0.34 ? 0 : p < 0.75 ? 1 : 2);
      target = p * dur * 0.995;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMeta = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) dur = v.duration;
      v.pause();
      update();
    };
    const fail = () => setMode("still");
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("error", fail);
    if (v.readyState >= 1) onMeta();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("error", fail);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={root} id="arrival" className={`film film--${mode}`} aria-label="Arrival film">
      <div className="film__sticky">
        {mode === "film" ? (
          <video ref={vid} className="film__video" muted playsInline autoPlay loop preload="auto" poster="/video/arrival-poster.jpg" aria-hidden>
            <source src="/video/arrival.mp4" type='video/mp4; codecs="avc1.64001f"' />
            <source src="/video/arrival.webm" type='video/webm; codecs="vp9"' />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="film__video" src="/video/arrival-poster.jpg" alt="" width={1280} height={720} />
        )}
        <div className="film__scrim" aria-hidden />
        <p className="film__tag">Concept film<span className="film__tag-x">. Not documentary footage.</span></p>
        <a className="film__skip" href="#suites">Skip the film</a>
        <div className="film__caption" aria-live="off">
          <p className="film__label">{mode === "still" ? STAGE_LABELS[2] : STAGE_LABELS[stage]}</p>
          {(stage === 2 || mode === "still") && (
            <a className="btn btn--white" href="#suites">EXPLORE THE SUITES</a>
          )}
        </div>
        <span className="film__bar" aria-hidden />
      </div>
    </section>
  );
}
