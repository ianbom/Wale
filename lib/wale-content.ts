export const brand = {
  name: "Wale Adventure",
  tagline: "Explore North Sulawesi With Confidence",
  description: "Private North Sulawesi tours with local guides, flexible itineraries and personal support.",
  email: "info@waleadventure.com",
  phone: "6285111236875",
  displayPhone: "+62 851 1123 6875",
  instagram: "https://www.instagram.com/waleadventure/",
  facebook: "https://www.facebook.com/profile.php?id=61581552816499",
  location: "North Sulawesi, Indonesia",
  logo: "/images/wale/logo.png",
};

export const whatsappUrl = (message = "Hello Wale Adventure, I'm interested in planning a North Sulawesi tour.") =>
  `https://wa.me/${brand.phone}?text=${encodeURIComponent(message)}`;

export type Tour = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  overview: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  stages: { title: string; description: string; image: string; alt: string }[];
  included: string[];
  excluded: string[];
  serviceAreas: string[];
  whatToBring: string[];
  pickup: string;
  duration: string;
};

export const tours: Tour[] = [
  {
    slug: "minahasa-highlands",
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

export const destinations = [
  { title: "Tangkoko Nature Reserve", description: "Meet tarsiers, black-crested macaques, hornbills and other wildlife in tropical rainforest.", image: "/images/wale/tangkoko-tarsier.jpg", alt: "Tarsier in Tangkoko Nature Reserve", tour: tours[1] },
  { title: "Tomohon Highlands", description: "Explore volcanoes, highland scenery, traditional markets and local cuisine.", image: "/images/wale/minahasa.png", alt: "Tomohon and Minahasa highland scenery", tour: tours[0] },
  { title: "Bunaken Marine Park", description: "Snorkel clear waters above coral reefs among tropical marine life and sea turtles.", image: "/images/wale/bunaken.png", alt: "Bunaken marine scenery and coral reef", tour: tours[2] },
];

export const faq = [
  { question: "What destinations do you offer?", answer: "Tours include Bunaken Marine Park, Tangkoko Nature Reserve, Tomohon and the Minahasa Highlands. Lembeh Strait and other North Sulawesi destinations can also be discussed when planning your trip." },
  { question: "Can I request a private or customized tour?", answer: "Yes. Wale Adventure can tailor a private itinerary to your schedule, interests and budget." },
  { question: "Do you provide airport transfers?", answer: "Yes. Wale Adventure offers pickup and drop-off at Sam Ratulangi International Airport in Manado. Confirm transfer arrangements for your chosen tour with our team." },
  { question: "Is the tour available in English?", answer: "The local guides communicate in English and assist international travelers." },
  { question: "What's included in the tour package?", answer: "Inclusions differ by tour. Each experience lists its transportation, guide, entrance fees, meals and equipment details; message us to confirm your chosen itinerary." },
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
  return gallery.filter((photo) => byTour[slug]?.includes(photo.src));
}

export const navigation = [
  ["About", "/about"], ["Tours", "/tours"], ["Destinations", "/destinations"], ["Gallery", "/gallery"], ["FAQ", "/faq"], ["Contact", "/contact"],
] as const;

export const metadataContent = {
  title: "Wale Adventure | Private Tours in North Sulawesi",
  description: "Explore Tangkoko, Bunaken, Tomohon and the Minahasa Highlands with Wale Adventure. Private tours, local guides and personal service in North Sulawesi.",
  image: "/images/wale/hero.png",
};

const tourFeatures = tours.map((tour) => ({ title: tour.title, path: `/tours/${tour.slug}`, image: tour.image, description: tour.description }));
const destinationFeatures = destinations.map((destination) => ({ title: destination.title, path: `/tours/${destination.tour.slug}`, image: destination.image, description: destination.description }));

export const navigationMenus = {
  tours: {
    all: { label: "All Wale Adventure tours", path: "/tours" },
    labels: tours.map((tour) => tour.title),
    panels: [{ links: [], features: tourFeatures }, ...tourFeatures.map((feature) => ({ links: [{ label: feature.title, path: feature.path }, { label: "Frequently asked questions", path: "/faq" }, { label: "Contact our local team", path: "/contact" }], features: [feature] }))],
  },
  destinations: {
    all: { label: "Discover North Sulawesi", path: "/destinations" },
    labels: destinations.map((destination) => destination.title),
    panels: [{ links: [], features: destinationFeatures }, ...destinationFeatures.map((feature) => ({ links: [{ label: feature.title, path: feature.path }, { label: "Plan your adventure", path: "/contact" }], features: [feature] }))],
  },
};
