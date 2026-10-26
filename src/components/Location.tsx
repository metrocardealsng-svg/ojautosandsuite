import { site } from "@/content/site";

export default function Location() {
  const { address, landmark } = site.location;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return (
    <section id="location" className="section loc" aria-labelledby="loc-title">
      <div className="wrap loc__grid">
        <div>
          <h2 id="loc-title" className="display">FIND US<b>.</b></h2>
          <address className="loc__addr">
            {address}
            <br />
            <span className="muted">At {landmark}</span>
          </address>
          <a className="btn btn--ink" href={maps} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <figure className="loc__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.images.aerial.src} alt={site.images.aerial.alt} width={1376} height={768} loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}
