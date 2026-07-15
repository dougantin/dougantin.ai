import type { MetadataRoute } from "next";
import { getAllLibraryItems } from "@/lib/library";
import { getAllEssays } from "@/lib/mdx";
import { getAllNearsideIssues } from "@/lib/nearside";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays().map((essay) => ({
    url: `${SITE_URL}/writing/${essay.slug}`,
    lastModified: essay.date,
  }));
  const libraryItems = getAllLibraryItems().map((item) => ({
    url: `${SITE_URL}/library/${item.collection}/${item.slug}`,
    lastModified: item.lastChecked ?? item.dateAdded,
  }));
  const nearsideIssues = getAllNearsideIssues().map((issue) => ({
    url: `${SITE_URL}/research/nearside/${issue.slug}`,
    lastModified: issue.date,
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
    {
      url: `${SITE_URL}/library`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/tracking`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/tracking/intelligence-cost`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/research`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/research/ai-crypto-investor-field-guide`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/research/nearside`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
    },
    ...essays,
    ...libraryItems,
    ...nearsideIssues,
  ];
}
