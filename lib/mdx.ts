import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface EssayMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
  tag: string;
  living?: boolean;
}

export interface Essay extends EssayMeta {
  content: string;
}

export function getAllEssays(): EssayMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data } = matter(raw);
    return { slug, ...data } as EssayMeta;
  });
}

export function getEssay(slug: string): Essay | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, content, ...data } as Essay;
}
