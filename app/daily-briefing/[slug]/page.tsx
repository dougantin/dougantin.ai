import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DailyBriefingEntryPage() {
  notFound();
}
