import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import type { TrackerData } from "@/src/lib/tracker/types";

const TRACKER_CACHE_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "tracker-cache.json"
);
const TRACKER_KV_KEY = "tracker-data";

function hasKvConfig() {
  return Boolean(
    process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
  );
}

function readTrackerDataFromFile(): TrackerData | null {
  try {
    const raw = fs.readFileSync(TRACKER_CACHE_PATH, "utf-8");
    return JSON.parse(raw) as TrackerData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Failed to read tracker cache data from file:", error);
    }

    return null;
  }
}

export async function getTrackerData(): Promise<TrackerData | null> {
  if (hasKvConfig()) {
    try {
      return await kv.get<TrackerData>(TRACKER_KV_KEY);
    } catch (error) {
      console.warn("Failed to read tracker cache data from KV:", error);
    }
  }

  return readTrackerDataFromFile();
}

export async function writeTrackerData(
  trackerData: TrackerData
): Promise<"kv" | "file"> {
  if (hasKvConfig()) {
    await kv.set(TRACKER_KV_KEY, trackerData);
    return "kv";
  }

  const cacheDir = path.dirname(TRACKER_CACHE_PATH);
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(TRACKER_CACHE_PATH, JSON.stringify(trackerData, null, 2), "utf-8");
  return "file";
}
