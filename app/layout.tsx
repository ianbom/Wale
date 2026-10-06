import type { Metadata } from "next";
import localFont from "next/font/local";
import { brand, metadataContent } from "@/lib/wale-content";
import "./globals.css";

const sans = localFont({ src: [{ path: "../public/fonts/inter-tight.woff2", weight: "400" }, { path: "../public/fonts/inter-tight.woff2", weight: "500" }, { path: "../public/fonts/inter-tight.woff2", weight: "600" }], variable: "--font-inter-tight", display: "swap" });
const serif = localFont({ src: [{ path: "../public/fonts/cormorant-garamond.woff2", weight: "400" }, { path: "../public/fonts/cormorant-garamond.woff2", weight: "500" }, { path: "../public/fonts/cormorant-garamond-italic.woff2", weight: "400", style: "italic" }, { path: "../public/fonts/cormorant-garamond-italic.woff2", weight: "500", style: "italic" }], variable: "--font-cormorant", display: "swap" });
const mono = localFont({ src: [{ path: "../public/fonts/jetbrains-mono.woff2", weight: "400" }, { path: "../public/fonts/jetbrains-mono.woff2", weight: "500" }], variable: "--font-jetbrains-mono", display: "swap" });
const hand = localFont({ src: "../public/fonts/caveat.woff2", weight: "500", variable: "--font-caveat", display: "swap" });
const display = localFont({ src: [{ path: "../public/fonts/bricolage-grotesque.woff2", weight: "500" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "600" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "700" }, { path: "../public/fonts/bricolage-grotesque.woff2", weight: "800" }], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://waleadventure.com"),
  title: metadataContent.title,
  description: metadataContent.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: brand.name, title: metadataContent.title, description: metadataContent.description, images: [metadataContent.image] },
  twitter: { card: "summary_large_image", title: metadataContent.title, description: metadataContent.description, images: [metadataContent.image] },
  icons: { icon: "/images/wale/icon.png", apple: "/images/wale/icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable} ${display.variable}`}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TravelAgency", name: brand.name, url: "https://waleadventure.com", logo: "https://waleadventure.com" + brand.logo, description: brand.description, email: brand.email, telephone: "+" + brand.phone, areaServed: "North Sulawesi, Indonesia", sameAs: [brand.instagram, brand.facebook] }).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
