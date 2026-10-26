export type BookingValues = {
  suite: string;
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  guests: string;
  name: string;
  request: string;
};

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseISO(value: string): Date | null {
  const m = ISO.exec(value);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  // reject rollovers like 2026-02-31
  if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) {
    return null;
  }
  return d;
}

export function formatDate(value: string): string {
  const d = parseISO(value);
  if (!d) return value;
  return d.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Local calendar date as yyyy-mm-dd. */
export function todayISO(now: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function validateBooking(v: BookingValues, today: string = todayISO()): BookingErrors {
  const e: BookingErrors = {};
  if (!v.suite.trim()) e.suite = "Choose a suite.";
  if (!v.name.trim()) e.name = "Enter your name.";

  const inD = parseISO(v.checkIn);
  const outD = parseISO(v.checkOut);
  const todayD = parseISO(today);

  if (!v.checkIn) e.checkIn = "Pick a check-in date.";
  else if (!inD) e.checkIn = "Check-in is not a valid date.";
  else if (todayD && inD < todayD) e.checkIn = "Check-in cannot be in the past.";

  if (!v.checkOut) e.checkOut = "Pick a check-out date.";
  else if (!outD) e.checkOut = "Check-out is not a valid date.";
  else if (inD && outD <= inD) e.checkOut = "Check-out must be after check-in.";

  const g = Number(v.guests);
  if (!v.guests.trim()) e.guests = "Enter the number of guests.";
  else if (!Number.isInteger(g) || g < 1 || g > 20) e.guests = "Guests must be a whole number from 1 to 20.";

  return e;
}

export function buildBookingMessage(brandName: string, v: BookingValues): string {
  const lines = [
    `Hello ${brandName}, I would like to enquire about a booking.`,
    "",
    `Preferred suite: ${v.suite}`,
    `Check-in: ${formatDate(v.checkIn)}`,
    `Check-out: ${formatDate(v.checkOut)}`,
    `Guests: ${v.guests}`,
    `Name: ${v.name.trim()}`,
  ];
  if (v.request.trim()) lines.push(`Additional request: ${v.request.trim()}`);
  lines.push("", "Please confirm availability and the current rate. Thank you.");
  return lines.join("\n");
}

export function buildSuiteEnquiry(brandName: string, suiteName: string): string {
  return `Hello ${brandName}, I would like to enquire about the ${suiteName} suite. Please confirm availability and the current rate. Thank you.`;
}

export function buildFoodEnquiry(brandName: string): string {
  return `Hello ${brandName}, I would like to enquire about food and drinks. Please tell me what is available. Thank you.`;
}

export function buildLoungeEnquiry(brandName: string): string {
  return `Hello ${brandName}, I would like to enquire about the lounge. Please tell me what is on. Thank you.`;
}

export function buildStayEnquiry(brandName: string): string {
  return `Hello ${brandName}, I would like to enquire about a stay. Please tell me about availability and rates. Thank you.`;
}

export function whatsappUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
