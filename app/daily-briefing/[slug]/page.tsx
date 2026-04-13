import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import EssayLayout from "@/components/EssayLayout";
import { getAllDailyBriefings, getDailyBriefing } from "@/lib/daily-briefings";
import { SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDailyBriefings().map((briefing) => ({ slug: briefing.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const briefing = getDailyBriefing(slug);
  if (!briefing) return {};

  return {
    title: briefing.title,
    description: briefing.description,
    alternates: {
      canonical: `/daily-briefing/${briefing.slug}`,
    },
    openGraph: {
      title: `${briefing.title} | ${SITE_NAME}`,
      description: briefing.description,
      type: "article",
      url: `/daily-briefing/${briefing.slug}`,
    },
    twitter: {
      title: `${briefing.title} | ${SITE_NAME}`,
      description: briefing.description,
    },
  };
}

export default async function DailyBriefingEntryPage({ params }: Props) {
  const { slug } = await params;
  const briefing = getDailyBriefing(slug);
  if (!briefing) notFound();

  return (
    <EssayLayout
      backHref="/daily-briefing"
      backLabel="Daily Briefing"
      showDate={false}
      meta={{
        slug: briefing.slug,
        title: briefing.title,
        date: briefing.date,
        description: briefing.description,
        readTime: "",
        tag: briefing.cadence,
      }}
    >
      <MDXRemote source={briefing.content} />
    </EssayLayout>
  );
}
