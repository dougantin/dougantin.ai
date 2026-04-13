import fs from "fs";
import path from "path";
import matter from "gray-matter";

const briefingsDir = path.join(process.cwd(), "content", "daily-briefing");

export interface DailyBriefing {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  cadence: "daily" | "weekly" | "monthly" | "quarterly";
}

function sortBriefingsByDate<T extends { date: string }>(briefings: T[]) {
  return briefings.sort((a, b) => b.date.localeCompare(a.date));
}

function formatDateForTitle(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(year, (month ?? 1) - 1, day ?? 1);

  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseBriefing(filePath: string): DailyBriefing {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    slug: typeof data.slug === "string" ? data.slug : slug,
    title:
      typeof data.title === "string" && typeof data.date === "string"
        ? `${data.title} - ${formatDateForTitle(data.date)}`
        : "Daily Briefing",
    date: typeof data.date === "string" ? data.date : "",
    description: typeof data.description === "string" ? data.description : "",
    content,
    cadence:
      data.cadence === "daily" ||
      data.cadence === "weekly" ||
      data.cadence === "monthly" ||
      data.cadence === "quarterly"
        ? data.cadence
        : "daily",
  };
}

function isValidBriefing(briefing: DailyBriefing) {
  return /^\d{4}-\d{2}-\d{2}$/.test(briefing.date) && briefing.content.length > 0;
}

export function getAllDailyBriefings(): DailyBriefing[] {
  if (!fs.existsSync(briefingsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(briefingsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(briefingsDir, file));

  return sortBriefingsByDate(files.map(parseBriefing).filter(isValidBriefing));
}

export function getDailyBriefing(slug: string): DailyBriefing | null {
  return getAllDailyBriefings().find((briefing) => briefing.slug === slug) ?? null;
}
