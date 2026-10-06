import assert from "node:assert/strict";
import { access } from "node:fs/promises";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const pages = ["/", "/tours", "/tours/minahasa-highlands", "/tours/tangkoko", "/tours/bunaken", "/about", "/destinations", "/gallery", "/faq", "/contact"];
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
  console.log(`${path}: content, metadata, contacts, assets passed`);
}
for (const [from, to] of [["/en/703qix0x6", "/tours/tangkoko"], ["/tomohon-tour", "/tours/minahasa-highlands"], ["/tangkoko-tour", "/tours/tangkoko"], ["/bunaken-tour", "/tours/bunaken"]]) {
  const response = await fetch(`${origin}${from}`, { redirect: "manual" });
  assert.equal(response.status, 308, `${from}: permanent redirect`);
  assert.equal(new URL(response.headers.get("location"), origin).pathname, to);
}
console.log("Legacy redirects passed");
console.log(`${checkedLinks.size} internal links passed`);
