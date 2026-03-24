import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getEssay, getAllEssays } from "@/lib/mdx";
import EssayLayout from "@/components/EssayLayout";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.description,
    alternates: {
      canonical: `/writing/${essay.slug}`,
    },
    openGraph: {
      title: `${essay.title} | ${SITE_NAME}`,
      description: essay.description,
      type: "article",
      url: `/writing/${essay.slug}`,
    },
    twitter: {
      title: `${essay.title} | ${SITE_NAME}`,
      description: essay.description,
    },
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <EssayLayout meta={essay}>
      <MDXRemote source={essay.content} />
    </EssayLayout>
  );
}
