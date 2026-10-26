import { site } from "@/content/site";
import { buildStayEnquiry, whatsappUrl } from "@/lib/whatsapp";
import Brand from "./Brand";
import "./FooterExperience.css";

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function Footer() {
  const wa = whatsappUrl(site.contact.whatsappNumber, buildStayEnquiry(site.brand.name));

  return (
    <footer className="lux-footer">
      <div className="lux-footer__signal" aria-hidden="true">
        <span>OJ</span>
        <span>EST. EXPERIENCE</span>
      </div>

      <div className="wrap lux-footer__main">
        <div className="lux-footer__brand">
          <Brand />
          <p>YOUR SPACE. YOUR NIGHT. YOUR ESCAPE.</p>
          <span>Automotive-inspired suites in Port Harcourt.</span>
        </div>

        <div className="lux-footer__column">
          <p className="lux-footer__label">EXPLORE</p>
          <a href="#experience">Experience</a>
          <a href="#suites">Suites</a>
          <a href="#rates">Rates</a>
          <a href="#food">Food &amp; Drinks</a>
          <a href="#nightlife">Nightlife</a>
          <a href="#location">Location</a>
        </div>

        <div className="lux-footer__column lux-footer__rates">
          <p className="lux-footer__label">SUITE RATES</p>
          {site.suites.map((suite) => (
            <a key={suite.id} href="#suites">
              <span>{suite.name}</span>
              <strong>{suite.price ? naira(suite.price.amount) : "ON REQUEST"}</strong>
            </a>
          ))}
          <small>Nightly rates shown. Availability is confirmed by the team.</small>
        </div>

        <div className="lux-footer__column lux-footer__contact">
          <p className="lux-footer__label">PORT HARCOURT</p>
          <address>{site.location.address}</address>
          <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
          <a className="lux-footer__wa" href={wa} target="_blank" rel="noopener noreferrer">WHATSAPP →</a>
        </div>
      </div>

      <div className="wrap lux-footer__bottom">
        <span>© {new Date().getFullYear()} OJAUTOLOUNGE AND SUITE</span>
        <span>RATES &amp; AVAILABILITY SUBJECT TO CONFIRMATION</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
