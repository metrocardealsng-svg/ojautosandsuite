import { site } from "@/content/site";

export default function Location() {
  const mainMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location.address)}`;
  return (
    <section id="location" className="section loc" aria-labelledby="loc-title">
      <div className="wrap loc__grid">
        <div>
          <p className="eyebrow">PORT HARCOURT / TWO LOCATIONS</p>
          <h2 id="loc-title" className="display">FIND US<b>.</b></h2>

          <address className="loc__addr">
            <strong>Main Location</strong><br />
            {site.location.address}
          </address>
          <a className="btn btn--ink" href={mainMaps} target="_blank" rel="noopener noreferrer">Open Main Location in Google Maps</a>

          {site.location.branches.map((branch) => {
            const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;
            return (
              <div className="loc__branch" key={branch.name}>
                <address className="loc__addr">
                  <strong>{branch.name}</strong><br />
                  {branch.address}
                </address>
                <a className="btn btn--ghost" href={maps} target="_blank" rel="noopener noreferrer">Open Branch in Google Maps</a>
                <div className="loc__contact">
                  <p className="eyebrow">RUMAGHOLU BRANCH / CALL & WHATSAPP</p>
                  <a href="tel:08081688475">0808 168 8475</a>
                  <a className="btn btn--crimson" href="https://wa.me/2348081688475?text=Hello%20OJAUTOLOUNGE%20AND%20SUITE%20Rumagholu%20branch%2C%20I%20would%20like%20to%20enquire%20about%20a%20room." target="_blank" rel="noopener noreferrer">WhatsApp This Branch</a>
                </div>
              </div>
            );
          })}

          <div className="loc__contact">
            <p className="eyebrow">CALL / WHATSAPP</p>
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
          </div>
        </div>
        <figure className="loc__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.images.aerial.src} alt={site.images.aerial.alt} width={1376} height={768} loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}
