// Check the actual HTTP responses, including metadata as served to Twitterbot.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import next from "next";
import { parse } from "parse5";
import robotsParser from "robots-parser";
import sharp from "sharp";

const production = "https://www.dougantin.ai";
const agent = "Twitterbot/1.0";

async function checkSite(origin) {
  const imageOrigins = new Set([production]);
  // Next assigns its file-based images to the branch hostname on Vercel preview builds.
  const previewHost = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (origin !== production && process.env.VERCEL_ENV === "preview" && previewHost) {
    imageOrigins.add("https://" + previewHost);
  }
  async function get(url) {
    const target = new URL(url, production);
    assert.ok(imageOrigins.has(target.origin), `Unexpected share hostname: ${target.href}`);
    const response = await fetch(new URL(target.pathname + target.search, origin), {
      headers: { "User-Agent": agent },
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, `${target.href} returned HTTP ${response.status}`);
    return response;
  }

  const robots = robotsParser(production + "/robots.txt", await (await get("/robots.txt")).text());
  const sitemap = await (await get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll("&amp;", "&"));
  assert.ok(urls.length, "The sitemap has no public pages");
  const images = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, production, url);
    assert.notEqual(robots.isAllowed(url, "Twitterbot"), false, `robots.txt blocks ${url}`);
    const html = await (await get(url)).text();
    const head = parse(html).childNodes.find(node => node.tagName === "html")?.childNodes.find(node => node.tagName === "head");
    const tags = new Map();
    for (const node of head?.childNodes ?? []) {
      if (node.tagName !== "meta") continue;
      const attrs = Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
      const key = attrs.name ?? attrs.property;
      if (["twitter:image", "twitter:card"].includes(key)) assert.ok(!tags.has(key), `${url}: duplicate ${key}`);
      tags.set(key, attrs.content);
    }
    assert.equal(tags.get("twitter:card"), "summary_large_image", `${url}: missing large X card`);
    for (const key of ["twitter:image", "og:image"]) {
      const image = tags.get(key);
      assert.ok(image && URL.canParse(image) && imageOrigins.has(new URL(image).origin), `${url}: invalid ${key}: ${image}`);
      images.add(image);
    }
  }

  for (const image of images) {
    assert.notEqual(robots.isAllowed(image, "Twitterbot"), false, `robots.txt blocks ${image}`);
    const response = await get(image);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.ok(bytes.length < 5_000_000, `Oversize share image: ${image}`);
    const { format, width, height } = await sharp(bytes).metadata();
    assert.ok(["png", "jpeg", "webp", "gif"].includes(format), `Unsupported image format: ${image}`);
    assert.equal(response.headers.get("content-type")?.split(";")[0], "image/" + format, image);
    assert.deepEqual([width, height], [1200, 630], image);
    await sharp(bytes).resize(96).png().toBuffer();
  }
  console.log(`Share cards passed for ${urls.length} public pages and ${images.size} image URLs.`);
}

async function checkBuild() {
  // Use the built app, including dynamic routes. Prefer the tracker's normal file fallback in this local smoke test.
  delete process.env.KV_REDIS_URL;
  const app = next({ dev: false });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = createServer(handle);
  try {
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    await checkSite("http://127.0.0.1:" + server.address().port);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await app.close();
  }
}

try {
  if (process.argv.includes("--live")) await checkSite(production);
  else await checkBuild();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
