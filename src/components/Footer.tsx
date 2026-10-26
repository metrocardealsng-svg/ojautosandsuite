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
        <a href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
      </div>
    </footer>
  );
}
