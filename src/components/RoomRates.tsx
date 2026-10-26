import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./RoomRates.module.css";

const money = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function RoomRates() {
  const wa = whatsappUrl(
    site.contact.whatsappNumber,
    `Hello ${site.brand.name}, I would like to enquire about room availability and rates. Please assist me.`
  );

  return (
    <section id="rates" className={`section ${styles.rates}`} aria-labelledby="rates-title">
      <div className="wrap">
        <div className={styles.heading}>
          <p className="eyebrow">ROOM RATES / 01</p>
          <h2 id="rates-title" className="display">FIND YOUR STAY<b>.</b></h2>
          <p className="lede">
            Choose your room, your world and your location. Rates shown below are the current listed nightly rates.
          </p>
        </div>

        <div className={styles.locationBlock}>
          <div className={styles.locationHead}>
            <div>
              <p className={styles.kicker}>MAIN LOCATION</p>
              <h3>OJAUTOLOUNGE AND SUITE</h3>
              <p>{site.location.address}</p>
            </div>
            <a className="btn btn--ghost" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
              CALL {site.contact.phone}
            </a>
          </div>

          <div className={styles.rateGrid}>
            {site.rates.mainBranch.map((group) => (
              <article className={styles.card} key={group.category}>
                <div className={styles.cardTop}>
                  <span>{group.category}</span>
                  <span>{String(group.rooms.length).padStart(2, "0")}</span>
                </div>
                <ul>
                  {group.rooms.map((room) => (
                    <li key={room.name}>
                      <span>{room.name}</span>
                      <strong>{money(room.amount)}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {site.rates.otherBranches.map((branch) => (
          <div className={`${styles.locationBlock} ${styles.branch}`} key={branch.branchName}>
            <div className={styles.locationHead}>
              <div>
                <p className={styles.kicker}>OTHER BRANCH</p>
                <h3>{branch.branchName}</h3>
                <p>{branch.address}</p>
              </div>
              <a className="btn btn--ghost" href={`https://wa.me/${site.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                WHATSAPP
              </a>
            </div>

            <div className={styles.roomTable}>
              {branch.rooms.map((room) => (
                <div className={styles.roomRow} key={room.number}>
                  <span className={styles.roomNumber}>{room.number}</span>
                  <span className={styles.roomCategory}>{room.category}</span>
                  <strong>{money(room.amount)}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.contactBar}>
          <div>
            <p className={styles.kicker}>BOOKING LINE</p>
            <p className={styles.phone}>{site.contact.phone}</p>
            <p className="muted">Call or WhatsApp for availability and booking confirmation.</p>
          </div>
          <a className="btn btn--crimson" href={wa} target="_blank" rel="noopener noreferrer">
            BOOK ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
