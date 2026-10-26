import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildBookingMessage,
  validateBooking,
  whatsappUrl,
  buildSuiteEnquiry,
  type BookingValues,
} from "../src/lib/whatsapp.ts";

const base: BookingValues = {
  suite: "Ferrari",
  checkIn: "2026-11-10",
  checkOut: "2026-11-12",
  guests: "2",
  name: "Ada Obi",
  request: "",
};
const today = "2026-10-25";

test("valid booking has no errors", () => {
  assert.deepEqual(validateBooking(base, today), {});
});
test("check-out must be after check-in", () => {
  assert.ok(validateBooking({ ...base, checkOut: "2026-11-10" }, today).checkOut);
  assert.ok(validateBooking({ ...base, checkOut: "2026-11-09" }, today).checkOut);
});
test("check-in cannot be in the past, today is allowed", () => {
  assert.ok(validateBooking({ ...base, checkIn: "2026-10-24" }, today).checkIn);
  assert.equal(validateBooking({ ...base, checkIn: "2026-10-25", checkOut: "2026-10-26" }, today).checkIn, undefined);
});
test("required fields", () => {
  const e = validateBooking({ suite: "", checkIn: "", checkOut: "", guests: "", name: " ", request: "" }, today);
  for (const k of ["suite", "checkIn", "checkOut", "guests", "name"] as const) assert.ok(e[k], k);
});
test("rejects impossible dates and bad guests", () => {
  assert.ok(validateBooking({ ...base, checkIn: "2026-02-31" }, today).checkIn);
  assert.ok(validateBooking({ ...base, guests: "0" }, today).guests);
  assert.ok(validateBooking({ ...base, guests: "1.5" }, today).guests);
});
test("message contains every selected value and no placeholder", () => {
  const m = buildBookingMessage("OJAUTOLOUNGE AND SUITE", { ...base, request: "Late arrival & airport pickup?" });
  for (const s of ["Preferred suite: Ferrari", "Guests: 2", "Name: Ada Obi", "Late arrival & airport pickup?", "10 Nov 2026", "12 Nov 2026"]) {
    assert.ok(m.includes(s), s);
  }
  assert.ok(!/\[|ENCODED/.test(m));
});
test("optional request line is omitted when empty", () => {
  assert.ok(!buildBookingMessage("X", base).includes("Additional request"));
});
test("url uses the configured number and round-trips encoding", () => {
  const msg = buildBookingMessage("OJAUTOLOUNGE AND SUITE", { ...base, request: "50% off? A&B #1" });
  const url = whatsappUrl("2348065971529", msg);
  assert.ok(url.startsWith("https://wa.me/2348065971529?text="));
  assert.equal(new URL(url).searchParams.get("text"), msg);
  assert.ok(!url.includes(" ") && !url.includes("\n"));
});
test("suite enquiry names the suite", () => {
  assert.ok(buildSuiteEnquiry("X", "Porsche").includes("Porsche suite"));
});
