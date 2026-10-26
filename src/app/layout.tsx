import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/500";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/instrument-sans/400";
import "@fontsource/instrument-sans/600";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.brand.name} | Car-themed suites in ${site.location.city}`,
  description: site.brand.supporting,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
