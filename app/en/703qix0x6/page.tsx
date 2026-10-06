import type { Metadata } from "next";
import TourPage from "@/components/tour-page";

export const metadata: Metadata = {
  title: "2D1N Tangkoko Nature Reserve Overnight Wildlife Safari | Sulawesi.com",
  description: "Immersive 2-day jungle expedition featuring afternoon and early-morning wildlife treks in Tangkoko.",
  alternates: { canonical: "/en/703qix0x6" },
  openGraph: {
    title: "2D1N Tangkoko Nature Reserve Overnight Wildlife Safari",
    description: "Immersive 2-day jungle expedition featuring afternoon and early-morning wildlife treks in Tangkoko.",
    images: ["/images/tangkoko_image_landscape_4598.webp"],
  },
};

export default function TourRoute() {
  return <TourPage />;
}
