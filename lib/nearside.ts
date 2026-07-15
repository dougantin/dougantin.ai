import fs from "fs";
import path from "path";
import matter from "gray-matter";

const nearsideDir = path.join(process.cwd(), "content", "nearside");

export interface NearsideIssueMeta {
  slug: string;
  number: string;
  title: string;
  date: string;
  publishedLabel: string;
  summary: string;
  iterationNote: string;
  sceneCount: number;
  artifactCount: number;
  edition: string;
}

export interface NearsideIssue extends NearsideIssueMeta {
  content: string;
}

function readIssue(filename: string): NearsideIssue {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(nearsideDir, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    number: String(data.number ?? slug).padStart(3, "0"),
    title: String(data.title ?? "Untitled issue"),
    date: String(data.date ?? ""),
    publishedLabel: String(data.publishedLabel ?? ""),
    summary: String(data.summary ?? ""),
    iterationNote: String(data.iterationNote ?? ""),
    sceneCount: Number(data.sceneCount ?? 0),
    artifactCount: Number(data.artifactCount ?? 0),
    edition: String(data.edition ?? ""),
    content,
  };
}

export function getAllNearsideIssues(): NearsideIssueMeta[] {
  if (!fs.existsSync(nearsideDir)) return [];

  return fs
    .readdirSync(nearsideDir)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readIssue)
    .sort((a, b) => b.number.localeCompare(a.number))
    .map(({ content: _content, ...issue }) => issue);
}

export function getNearsideIssue(slug: string): NearsideIssue | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(nearsideDir, filename);
  if (!fs.existsSync(filePath)) return null;
  return readIssue(filename);
}
