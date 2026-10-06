import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const origin = process.env.TEST_ORIGIN || "http://localhost:3000";
const heading = "2D1N Tangkoko Nature Reserve Overnight Wildlife Safari";
for (const path of ["/", "/en/703qix0x6"]) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path} must return 200`);
  const html = await response.text();
  assert.ok(html.includes(`<title>${heading} | Sulawesi.com</title>`), "Page title must render");
  assert.ok(html.includes('name="description"'), "Page description must render");
  for (const text of [heading, "About this tour", "Tour highlights", "Itinerary in detail", "Dates and prices", "Questions about this trip", "Need more inspiration?", "welcome@sulawesi.com"]) {
    assert.ok(html.includes(text), `${path}: missing ${text}`);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one H1");
  assert.ok(html.includes("Why choose the 2-day tour over the 1-day tour?"), "First FAQ must render");
  assert.ok(html.includes("What accommodation options are available?"), "Second FAQ must render");
  assert.ok(html.includes("€165") && html.includes("€209"), "Both price options must render");
  const sources = [...html.matchAll(/src="([^"]+)"/g)].map((match) => match[1]);
  for (const source of sources) {
    const asset = new URL(source.replaceAll("&amp;", "&"), origin);
    const original = asset.searchParams.get("url") || asset.pathname;
    if (original.startsWith("/images/")) await access(`public${original}`);
  }
  console.log(`${path}: content, metadata, FAQ and image checks passed`);
}
const navigationSource = await readFile("lib/navigation.ts", "utf8");
for (const asset of navigationSource.matchAll(/"image":\s*"([^"]+)"/g)) await access(`public${asset[1]}`);
console.log("Navigation asset checks passed");
