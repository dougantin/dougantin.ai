import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const libraryCollections = ["tools", "people", "texts"] as const;

export type LibraryCollection = (typeof libraryCollections)[number];
export type LibraryItemType = "tool" | "person" | "text";
export type LibraryStatus = "using" | "saved" | "monitoring" | "reference" | "archived";

export interface LibraryMeta {
  slug: string;
  collection: LibraryCollection;
  type: LibraryItemType;
  title: string;
  url: string;
  status: LibraryStatus;
  dateAdded: string;
  lastChecked?: string;
  category: string;
  summary: string;
  whySaved?: string;
  tags: string[];
  platform?: string;
  pricing?: string;
  affiliation?: string;
  visibility?: "public" | "draft";
}

export interface LibraryItem extends LibraryMeta {
  content: string;
}

const libraryDir = path.join(process.cwd(), "content", "library");

const collectionType: Record<LibraryCollection, LibraryItemType> = {
  tools: "tool",
  people: "person",
  texts: "text",
};

function isLibraryCollection(value: string): value is LibraryCollection {
  return libraryCollections.includes(value as LibraryCollection);
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function arrayValue(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function parseLibraryItem(collection: LibraryCollection, filename: string): LibraryItem {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(libraryDir, collection, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Record<string, unknown>;
  const type = stringValue(frontmatter.type, collectionType[collection]) as LibraryItemType;
  const visibility = stringValue(frontmatter.visibility, "public") as "public" | "draft";

  return {
    slug,
    collection,
    type,
    title: stringValue(frontmatter.title, slug),
    url: stringValue(frontmatter.url),
    status: stringValue(frontmatter.status, "saved") as LibraryStatus,
    dateAdded: stringValue(frontmatter.dateAdded),
    lastChecked: stringValue(frontmatter.lastChecked) || undefined,
    category: stringValue(frontmatter.category, "Reference"),
    summary: stringValue(frontmatter.summary),
    whySaved: stringValue(frontmatter.whySaved) || undefined,
    tags: arrayValue(frontmatter.tags),
    platform: stringValue(frontmatter.platform) || undefined,
    pricing: stringValue(frontmatter.pricing) || undefined,
    affiliation: stringValue(frontmatter.affiliation) || undefined,
    visibility,
    content,
  };
}

function getCollectionItems(collection: LibraryCollection): LibraryItem[] {
  const dir = path.join(libraryDir, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => parseLibraryItem(collection, filename));
}

function sortLibraryItems<T extends { dateAdded: string; title: string }>(items: T[]) {
  return items.sort((a, b) => {
    const dateDiff = new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.title.localeCompare(b.title);
  });
}

export function getAllLibraryItems(includeDrafts = false): LibraryMeta[] {
  const items = libraryCollections.flatMap((collection) => getCollectionItems(collection));
  return sortLibraryItems(
    items
      .filter((item) => includeDrafts || item.visibility !== "draft")
      .map(({ content, ...meta }) => meta)
  );
}

export function getLibraryItem(collection: string, slug: string): LibraryItem | null {
  if (!isLibraryCollection(collection)) return null;
  const filePath = path.join(libraryDir, collection, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const item = parseLibraryItem(collection, `${slug}.mdx`);
  if (item.visibility === "draft") return null;
  return item;
}

export function getLibraryTypeLabel(type: LibraryItemType) {
  const labels: Record<LibraryItemType, string> = {
    tool: "Tool",
    person: "Person",
    text: "Text",
  };
  return labels[type];
}

export function getLibraryStatusLabel(status: LibraryStatus) {
  const labels: Record<LibraryStatus, string> = {
    using: "Using",
    saved: "Saved",
    monitoring: "Monitoring",
    reference: "Reference",
    archived: "Archived",
  };
  return labels[status];
}

export function formatLibraryDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
