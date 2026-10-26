import { site } from "@/content/site";
import { buildStayEnquiry, whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  const wa = whatsappUrl(site.contact.whatsappNumber, buildStayEnquiry(site.brand.name));
  return (
    <section id="top" className="hero" aria-label="Welcome">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{site.location.city}, {site.location.region}</p>
          <h1 className="hero__brand">
            <span>{site.brand.nameLine1}</span>
            <span>{site.brand.nameLine2}</span>
          </h1>
          <p className="hero__headline">{site.brand.headline}</p>
          <p className="hero__support">{site.brand.supporting}</p>
          <div className="hero__ctas">
            <a className="btn btn--crimson" href="#suites">EXPLORE THE SUITES</a>
            <a className="btn btn--ink" href={wa} target="_blank" rel="noopener noreferrer">BOOK ON WHATSAPP</a>
          </div>
        </div>
        <figure className="hero__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.images.heroExterior.src} alt={site.images.heroExterior.alt} width={1800} height={1005} fetchPriority="high" />
        </figure>
      </div>
    </section>
  );
}
