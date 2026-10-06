import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({ src: [{ path: "../public/fonts/inter-tight.woff2", weight: "400" }, { path: "../public/fonts/inter-tight.woff2", weight: "500" }, { path: "../public/fonts/inter-tight.woff2", weight: "600" }], variable: "--font-inter-tight", display: "swap" });
const serif = localFont({ src: [{ path: "../public/fonts/cormorant-garamond.woff2", weight: "400" }, { path: "../public/fonts/cormorant-garamond.woff2", weight: "500" }, { path: "../public/fonts/cormorant-garamond-italic.woff2", weight: "400", style: "italic" }, { path: "../public/fonts/cormorant-garamond-italic.woff2", weight: "500", style: "italic" }], variable: "--font-cormorant", display: "swap" });
const mono = localFont({ src: [{ path: "../public/fonts/jetbrains-mono.woff2", weight: "400" }, { path: "../public/fonts/jetbrains-mono.woff2", weight: "500" }], variable: "--font-jetbrains-mono", display: "swap" });
const hand = localFont({ src: "../public/fonts/caveat.woff2", weight: "500", variable: "--font-caveat", display: "swap" });
const display = localFont({ src: [{ path: "../public/fonts/bricolage-grotesque.woff2", weight: "500" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "600" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "700" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "800" }], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sulawesi.com"),
  title: "2D1N Tangkoko Nature Reserve Overnight Wildlife Safari | Sulawesi.com",
  description: "Immersive 2-day jungle expedition featuring afternoon and early-morning wildlife treks in Tangkoko.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable} ${display.variable}`}>
        {children}
      </body>
    </html>
  );
}
