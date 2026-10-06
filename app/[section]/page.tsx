import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content-page";
import { metadataContent } from "@/lib/wale-content";

const sections = {
  about: { title: "Our Story, Your Adventure", description: "Meet Wale Adventure, your local team for private tours and authentic experiences in North Sulawesi." },
  tours: { title: "Private North Sulawesi Tours", description: "Choose a Minahasa Highlands, Tangkoko Wildlife or Bunaken Marine Adventure with Wale Adventure." },
  destinations: { title: "Discover North Sulawesi", description: "Explore Tangkoko Nature Reserve, Tomohon Highlands and Bunaken National Marine Park with local guides." },
  gallery: { title: "North Sulawesi in Pictures", description: "Wildlife, highland culture and marine adventures from Wale Adventure in North Sulawesi." },
  faq: { title: "Frequently Asked Questions", description: "Find out about Wale Adventure private tours, airport transfers, local guides and booking." },
  contact: { title: "Plan Your Adventure", description: "Contact Wale Adventure on WhatsApp or by email to plan your private North Sulawesi tour." },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(sections).map((section) => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  if (!(section in sections)) notFound();
  const content = sections[section as keyof typeof sections];
  const title = `${content.title} | Wale Adventure`;
  return { title, description: content.description, alternates: { canonical: `/${section}` }, openGraph: { title, description: content.description, images: [metadataContent.image] }, twitter: { card: "summary_large_image", title, description: content.description, images: [metadataContent.image] } };
}
export default async function SectionRoute({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!(section in sections)) notFound();
  return <ContentPage section={section as keyof typeof sections} title={sections[section as keyof typeof sections].title} />;
}
