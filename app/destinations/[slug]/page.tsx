import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationPage from "@/components/destination-page";
import { destinationDetails } from "@/lib/destination-content";
import { brand } from "@/lib/wale-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return destinationDetails.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationDetails.find((item) => item.slug === slug);
  if (!destination) notFound();
  const title = `${destination.title} | ${brand.name}`;
  return {
    title,
    description: destination.description,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: { type: "website", siteName: brand.name, title, description: destination.description, images: [destination.image] },
    twitter: { card: "summary_large_image", title, description: destination.description, images: [destination.image] },
  };
}

export default async function DestinationRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = destinationDetails.find((item) => item.slug === slug);
  if (!destination) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.title,
    description: destination.description,
    containedInPlace: { "@type": "AdministrativeArea", name: destination.region },
    image: `https://waleadventure.com${destination.image}`,
    url: `https://waleadventure.com/destinations/${destination.slug}`,
  };
  return <><DestinationPage key={destination.slug} destination={destination} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
