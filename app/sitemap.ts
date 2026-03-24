import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays().map((essay) => ({
    url: `${SITE_URL}/writing/${essay.slug}`,
    lastModified: essay.date,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
    },
    ...essays,
  ];
}
