import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getEssay, getAllEssays } from "@/lib/mdx";
import EssayLayout from "@/components/EssayLayout";
import type { Metadata } from "next";
import { articleMetadata } from "@/lib/share-cards";

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
  return articleMetadata(
    `/writing/${essay.slug}`, essay.title, essay.description, essay.tag || "Writing", essay.socialImage,
  );
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
