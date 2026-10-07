export const brand = {
  name: "Wale Adventure",
  tagline: "Explore North Sulawesi With Confidence",
  description: "Private tours and custom adventures across Sulawesi, with flexible itineraries and personal support.",
  email: "info@waleadventure.com",
  phone: "6285111236875",
  displayPhone: "+62 851 1123 6875",
  instagram: "https://www.instagram.com/waleadventure/",
  facebook: "https://www.facebook.com/profile.php?id=61581552816499",
  location: "North Sulawesi, Indonesia",
  logo: "/images/wale/logo.png",
};

export const whatsappUrl = (message = "Hello Wale Adventure, I'm interested in planning a Sulawesi tour. Please help me choose my destination, travel dates and group size.") =>
  `https://wa.me/${brand.phone}?text=${encodeURIComponent(message)}`;

export const regions = ["North Sulawesi", "South Sulawesi", "Central Sulawesi", "Gorontalo"] as const;
export type Region = typeof regions[number];
export const priceDisclaimer = "Indicative starting price per private group. Final price depends on group size, dates and itinerary; confirm via WhatsApp.";
export const formatPrice = (amount: number) => `IDR ${new Intl.NumberFormat("en-US").format(amount)}`;

export type Tour = {
  slug: string;
  title: string;
  shortTitle: string;
  destination: string;
  region: Region;
  startingPriceIdr: number;
  pricingStatus: "indicative";
  description: string;
  overview: string;
  image: string;
  imageAlt: string;
  highlights: string[];
} & ({
  kind: "scheduled";
  stages: { title: string; description: string; image: string; alt: string }[];
  included: string[];
  excluded: string[];
  serviceAreas: string[];
  whatToBring: string[];
  pickup: string;
  duration: string;
} | { kind: "custom" });

export const featuredTours: Tour[] = [
  {
    slug: "minahasa-highlands",
    kind: "scheduled",
    destination: "Tomohon",
    region: "North Sulawesi",
    startingPriceIdr: 1_000_000,
    pricingStatus: "indicative",
    title: "Minahasa Highlands Experience",
    shortTitle: "Tomohon & Minahasa Highlands",
    description: "Volcanic scenery, highland culture and local flavors on a private full-day tour.",
    overview: "Explore Tomohon and the Minahasa Highlands with a local guide. Visit volcanic landscapes, Lake Linow, local farms and cultural landmarks, with time for an authentic local lunch.",
    image: "/images/wale/minahasa.png",
    imageAlt: "Travelers with a local guide beside a lake in the Minahasa Highlands",
    highlights: ["Mount Mahawu", "Lake Linow", "Bukit Doa (Prayer Hill)", "Authentic Local Lunch", "Vanilla Farm", "Traditional / Extreme Market", "Natural Hot Spring"],
    stages: [
      { title: "Highland landscapes", description: "Take in the volcanic scenery around Mount Mahawu and the colorful waters of Lake Linow.", image: "/images/wale/minahasa.png", alt: "Travelers beside a lake in the Minahasa Highlands" },
      { title: "Local culture and flavors", description: "Visit Bukit Doa, a vanilla farm and a traditional market, with an authentic local lunch along the way.", image: "/images/wale/gallery-linow.png", alt: "Visitors at a Minahasa highland attraction" },
      { title: "A relaxing finish", description: "The tour also includes a natural hot spring, with private transportation for your return journey.", image: "/images/wale/hero.png", alt: "Travelers exploring local culture in the Minahasa Highlands" },
    ],
    included: ["Private air-conditioned transportation", "Professional local driver-guide", "Entrance fees", "Lunch", "Bottled water", "Parking fees"],
    excluded: ["Personal expenses", "Alcoholic beverages", "Tips"],
    serviceAreas: ["Sam Ratulangi International Airport", "Tomohon", "Manado", "Tangkoko"],
    whatToBring: ["Comfortable walking shoes", "Hat or cap", "Sunscreen", "Camera", "Cash", "Light jacket"],
    pickup: "08:00 or 08:30",
    duration: "8 hours",
  },
  {
    slug: "tangkoko",
    kind: "scheduled",
    destination: "Tangkoko",
    region: "North Sulawesi",
    startingPriceIdr: 1_500_000,
    pricingStatus: "indicative",
    title: "Tangkoko Wildlife Adventure",
    shortTitle: "Tangkoko Nature Reserve",
    description: "Walk the rainforest with a local wildlife guide in search of Tangkoko’s endemic species.",
    overview: "Explore Tangkoko Nature Reserve with a local wildlife guide. Look for black-crested macaques, tarsiers and forest birds on a rainforest trek through one of North Sulawesi’s best-known wildlife areas.",
    image: "/images/wale/tangkoko-wildlife.png",
    imageAlt: "Wildlife experience in Tangkoko Nature Reserve",
    highlights: ["Tangkoko Nature Reserve", "Black-Crested Macaques", "Tarsiers", "Bird Watching", "Tropical Rainforest Trek", "Local Wildlife Guide", "Forest Scenery"],
    stages: [
      { title: "Into Tangkoko rainforest", description: "Meet your local wildlife guide and follow forest trails through Tangkoko Nature Reserve.", image: "/images/wale/tangkoko-wildlife.png", alt: "Wildlife in the rainforest of Tangkoko Nature Reserve" },
      { title: "Wildlife and birdlife", description: "Watch for black-crested macaques, tarsiers, hornbills and kingfishers in their natural habitat.", image: "/images/wale/tangkoko-tarsier.jpg", alt: "Tarsier in Tangkoko Nature Reserve" },
    ],
    included: ["Private transportation", "Professional driver", "Local wildlife guide", "National Park entrance fee", "Bottled water", "Parking fees"],
    excluded: ["Meals", "Personal expenses", "Tips"],
    serviceAreas: ["Manado", "Tomohon", "Bitung area"],
    whatToBring: ["Comfortable trekking shoes", "Long pants", "Insect repellent", "Camera with zoom lens", "Hat"],
    pickup: "06:00–07:00",
    duration: "6–7 hours",
  },
  {
    slug: "bunaken",
    kind: "scheduled",
    destination: "Bunaken",
    region: "North Sulawesi",
    startingPriceIdr: 2_000_000,
    pricingStatus: "indicative",
    title: "Bunaken Marine Adventure",
    shortTitle: "Bunaken National Marine Park",
    description: "Cruise to Bunaken for snorkeling, coral reefs and a relaxed island day.",
    overview: "Cruise across the Sulawesi Sea to Bunaken National Marine Park. Discover coral reefs and tropical marine life while snorkeling, then unwind on the island with a local guide.",
    image: "/images/wale/bunaken.png",
    imageAlt: "Sea turtle above a coral reef in Bunaken National Marine Park",
    highlights: ["Bunaken National Marine Park", "Boat Transfer", "Snorkeling Experience", "Coral Reefs", "Tropical Marine Life", "Island Relaxation"],
    stages: [
      { title: "Across the Sulawesi Sea", description: "Travel by boat from Manado toward Bunaken National Marine Park and its island scenery.", image: "/images/wale/bunaken.png", alt: "Sea turtle above a coral reef in Bunaken National Marine Park" },
      { title: "Reef and island time", description: "Snorkel among coral reefs and tropical marine life, then relax on the island with your local guide.", image: "/images/wale/gallery-reef.png", alt: "Coral reef and marine life near Bunaken" },
    ],
    included: ["Boat transportation", "Snorkeling equipment", "Lunch", "Bottled water", "Local guide"],
    excluded: ["Diving activities", "Personal expenses", "Alcoholic beverages", "Tips"],
    serviceAreas: ["Manado", "Tomohon", "Tangkoko area"],
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Waterproof phone case", "Sunglasses", "Extra clothes", "Personal medication if needed"],
    pickup: "08:00 or 08:30",
    duration: "8 hours",
  },
];

const customTourData = [
  { slug: "lembeh", destination: "Lembeh", region: "North Sulawesi", startingPriceIdr: 2_000_000, image: "/images/bunaken_image_beach_4450.webp", imageAlt: "North Sulawesi coastline, a regional illustration for a Lembeh custom tour" },
  { slug: "likupang", destination: "Likupang", region: "North Sulawesi", startingPriceIdr: 2_000_000, image: "/images/bunaken_image_beach_4450.webp", imageAlt: "North Sulawesi coastline, a regional illustration for a Likupang custom tour" },
  { slug: "bira", destination: "Bira", region: "South Sulawesi", startingPriceIdr: 5_000_000, image: "/images/tanjungbira_image_beach_4553.webp", imageAlt: "Beach scenery in Bira, South Sulawesi" },
  { slug: "rammang-rammang", destination: "Rammang Rammang", region: "South Sulawesi", startingPriceIdr: 2_000_000, image: "/images/maros_image_landscape_3584.webp", imageAlt: "Landscape in Maros, a regional illustration for a Rammang Rammang custom tour" },
  { slug: "tana-toraja", destination: "Tana Toraja", region: "South Sulawesi", startingPriceIdr: 5_000_000, image: "/images/mamasa_image_landscape_3560.webp", imageAlt: "Highland scenery in Mamasa, a landscape illustration for a Tana Toraja custom tour" },
  { slug: "banggai-archipelago", destination: "Banggai Archipelago", region: "Central Sulawesi", startingPriceIdr: 5_000_000, image: "/images/banggai_image_landscape_4462.webp", imageAlt: "Landscape in the Banggai Archipelago, Central Sulawesi" },
  { slug: "lake-poso", destination: "Lake Poso", region: "Central Sulawesi", startingPriceIdr: 2_000_000, image: "/images/banggai_image_landscape_4462.webp", imageAlt: "Banggai landscape, a Central Sulawesi illustration for a Lake Poso custom tour" },
  { slug: "luwuk", destination: "Luwuk", region: "Central Sulawesi", startingPriceIdr: 2_000_000, image: "/images/banggai_image_landscape_4462.webp", imageAlt: "Banggai landscape, a Central Sulawesi illustration for a Luwuk custom tour" },
  { slug: "togean", destination: "Togean", region: "Central Sulawesi", startingPriceIdr: 5_000_000, image: "/images/togean_image_landscape_4372.webp", imageAlt: "Island scenery in Togean, Central Sulawesi" },
  { slug: "gorontalo", destination: "Gorontalo", region: "Gorontalo", startingPriceIdr: 2_000_000, image: "/images/gorontalo_image_landscape_4562.webp", imageAlt: "Coastal scenery in Gorontalo" },
] as const;

const customTours: Tour[] = customTourData.map((tour) => ({
  ...tour,
  kind: "custom",
  pricingStatus: "indicative",
  title: `${tour.destination} Custom Tour`,
  shortTitle: tour.destination,
  description: `Plan a private visit to ${tour.destination} around your dates, interests and group.`,
  overview: `Plan a custom visit to ${tour.destination} in ${tour.region}. Share your travel dates, group size and interests with Wale Adventure. Our team will confirm availability, itinerary, transportation, pickup arrangements and inclusions before you book.`,
  highlights: [tour.destination, tour.region, "Custom itinerary", "Personal trip planning"],
}));
const tourOrder = ["bunaken", "minahasa-highlands", "tangkoko", ...customTourData.map((tour) => tour.slug)];
export const tours: Tour[] = [...featuredTours, ...customTours].sort((first, second) => tourOrder.indexOf(first.slug) - tourOrder.indexOf(second.slug));
export const destinations = tours.map((tour) => ({ slug: tour.slug === "minahasa-highlands" ? "tomohon" : tour.slug, title: tour.title, region: tour.region, description: tour.description, image: tour.image, alt: tour.imageAlt, tourSlug: tour.slug }));
export const featuredDestinations = featuredTours.map((tour) => ({ title: tour.shortTitle, description: tour.description, image: tour.image, alt: tour.imageAlt, tourSlug: tour.slug }));

export const faq = [
  { question: "What destinations do you offer?", answer: "Explore Bunaken, Tomohon, Tangkoko, Lembeh and Likupang in North Sulawesi; Bira, Rammang Rammang and Tana Toraja in South Sulawesi; Banggai Archipelago, Lake Poso, Luwuk and Togean in Central Sulawesi; and Gorontalo. Contact us to confirm availability and plan your itinerary." },
  { question: "Can I request a private or customized tour?", answer: "Yes. Wale Adventure can tailor a private itinerary to your schedule, interests and budget." },
  { question: "Do you provide airport transfers?", answer: "Yes. Wale Adventure offers pickup and drop-off at Sam Ratulangi International Airport in Manado. Confirm transfer arrangements for your chosen tour with our team." },
  { question: "Is the tour available in English?", answer: "The local guides communicate in English and assist international travelers." },
  { question: "What's included in the tour package?", answer: "Inclusions differ by tour. Our Bunaken, Tangkoko and Minahasa Highlands pages list their current package details. For custom tours, transportation, guides, meals, equipment and entrance fees are confirmed with your itinerary before booking." },
  { question: "How can I book a tour?", answer: "Send Wale Adventure your preferred destination and travel date on WhatsApp. The team will confirm availability, itinerary details and a quotation." },
];

export const gallery = [
  { src: "/images/wale/hero.png", alt: "Travelers exploring local culture in North Sulawesi" },
  { src: "/images/wale/tangkoko-tarsier.jpg", alt: "Tarsier in Tangkoko Nature Reserve" },
  { src: "/images/wale/tangkoko-wildlife.png", alt: "Tangkoko rainforest and wildlife" },
  { src: "/images/wale/minahasa.png", alt: "Travelers with a local guide beside a lake in the Minahasa Highlands" },
  { src: "/images/wale/gallery-linow.png", alt: "Visitors at a Minahasa highland attraction" },
  { src: "/images/wale/bunaken.png", alt: "Sea turtle above a coral reef in Bunaken National Marine Park" },
  { src: "/images/wale/gallery-reef.png", alt: "Traveler snorkeling above a coral reef in Bunaken" },
  { src: "/images/wale/tangkoko-macaques.png", alt: "Black-crested macaques in Tangkoko rainforest" },
];

export function photosForTour(slug: string) {
  const byTour: Record<string, string[]> = {
    "minahasa-highlands": ["/images/wale/minahasa.png", "/images/wale/gallery-linow.png", "/images/wale/hero.png"],
    tangkoko: ["/images/wale/tangkoko-tarsier.jpg", "/images/wale/tangkoko-wildlife.png", "/images/wale/tangkoko-macaques.png"],
    bunaken: ["/images/wale/bunaken.png", "/images/wale/gallery-reef.png"],
  };
  const tour = tours.find((item) => item.slug === slug);
  return byTour[slug] ? gallery.filter((photo) => byTour[slug].includes(photo.src)) : tour ? [{ src: tour.image, alt: tour.imageAlt }] : [];
}

export const navigation = [
  ["About", "/about"], ["Tours", "/tours"], ["Destinations", "/destinations"], ["Gallery", "/gallery"], ["FAQ", "/faq"], ["Contact", "/contact"],
] as const;

export const metadataContent = {
  title: "Wale Adventure | Private Tours Across Sulawesi",
  description: "Explore North, South and Central Sulawesi and Gorontalo with Wale Adventure. Discover private tours and plan a custom itinerary with personal support.",
  image: "/images/wale/hero.png",
};

const tourFeatures = tours.map((tour) => ({ title: tour.destination === "Tomohon" ? tour.shortTitle : tour.title, path: `/tours/${tour.slug}`, image: tour.image, description: tour.description, region: tour.region }));
const destinationFeatures = destinations.map((destination) => ({ title: destination.title, path: `/destinations/${destination.slug}`, image: destination.image, description: destination.description, region: destination.region }));

export const navigationMenus = {
  tours: {
    all: { label: "All Wale Adventure tours", path: "/tours" },
    labels: regions,
    panels: [{ links: [], features: tourFeatures.slice(0, 3) }, ...regions.map((region) => ({ links: tourFeatures.filter((feature) => feature.region === region).map((feature) => ({ label: feature.title, path: feature.path })), features: tourFeatures.filter((feature) => feature.region === region).slice(0, 1) }))],
  },
  destinations: {
    all: { label: "Discover Sulawesi", path: "/destinations" },
    labels: regions,
    panels: [{ links: [], features: destinationFeatures.slice(0, 3) }, ...regions.map((region) => ({ links: destinationFeatures.filter((feature) => feature.region === region).map((feature) => ({ label: feature.title, path: feature.path })), features: destinationFeatures.filter((feature) => feature.region === region).slice(0, 1) }))],
  },
};
