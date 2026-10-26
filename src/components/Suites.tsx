"use client";
import { useEffect, useRef, useState } from "react";
import { site, type Suite } from "@/content/site";
import { buildSuiteEnquiry, whatsappUrl } from "@/lib/whatsapp";
import SuiteArt from "./SuiteArt";

function priceLabel(s: Suite) {
  if (!s.price) return "Rate on request";
  return `${s.price.currency} ${s.price.amount.toLocaleString("en-NG")} per night`;
}

function enquiry(s: Suite) {
  return whatsappUrl(site.contact.whatsappNumber, buildSuiteEnquiry(site.brand.name, s.name));
}

function selectInForm(name: string) {
  window.dispatchEvent(new CustomEvent("oj:select-suite", { detail: name }));
}

function Media({ suite, large }: { suite: Suite; large?: boolean }) {
  const img = suite.images[0];
  if (!img) return <SuiteArt suite={suite} large={large} />;
  return (
    <div className="media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} width={1800} height={1005} loading="lazy" decoding="async" />
      {img.kind === "concept" && <span className="media__tag">Concept image</span>}
      {img.caption && <span className="media__cap">{img.caption}</span>}
    </div>
  );
}

export default function Suites() {
  const [openId, setOpenId] = useState<Suite["id"] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = site.suites.find((s) => s.id === openId) ?? null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (openId && !d.open) d.showModal();
    if (!openId && d.open) d.close();
  }, [openId]);

  return (
    <section id="suites" className="section suites" aria-labelledby="suites-title">
      <div className="wrap">
        <h2 id="suites-title" className="display display--xl">CHOOSE YOUR WORLD<b>.</b></h2>
        <p className="lede lede--narrow">Four suites, four cars. Pick the one that fits your night.</p>
      </div>

      <ol className="suite-list">
        {site.suites.map((s, i) => (
          <li key={s.id} className={`suite suite--${s.id} ${i % 2 ? "suite--flip" : ""}`}>
            <div className="wrap suite__grid">
              <div className="suite__text">
                <h3 className="suite__name">{s.name}</h3>
                <p className="suite__desc">{s.description}</p>
                <p className="suite__price">{priceLabel(s)}</p>
                <div className="suite__actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setOpenId(s.id)} aria-haspopup="dialog">
                    View the {s.name} suite
                  </button>
                  <a className="btn btn--accent" href={enquiry(s)} target="_blank" rel="noopener noreferrer">
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
              <div className="suite__media"><Media suite={s} /></div>
            </div>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialog.current && setOpenId(null)}
      >
        {current && (
          <div className={`modal__body suite--${current.id}`}>
            <div className="modal__bar">
              <button type="button" className="modal__close" onClick={() => setOpenId(null)}>Close</button>
            </div>
            <h3 id="modal-title" className="suite__name">{current.name}</h3>
            <div className="modal__gallery">
              {current.images.length === 0 && <SuiteArt suite={current} large />}
              {current.images.map((img) => (
                <div className="media" key={img.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} width={1800} height={1005} loading="lazy" decoding="async" />
                  {img.kind === "concept" && <span className="media__tag">Concept image</span>}
                  {img.caption && <span className="media__cap">{img.caption}</span>}
                </div>
              ))}
            </div>
            <p className="suite__desc">{current.description}</p>
            {current.amenities.length > 0 && (
              <ul className="amenities">
                {current.amenities.map((a) => <li key={a}>{a}</li>)}
              </ul>
            )}
            <p className="suite__price">{priceLabel(current)}</p>
            <div className="suite__actions">
              <a className="btn btn--accent" href={enquiry(current)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
              <a
                className="btn btn--ghost"
                href="#book"
                onClick={() => { selectInForm(current.name); setOpenId(null); }}
              >
                Use the booking form
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
