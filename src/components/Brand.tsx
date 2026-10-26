import { site } from "@/content/site";

export default function Brand({ className = "" }: { className?: string }) {
  const { logoSrc, name, nameLine1, nameLine2 } = site.brand;
  return (
    <span className={`brand ${className}`} aria-label={name}>
      {logoSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="brand__logo" src={logoSrc} alt="" width={44} height={44} />
      )}
      <span className="brand-word" aria-hidden>
        <span className="brand-word__a">{nameLine1}</span>
        <span className="brand-word__b">{nameLine2}</span>
      </span>
    </span>
  );
}
