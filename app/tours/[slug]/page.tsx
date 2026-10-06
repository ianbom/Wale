import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "@/components/tour-page";
import { tours } from "@/lib/wale-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();
  const title = `${tour.title} | Wale Adventure`;
  return { title, description: tour.description, alternates: { canonical: `/tours/${slug}` }, openGraph: { title, description: tour.description, images: [tour.image] }, twitter: { card: "summary_large_image", title, description: tour.description, images: [tour.image] } };
}

export default async function TourRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();
  return <TourPage tour={tour} />;
}
