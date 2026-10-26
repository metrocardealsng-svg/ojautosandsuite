import { site } from "@/content/site";
import { buildStayEnquiry, whatsappUrl } from "@/lib/whatsapp";
import Brand from "./Brand";

export default function Footer() {
  const wa = whatsappUrl(site.contact.whatsappNumber, buildStayEnquiry(site.brand.name));
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <Brand />
        <p className="muted">Availability, rates and bookings are confirmed by our team on WhatsApp.</p>
        <div>
          <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>Call {site.contact.phone}</a>
          <br />
          <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp {site.contact.phone}</a>
        </div>
      </div>
    </footer>
  );
}
