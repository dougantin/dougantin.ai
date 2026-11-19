import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, X_HANDLE } from "./site";

function fingerprint(value: string | Buffer) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export function cardFile(title: string, section: string) {
  return fingerprint(JSON.stringify(["title-card-v1", section, title])) + ".png";
}

function customCardUrl(source: string) {
  const url = new URL(source, SITE_URL);
  if (url.hostname === "dougantin.ai") url.hostname = new URL(SITE_URL).hostname;
  if (url.origin !== SITE_URL) return url.href;
  const bytes = readFileSync(join(process.cwd(), "public", decodeURIComponent(url.pathname)));
  url.searchParams.set("v", fingerprint(bytes));
  return url.href;
}

export function articleMetadata(
  path: string,
  title: string,
  description: string,
  section: string,
  artwork?: string,
): Metadata {
  const url = artwork ? customCardUrl(artwork) : new URL("/share-cards/" + cardFile(title, section), SITE_URL).href;
  const images = [{ url, width: 1200, height: 630, alt: title }];
  const shared = { title: title + " | " + SITE_NAME, description, images };
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { ...shared, type: "article", url: path },
    twitter: { ...shared, card: "summary_large_image", creator: X_HANDLE },
  };
}
