"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import {
  buildBookingMessage,
  todayISO,
  validateBooking,
  whatsappUrl,
  type BookingErrors,
  type BookingValues,
} from "@/lib/whatsapp";

const EMPTY: BookingValues = { suite: "", checkIn: "", checkOut: "", guests: "2", name: "", request: "" };
const ANY = "Not sure yet, please advise";
const ORDER: (keyof BookingValues)[] = ["suite", "checkIn", "checkOut", "guests", "name", "request"];

export default function BookingForm() {
  const [v, setV] = useState<BookingValues>(EMPTY);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [url, setUrl] = useState<string | null>(null);
  const [today, setToday] = useState("");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setToday(todayISO());
    const onSelect = (e: Event) => {
      setV((cur) => ({ ...cur, suite: String((e as CustomEvent).detail) }));
      setUrl(null);
    };
    window.addEventListener("oj:select-suite", onSelect);
    return () => window.removeEventListener("oj:select-suite", onSelect);
  }, []);

  const set = (k: keyof BookingValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((cur) => ({ ...cur, [k]: e.target.value }));
    setUrl(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateBooking(v, todayISO());
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setUrl(null);
      return;
    }
    const link = whatsappUrl(site.contact.whatsappNumber, buildBookingMessage(site.brand.name, v));
    setUrl(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const field = (k: keyof BookingValues) => ({
    name: k,
    id: `f-${k}`,
    value: v[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const err = (k: keyof BookingValues) => errors[k] && <p className="err" id={`e-${k}`}>{errors[k]}</p>;

  return (
    <section id="book" className="section book" aria-labelledby="book-title">
      <div className="wrap book__grid">
        <div className="book__intro">
          <h2 id="book-title" className="display">SEND AN ENQUIRY</h2>
          <p className="lede">Fill this in and we open WhatsApp with your details written out. Our team replies with availability and the current rate.</p>
          <p className="note">This is an enquiry. Nothing is booked or paid until the team confirms on WhatsApp.</p>
        </div>

        <form ref={form} className="form" onSubmit={submit} noValidate>
          <div className="form__row">
            <label htmlFor="f-suite">Suite</label>
            <select {...field("suite")} required>
              <option value="">Choose a suite</option>
              {site.suites.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
              <option value={ANY}>{ANY}</option>
            </select>
            {err("suite")}
          </div>

          <div className="form__two">
            <div className="form__row">
              <label htmlFor="f-checkIn">Check-in</label>
              <input type="date" {...field("checkIn")} min={today || undefined} required />
              {err("checkIn")}
            </div>
            <div className="form__row">
              <label htmlFor="f-checkOut">Check-out</label>
              <input type="date" {...field("checkOut")} min={v.checkIn || today || undefined} required />
              {err("checkOut")}
            </div>
          </div>

          <div className="form__two">
            <div className="form__row">
              <label htmlFor="f-guests">Guests</label>
              <input type="number" inputMode="numeric" min={1} max={20} {...field("guests")} required />
              {err("guests")}
            </div>
            <div className="form__row">
              <label htmlFor="f-name">Your name</label>
              <input type="text" autoComplete="name" {...field("name")} required />
              {err("name")}
            </div>
          </div>

          <div className="form__row">
            <label htmlFor="f-request">Anything else? <span className="muted">(optional)</span></label>
            <textarea rows={3} {...field("request")} />
          </div>

          <button type="submit" className="btn btn--crimson btn--block">Send enquiry on WhatsApp</button>

          <div role="status" aria-live="polite" className="form__status">
            {url && (
              <p>
                Your enquiry is ready. WhatsApp should open now. If it did not, <a href={url} target="_blank" rel="noopener noreferrer">open WhatsApp here</a>. The team will confirm availability and rate. Nothing is booked yet.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
