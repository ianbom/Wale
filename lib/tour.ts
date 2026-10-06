export const title = "2D1N Tangkoko Nature Reserve Overnight Wildlife Safari";
export const description = "Immersive 2-day jungle expedition featuring afternoon and early-morning wildlife treks in Tangkoko.";
export const overview = "Experience Tangkoko Nature Reserve across two distinct wildlife activity windows on an overnight safari. Track troops of Sulawesi black crested macaques, bear cuscus, and nocturnal tarsiers at dusk, then wake for an early-morning canopy trek to spot rare endemic birds and early-rising primates";
export const bookUrl = `https://wa.me/6282339685972?text=${encodeURIComponent(`Hello! I would like to book the ${title}. Could you send me the next steps?\n\n[ref: en/tour/2d1n-tangkoko-nature-reserve-overnight-wildlife-safari]`)}`;
export const contactUrl = `https://wa.me/6282339685972?text=${encodeURIComponent("Hello! I have a question about travelling in Sulawesi.\n\n[ref: en/tour/2d1n-tangkoko-nature-reserve-overnight-wildlife-safari]")}`;

export const stops = [
  "Manado / Bitung Pick-up, Scenic Overland Drive, Tangkoko Lodge Check-in, Late Afternoon & Dusk Tarsier Trek",
  "Early Morning Wildlife Canopy Trek, Breakfast, Return Transfer to Manado",
];

export const days = [
  {
    title: "Departure to Tangkoko, Afternoon Macaque Search & Dusk Tarsier Encounter",
    description: "12:00 PM pick-up from your hotel in Manado or Bitung and enjoy a scenic 2-hour drive through small villages toward the reserve.",
    more: 4,
    image: "/images/tangkoko_image_landscape_3612.webp",
    thumbnails: [4339, 4333, 4327, 4323, 4319].map((number) => `/images/tangkoko_image_animal_${number}.webp`),
  },
  {
    title: "Early Morning Forest Trek & Return Transfer",
    description: "Wake up early (around 5:00 AM) for a morning trek when the forest is most active.",
    more: 3,
    image: "/images/tangkoko_image_landscape_3611.webp",
    thumbnails: [4327, 4323, 4319, 4315].map((number) => `/images/tangkoko_image_animal_${number}.webp`).concat("/images/tangkoko_image_landscape_3615.webp"),
  },
];

export const gallery = [
  "landscape_4598", "animal_4339", "animal_4333", "animal_4327", "animal_4323",
  "animal_4319", "animal_4315", "landscape_3615", "landscape_3609", "landscape_3610",
  "landscape_4073", "landscape_4602", "landscape_4601", "landscape_4600", "landscape_4599",
  "landscape_4594", "landscape_4593", "landscape_4595", "landscape_4596", "beach_4597",
].map((name) => `/images/tangkoko_image_${name}.webp`);

export const faq = [
  {
    question: "Why choose the 2-day tour over the 1-day tour?",
    answer: "Animals in Tangkoko have different activity patterns. The 1-day tour focuses on late afternoon wildlife and dusk tarsiers. The overnight 2-day option adds an early morning trek when black macaques are most active near the beach and birdlife is easiest to spot in the canopy.",
  },
  {
    question: "What accommodation options are available?",
    answer: "Standard packages use comfortable local cottages such as Tangkoko Hill Cottage. Upgraded stays (such as Tangkoko Sanctuary or Bobocha Luxury Villa) are also available upon request.",
  },
];

export const prices = [
  { label: "Twin share", description: "Per person, two sharing a room", price: "€165" },
  { label: "Solo traveller", description: "Per person, room to yourself", price: "€209" },
  { label: "Private departure", description: "Your own group, your own dates", price: "On request" },
];

export const included = [
  "Pick-up and drop-off transfers in private AC vehicle (Manado or Bitung)",
  "1 night accommodation in a local lodge/cottage near Tangkoko Reserve",
  "All meals as specified (Lunch on Day 1 through Breakfast on Day 2)",
  "National park entrance fees and local ranger/guide fees",
  "Professional English-speaking wildlife guide",
  "Complimentary Tangkoko pocket guide and reusable stainless steel water tumbler",
];
export const excluded = [
  "Camera/video camera permits (if applicable)", "Personal expenses, snacks, and alcoholic beverages",
  "Personal travel insurance", "Tips for guide, park ranger, and driver",
];

export const recommendations = [
  { title: "3D2N Manado Highland & Island Escape", description: "Experience the perfect mix of high-altitude volcanic landscapes and vibrant underwater ocean life in North Sulawesi.", price: "€180", image: "/images/minahasa_image_landscape_3587.webp", path: "/en/tc5w085ul" },
  { title: "3D2N Makassar & Maros Highlights Tour", description: "Discover historic 17th-century fortresses, towering karst mountains, ancient caves, and coastal sunsets in South Sulawesi.", price: "€304", image: "/images/maros_image_landscape_3584.webp", path: "/en/8hfk7bizm" },
  { title: "Bunaken & North Sulawesi Flexible Dive Resort Escape", description: "Immerse yourself in world-class marine life and full-board resort relaxation across Bunaken National Park and North Sulawesi", price: "€388", image: "/images/bunaken_image_beach_4450.webp", path: "/en/erxczfg95" },
];
