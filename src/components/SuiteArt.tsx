import type { Suite } from "@/content/site";

export default function SuiteArt({ suite, large = false }: { suite: Suite; large?: boolean }) {
  return (
    <div className={`art art--${suite.id} ${large ? "art--lg" : ""}`} role="img" aria-label={`${suite.name} suite. Interior photos coming soon.`}>
      <span className="art__geo" aria-hidden />
      <span className="art__name" aria-hidden>{suite.name}</span>
      <span className="art__note">Interior photos coming soon</span>
    </div>
  );
}
