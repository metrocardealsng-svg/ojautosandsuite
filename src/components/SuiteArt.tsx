import type { Suite } from "@/content/site";

function ConceptRoom({ id, name }: { id: Suite["id"]; name: string }) {
  const ferrari = id === "ferrari";
  const accent = ferrari ? "#d71935" : "#c9a45b";
  const deep = ferrari ? "#170d11" : "#111820";
  const wall = ferrari ? "#2a171c" : "#202833";
  const badge = ferrari ? "F" : "P";
  return (
    <svg className="art__room" viewBox="0 0 1600 1000" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={wall} /><stop offset="1" stopColor={deep} /></linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d5350" /><stop offset="1" stopColor="#171719" /></linearGradient>
        <linearGradient id={`${id}-linen`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3eee7" /><stop offset="1" stopColor={ferrari ? "#b9aeb0" : "#aeb6bf"} /></linearGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-wall)`} />
      <path d="M0 95H1600" stroke={accent} strokeWidth="5" />
      <g opacity=".26" stroke={accent} strokeWidth="2">{Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${160 + i * 110} 100V570`} />)}</g>
      <rect x="90" y="150" width="1420" height="470" fill="#090a0d" opacity=".55" />
      <rect x="110" y="170" width="1380" height="430" fill="none" stroke={accent} strokeWidth="3" opacity=".7" />
      <path d="M120 560H1480" stroke={accent} strokeWidth="9" />
      <g transform="translate(800 340)">
        <circle r="100" fill={accent} opacity=".13" /><circle r="79" fill="none" stroke={accent} strokeWidth="5" />
        <text x="0" y="24" textAnchor="middle" fill="#f6f0e9" fontSize="108" fontFamily="Arial,sans-serif" fontWeight="700">{badge}</text>
        <text x="0" y="132" textAnchor="middle" fill="#f6f0e9" fontSize="38" fontFamily="Arial,sans-serif" fontWeight="700" letterSpacing="10">{name.toUpperCase()}</text>
        <text x="0" y="172" textAnchor="middle" fill={accent} fontSize="16" fontFamily="Arial,sans-serif" letterSpacing="8">OJ SUITE COLLECTION</text>
      </g>
      <path d="M0 610H1600V1000H0Z" fill={`url(#${id}-floor)`} />
      <ellipse cx="800" cy="850" rx="550" ry="75" fill="#000" opacity=".5" />
      <rect x="350" y="600" width="900" height="225" rx="12" fill={deep} stroke={accent} strokeWidth="5" />
      <rect x="390" y="625" width="820" height="160" rx="8" fill={ferrari ? "#4b252d" : "#34404d"} />
      <rect x="420" y="638" width="760" height="105" rx="5" fill={`url(#${id}-linen)`} />
      <path d="M420 745L510 650H675L600 785H420Z" fill="#fff" opacity=".35" />
      <path d="M810 650H1180V785H730Z" fill="#fff" opacity=".18" />
      <rect x="400" y="770" width="800" height="48" rx="5" fill="#e8e0d7" /><rect x="370" y="800" width="860" height="35" fill={accent} />
      <rect x="410" y="825" width="45" height="100" fill="#08090b" /><rect x="1145" y="825" width="45" height="100" fill="#08090b" />
      <g><path d="M210 290V600M1390 290V600" stroke="#08090b" strokeWidth="10" /><path d="M165 600H255L225 575H195ZM1345 600H1435L1405 575H1375Z" fill={accent} /><path d="M178 300Q210 245 242 300L260 370H160ZM1358 300Q1390 245 1422 300L1440 370H1340Z" fill={accent} /></g>
      <rect x="48" y="48" width="270" height="56" fill={accent} />
      <text x="183" y="84" textAnchor="middle" fill={ferrari ? "#fff" : "#101318"} fontSize="20" fontFamily="Arial,sans-serif" fontWeight="700" letterSpacing="4">OJ / {name.toUpperCase()}</text>
      <text x="1540" y="950" textAnchor="end" fill="#fff" opacity=".8" fontSize="20" fontFamily="Arial,sans-serif" letterSpacing="5">DESIGN CONCEPT • PORT HARCOURT</text>
    </svg>
  );
}

export default function SuiteArt({ suite, large = false }: { suite: Suite; large?: boolean }) {
  return (
    <div className={`art art--${suite.id} ${large ? "art--lg" : ""}`} role="img" aria-label={`${suite.name} suite design concept, not a photograph of the actual room.`}>
      <span className="art__geo" aria-hidden />
      {(suite.id === "ferrari" || suite.id === "porsche") ? <ConceptRoom id={suite.id} name={suite.name} /> : <><span className="art__name" aria-hidden>{suite.name}</span><span className="art__note">Suite design concept</span></>}
      <span className="art__tag">DESIGN CONCEPT</span>
    </div>
  );
}
