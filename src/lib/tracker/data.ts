import fs from "fs";
import path from "path";
import type { TrackerData } from "@/src/lib/tracker/types";

const TRACKER_CACHE_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "tracker-cache.json"
);

export async function getTrackerData(): Promise<TrackerData | null> {
  try {
    const raw = fs.readFileSync(TRACKER_CACHE_PATH, "utf-8");
    return JSON.parse(raw) as TrackerData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Failed to read tracker cache data:", error);
    }

    return null;
  }
}
