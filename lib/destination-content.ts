import { destinations, photosForTour, tours } from "@/lib/wale-content";

const profiles: Record<string, {
  subtitle: string;
  stay: string;
  bases: string[];
  visits: string[];
  story: string;
}> = {
  bunaken: {
    subtitle: "Coral reefs & island life",
    stay: "1–2 days",
    bases: ["Bunaken Island", "Manado"],
    visits: ["Snorkeling spots", "Coral reefs", "Island time", "Marine wildlife"],
    story: "A little time on the water, a closer look at the reef, and a slower afternoon on the island. Shape a Bunaken visit around the marine experiences that interest you.",
  },
  tomohon: {
    subtitle: "Volcanic landscapes & highland culture",
    stay: "A day trip",
    bases: ["Tomohon", "Manado"],
    visits: ["Mount Mahawu", "Lake Linow", "Highland culture", "Local flavors"],
    story: "Make room for volcanic views, lakeside scenery and a local lunch. Tomohon and the Minahasa Highlands bring nature and everyday culture into the same journey.",
  },
  tangkoko: {
    subtitle: "Rainforest trails & endemic wildlife",
    stay: "A day trip",
    bases: ["Batuputih", "Bitung"],
    visits: ["Forest walk", "Black-crested macaques", "Tarsiers", "Bird watching"],
    story: "Spend time in the forest with a local guide and let the wildlife set the pace. Animals are wild, so sightings and the best route cannot be guaranteed.",
  },
  lembeh: {
    subtitle: "Marine discoveries & coastal scenery",
    stay: "2–3 days",
    bases: ["Lembeh Island", "Bitung"],
    visits: ["Marine discoveries", "Island scenery", "Coastal viewpoints", "A local boat trip"],
    story: "Use Lembeh as the starting point for a marine-focused itinerary. Discuss your interests and experience with the team before choosing activities and local arrangements.",
  },
  likupang: {
    subtitle: "Coastal landscapes & unhurried days",
    stay: "1–2 days",
    bases: ["Likupang", "Manado"],
    visits: ["Coastal landscapes", "Beach time", "Island views", "Village surroundings"],
    story: "Leave time for the coast instead of filling every hour. A Likupang itinerary can begin with the places you want to see, then take shape around your travel dates.",
  },
  bira: {
    subtitle: "Beach scenery & coastal journeys",
    stay: "2–3 days",
    bases: ["Bira", "Bulukumba"],
    visits: ["Beach scenery", "Coastal viewpoints", "Island time", "Local culture"],
    story: "Plan a few unhurried days around Bira. Share your preferred pace, interests and travel dates to work out which coastal stops belong in your route.",
  },
  "rammang-rammang": {
    subtitle: "Karst landscapes & village scenery",
    stay: "A day trip",
    bases: ["Maros", "Makassar"],
    visits: ["Karst landscapes", "River journey", "Village scenery", "Photo stops"],
    story: "An itinerary built around scenery leaves time to stop and look. Consider Rammang Rammang for a slower part of a South Sulawesi journey.",
  },
  "tana-toraja": {
    subtitle: "Highland landscapes & living culture",
    stay: "3–4 days",
    bases: ["Rantepao", "Makale"],
    visits: ["Tongkonan houses", "Highland scenery", "Local culture", "Village visits"],
    story: "Give Tana Toraja time in your itinerary. Discuss cultural visits with a local guide, respect local customs, and confirm which places are suitable for your trip.",
  },
  "banggai-archipelago": {
    subtitle: "Lake Paisupok & island landscapes",
    stay: "5–7 days",
    bases: ["Salakan", "Luwuk"],
    visits: ["Lake Paisupok", "Island landscapes", "Clear-water scenery", "Local discovery"],
    story: "Think in island days rather than a long checklist. The sample Banggai route leaves room for scenery and local discovery, with transport and access confirmed before booking.",
  },
  "lake-poso": {
    subtitle: "Lakeside scenery & a slower pace",
    stay: "2–3 days",
    bases: ["Tentena", "Poso"],
    visits: ["Lakeside scenery", "Village surroundings", "Lake viewpoints", "Slow travel"],
    story: "Build a Lake Poso visit around time beside the lake. Bring your interests and preferred pace to the planning conversation rather than committing to an unconfirmed schedule.",
  },
  luwuk: {
    subtitle: "Coastal views & onward exploration",
    stay: "1–2 days",
    bases: ["Luwuk", "Luwuk coast"],
    visits: ["Coastal scenery", "Scenic viewpoints", "Town discovery", "Onward exploration"],
    story: "Make Luwuk part of a considered Central Sulawesi route. Discuss your onward plans early so the team can help confirm practical travel arrangements.",
  },
  togean: {
    subtitle: "Island scenery & reef discoveries",
    stay: "4–6 days",
    bases: ["Wakai", "Kadidiri"],
    visits: ["Island scenery", "Reef discoveries", "Beach time", "Boat journeys"],
    story: "Allow some breathing room for an island journey. Togean planning starts with your travel dates and interests; boats, activities and stays need individual confirmation.",
  },
  gorontalo: {
    subtitle: "Coastal landscapes & local discoveries",
    stay: "1–2 days",
    bases: ["Gorontalo City", "Gorontalo coast"],
    visits: ["Coastal landscapes", "Local flavors", "City discoveries", "Nature escapes"],
    story: "Leave space for local discoveries in Gorontalo. A sample itinerary is a starting point, not a fixed package: ask about the options that suit your dates and group.",
  },
};

export const destinationDetails = destinations.map((destination) => {
  const tour = tours.find((item) => item.slug === destination.tourSlug)!;
  const profile = profiles[destination.slug];
  const regionalPhotos = destinations.filter((item) => item.region === destination.region).map((item) => ({ src: item.image, alt: item.alt }));
  const photos = tour.kind === "scheduled" ? photosForTour(destination.tourSlug) : [...new Map([...photosForTour(destination.tourSlug), ...regionalPhotos].map((photo) => [photo.src, photo])).values()];
  return {
    ...destination,
    ...profile,
    tour,
    photos,
    notes: [
      { title: "Make room for discovery", text: `The sample visit ideas cover ${profile.visits.slice(0, 2).join(" and ").toLowerCase()}. Use them to start a conversation about what you want to see, rather than as a confirmed schedule.` },
      { title: "A route shaped around you", text: `Use ${destination.title} as a starting point. Share your interests, available time and group size, then confirm the itinerary with Wale Adventure.` },
      { title: "Plan the practical details first", text: "Confirm transport, local access, activities and accommodation before booking. Sample visit ideas are not confirmed inclusions or a promise of availability." },
    ],
    nearby: destinations.filter((item) => item.slug !== destination.slug && item.region === destination.region).slice(0, 2),
  };
});

export type DestinationDetail = typeof destinationDetails[number];
