import fs from "fs";
import path from "path";
import { createClient, type RedisClientType } from "redis";
import type { TrackerData } from "@/src/lib/tracker/types";

const TRACKER_CACHE_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "tracker-cache.json"
);
const TRACKER_REDIS_KEY = "tracker-data";

let redisClient: RedisClientType | null = null;

function hasRedisConfig() {
  return Boolean(process.env.KV_REDIS_URL);
}

async function getRedisClient() {
  if (!process.env.KV_REDIS_URL) {
    throw new Error("Missing KV_REDIS_URL environment variable.");
  }

  if (!redisClient) {
    redisClient = createClient({
      url: process.env.KV_REDIS_URL,
    });

    redisClient.on("error", (error) => {
      console.error("Redis client error:", error);
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
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
  if (hasRedisConfig()) {
    try {
      const client = await getRedisClient();
      const raw = await client.get(TRACKER_REDIS_KEY);
      return raw ? (JSON.parse(raw) as TrackerData) : null;
    } catch (error) {
      console.warn("Failed to read tracker cache data from Redis:", error);
    }
  }

  return readTrackerDataFromFile();
}

export async function writeTrackerData(
  trackerData: TrackerData
): Promise<"redis" | "file"> {
  if (hasRedisConfig()) {
    const client = await getRedisClient();
    await client.set(TRACKER_REDIS_KEY, JSON.stringify(trackerData));
    return "redis";
  }

  const cacheDir = path.dirname(TRACKER_CACHE_PATH);
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(TRACKER_CACHE_PATH, JSON.stringify(trackerData, null, 2), "utf-8");
  return "file";
}
