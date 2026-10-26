import { site } from "@/content/site";
import { buildLoungeEnquiry, whatsappUrl } from "@/lib/whatsapp";

export default function Nightlife() {
  const s = site.sections.afterDark;
  const href = whatsappUrl(site.contact.whatsappNumber, buildLoungeEnquiry(site.brand.name));
  return (
    <section id="nightlife" className="section night" aria-labelledby="night-title">
      <div className="wrap night__grid">
        <div className="night__text">
          <h2 id="night-title" className="display display--xl">AFTER<br />DARK<b>.</b></h2>
          <p className="lede">{s.copy}</p>
          <a className="btn btn--ink" href={href} target="_blank" rel="noopener noreferrer">{s.cta}</a>
        </div>
        <figure className="night__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.images.lounge.src} alt={site.images.lounge.alt} width={1800} height={1005} loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}
