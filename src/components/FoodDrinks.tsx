import { site } from "@/content/site";
import { buildFoodEnquiry, whatsappUrl } from "@/lib/whatsapp";

export default function FoodDrinks() {
  const s = site.sections.dine;
  const { food, drinks } = site.menu;
  const href = whatsappUrl(site.contact.whatsappNumber, buildFoodEnquiry(site.brand.name));
  const hasMenu = food.length + drinks.length > 0;
  return (
    <section id="food" className="section dine" aria-labelledby="dine-title">
      <div className="wrap dine__grid">
        <div className="dine__text">
          <h2 id="dine-title" className="display">{s.title}<b>.</b></h2>
          <p className="lede">{s.copy}</p>
          {hasMenu ? (
            <div className="menu">
              {([["Food", food], ["Drinks", drinks]] as const).map(([label, items]) =>
                items.length ? (
                  <div key={label}>
                    <h3>{label}</h3>
                    <ul>
                      {items.map((m) => (
                        <li key={m.name}>
                          <span>{m.name}</span>
                          {m.price != null && <span>{m.price.toLocaleString("en-NG")}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p className="note">Menu coming soon. Ask us what is available.</p>
          )}
          <a className="btn btn--crimson" href={href} target="_blank" rel="noopener noreferrer">{s.cta}</a>
        </div>
        <div className="dine__photos">
          {site.images.food.map((f) => (
            <figure key={f.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} width={576} height={1024} loading="lazy" decoding="async" />
            </figure>
          ))}
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.images.loungeFridge.src} alt={site.images.loungeFridge.alt} width={560} height={700} loading="lazy" decoding="async" />
          </figure>
          <p className="note dine__cap">Food photos are from the opening event. The drinks fridge is in the lounge. Menu not final.</p>
        </div>
      </div>
    </section>
  );
}
