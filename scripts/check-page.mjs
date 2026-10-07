import assert from "node:assert/strict";
import { access } from "node:fs/promises";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const regions = {
  "North Sulawesi": ["Bunaken", "Tomohon", "Tangkoko", "Lembeh", "Likupang"],
  "South Sulawesi": ["Bira", "Rammang Rammang", "Tana Toraja"],
  "Central Sulawesi": ["Banggai Archipelago", "Lake Poso", "Luwuk", "Togean"],
  Gorontalo: ["Gorontalo"],
};
const tourSlugs = ["bunaken", "minahasa-highlands", "tangkoko", "lembeh", "likupang", "bira", "rammang-rammang", "tana-toraja", "banggai-archipelago", "lake-poso", "luwuk", "togean", "gorontalo"];
const destinationSlugs = tourSlugs.map((slug) => slug === "minahasa-highlands" ? "tomohon" : slug);
const destinationTitles = ["Bunaken Marine Adventure", "Minahasa Highlands Experience", "Tangkoko Wildlife Adventure", "Lembeh Custom Tour", "Likupang Custom Tour", "Bira Custom Tour", "Rammang Rammang Custom Tour", "Tana Toraja Custom Tour", "Banggai Archipelago Custom Tour", "Lake Poso Custom Tour", "Luwuk Custom Tour", "Togean Custom Tour", "Gorontalo Custom Tour"];
const startingPrices = [2_000_000, 1_000_000, 1_500_000, 2_000_000, 2_000_000, 5_000_000, 2_000_000, 5_000_000, 5_000_000, 2_000_000, 2_000_000, 5_000_000, 2_000_000];
const pages = ["/", "/tours", ...tourSlugs.map((slug) => `/tours/${slug}`), "/about", "/destinations", "/gallery", "/faq", "/contact", ...destinationSlugs.map((slug) => `/destinations/${slug}`)];
const checkedLinks = new Set();
for (const path of pages) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  const html = await response.text();
  for (const text of ["Wale Adventure", "Tangkoko Wildlife Adventure", "Minahasa Highlands Experience", "Bunaken Marine Adventure", "info@waleadventure.com"]) assert.ok(html.includes(text), `${path}: missing ${text}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert.ok(html.includes('name="description"'), `${path}: description`);
  assert.ok(html.includes('rel="canonical"'), `${path}: canonical`);
  assert.ok(html.includes('property="og:image"'), `${path}: Open Graph image`);
  assert.ok(html.includes("https://wa.me/6285111236875"), `${path}: correct WhatsApp`);
  for (const [, href] of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) {
    const url = new URL(href.replaceAll("&amp;", "&"));
    assert.equal(url.pathname, "/6285111236875");
    assert.ok(url.searchParams.get("text")?.startsWith("Hello Wale Adventure"), `${path}: encoded WhatsApp message`);
    if (path.startsWith("/tours/") && url.searchParams.get("text")?.includes("interested in the")) assert.ok(url.searchParams.get("text").includes("travel dates and group size"), `${path}: tour booking requests dates and group size`);
  }
  assert.ok(!/sulawesi\.(com|travel)|6282339685972|€165|€209|2D1N/.test(html), `${path}: no old business content`);
  for (const [, source] of html.matchAll(/src="([^"]+)"/g)) {
    const asset = new URL(source.replaceAll("&amp;", "&"), origin);
    const original = asset.searchParams.get("url") || asset.pathname;
    if (original.startsWith("/images/")) {
      await access(`public${original}`);
      assert.equal((await fetch(asset)).status, 200, `${path}: ${asset.pathname}`);
    }
  }
  for (const [, href] of html.matchAll(/href="(\/(?!\/)[^"]*)"/g)) {
    const target = new URL(href.replaceAll("&amp;", "&"), origin);
    const targetPath = target.pathname;
    if (targetPath.startsWith("/_next/") || checkedLinks.has(targetPath)) continue;
    checkedLinks.add(targetPath);
    assert.ok((await fetch(target)).ok, `${path}: broken internal link ${targetPath}`);
  }
  if (path === "/") {
    assert.ok(html.includes("Explore North Sulawesi With Local Experts"));
    assert.ok(html.includes("Our Story, Your Adventure"));
    assert.ok(html.includes("Experiences in detail"));
    assert.ok(html.includes('"@type":"TravelAgency"'));
  }
  if (path === "/tours/tangkoko") {
    assert.ok(html.includes("06:00–07:00") && html.includes("6–7 hours"));
    assert.ok(html.includes("Meals"));
    assert.ok(!/dusk|overnight|accommodation/i.test(html.replace(/<script\b[\s\S]*?<\/script>/g, "")));
  }
  if (path === "/tours" || path === "/destinations") {
    for (const [region, destinations] of Object.entries(regions)) {
      assert.ok(html.includes(region), `${path}: missing region ${region}`);
      for (const destination of destinations) assert.ok(html.includes(destination), `${path}: missing destination ${destination}`);
    }
    assert.equal((html.match(/Starting from/g) || []).length, 13, `${path}: indicative price for each card`);
  }
  if (path === "/destinations") {
    for (const slug of destinationSlugs) assert.ok(html.includes(`href="/destinations/${slug}"`), `${path}: destination-specific link ${slug}`);
    const catalog = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || "";
    const cards = [...catalog.matchAll(/<a\b[^>]*href="\/destinations\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    for (const [index, slug] of destinationSlugs.entries()) {
      assert.ok(cards.some((card) => card[1] === slug && card[2].includes(`>${destinationTitles[index]}<`)), `${path}: full destination card title for ${slug}`);
    }
  }
  if (path.startsWith("/destinations/")) {
    for (const section of ["overview", "trips", "best-visits", "visitors-say", "where-to-stay", "plan-visit"]) {
      assert.ok(html.includes(`id="${section}"`), `${path}: section ${section}`);
      assert.ok(html.includes(`href="#${section}"`), `${path}: section navigation ${section}`);
    }
    assert.ok(html.includes("Sample content"), `${path}: illustrative content clearly labelled`);
    assert.ok(html.includes("not a customer review"), `${path}: no fictional review presented as real`);
    assert.ok(html.includes(`rel="canonical" href="https://waleadventure.com${path}"`), `${path}: destination canonical`);
    const tourSlug = path.endsWith("/tomohon") ? "minahasa-highlands" : path.split("/").at(-1);
    const destinationSlug = path.split("/").at(-1);
    const destinationTitle = destinationTitles[destinationSlugs.indexOf(destinationSlug)];
    assert.equal(html.match(/<h1\b[^>]*>([^<]+)<\/h1>/)?.[1], destinationTitle, `${path}: full destination heading`);
    assert.ok(html.includes(`aria-current="page">${destinationTitle}</li>`), `${path}: full destination breadcrumb`);
    assert.ok(html.includes(`<title>${destinationTitle} | Wale Adventure</title>`), `${path}: full destination metadata title`);
    assert.ok(html.includes(`"name":"${destinationTitle}"`), `${path}: full destination structured-data name`);
    const destinationRegion = Object.entries(regions).find(([, names]) => names.some((name) => name.toLowerCase().replaceAll(" ", "-") === destinationSlug))?.[0];
    assert.ok(destinationRegion && html.includes(`href="/destinations#${destinationRegion.toLowerCase().replaceAll(" ", "-")}"`), `${path}: breadcrumb links to its catalog region`);
    assert.ok(html.includes(`href="/tours/${tourSlug}"`), `${path}: related tour retains its route`);
    assert.ok(!html.includes('"@type":"AggregateRating"'), `${path}: no sample reviews in structured data`);
  }
  if (path.startsWith("/tours/") && tourSlugs.some((slug) => path.endsWith(slug))) {
    const tourIndex = tourSlugs.indexOf(path.split("/").at(-1));
    assert.match(html, /Starting from[\s\S]{0,200}IDR\s[\d,.]+/i, `${path}: starting price`);
    assert.ok(html.includes(`IDR ${startingPrices[tourIndex].toLocaleString("en-US")}`), `${path}: correct starting price`);
    assert.ok(html.includes("Final price depends on group size"), `${path}: indicative price disclaimer`);
    assert.ok(!html.includes('"@type":"Offer"'), `${path}: no official price offer schema`);
    if (tourIndex >= 3) {
      assert.ok(html.includes("Plan your custom tour"), `${path}: custom tour detail`);
      assert.ok(!html.includes("Pickup time"), `${path}: no invented pickup time`);
    }
  }
  console.log(`${path}: content, metadata, contacts, assets passed`);
}
for (const [from, to] of [["/en/703qix0x6", "/tours/tangkoko"], ["/tomohon-tour", "/tours/minahasa-highlands"], ["/tangkoko-tour", "/tours/tangkoko"], ["/bunaken-tour", "/tours/bunaken"]]) {
  const response = await fetch(`${origin}${from}`, { redirect: "manual" });
  assert.equal(response.status, 308, `${from}: permanent redirect`);
  assert.equal(new URL(response.headers.get("location"), origin).pathname, to);
}
console.log("Legacy redirects passed");
assert.equal((await fetch(`${origin}/tours/not-a-tour`)).status, 404, "Unknown tour returns 404");
assert.equal((await fetch(`${origin}/destinations/not-a-destination`)).status, 404, "Unknown destination returns 404");
console.log(`${checkedLinks.size} internal links passed`);
