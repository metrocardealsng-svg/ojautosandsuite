import { site } from "@/content/site";
import { buildStayEnquiry, whatsappUrl } from "@/lib/whatsapp";

export default function Experience() {
  const s = site.sections.stay;
  const href = whatsappUrl(site.contact.whatsappNumber, buildStayEnquiry(site.brand.name));
  const jag = site.suites.find((x) => x.id === "jaguar")!.images[0];
  const lam = site.suites.find((x) => x.id === "lamborghini")!.images[0];
  return (
    <section id="experience" className="section experience" aria-labelledby="stay-title">
      <div className="wrap experience__grid">
        <div className="experience__text">
          <h2 id="stay-title" className="display">{s.title}<b>.</b></h2>
          <p className="lede">{s.copy}</p>
          <a className="btn btn--crimson" href={href} target="_blank" rel="noopener noreferrer">{s.cta}</a>
        </div>
        <div className="experience__pics">
          <figure className="pic pic--a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={jag.src} alt={jag.alt} width={1800} height={1005} loading="lazy" decoding="async" />
            <figcaption>Jaguar suite</figcaption>
          </figure>
          <figure className="pic pic--b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lam.src} alt={lam.alt} width={1800} height={1005} loading="lazy" decoding="async" />
            <figcaption>Lamborghini suite</figcaption>
          </figure>
          <figure className="pic pic--c">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.images.stairs.src} alt={site.images.stairs.alt} width={1800} height={1005} loading="lazy" decoding="async" />
            <figcaption>The staircase</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
