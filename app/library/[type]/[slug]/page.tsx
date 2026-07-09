import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";
import {
  formatLibraryDate,
  getAllLibraryItems,
  getLibraryItem,
  getLibraryStatusLabel,
  getLibraryTypeLabel,
} from "@/lib/library";
import { SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ type: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllLibraryItems().map((item) => ({
    type: item.collection,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  const item = getLibraryItem(type, slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
    alternates: {
      canonical: `/library/${item.collection}/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} | ${SITE_NAME}`,
      description: item.summary,
      type: "article",
      url: `/library/${item.collection}/${item.slug}`,
    },
    twitter: {
      title: `${item.title} | ${SITE_NAME}`,
      description: item.summary,
    },
  };
}

export default async function LibraryDetailPage({ params }: Props) {
  const { type, slug } = await params;
  const item = getLibraryItem(type, slug);
  if (!item) notFound();

  const metadataRows = [
    { label: "Status", value: getLibraryStatusLabel(item.status) },
    { label: "Category", value: item.category },
    item.platform ? { label: "Platform", value: item.platform } : null,
    item.pricing ? { label: "Pricing", value: item.pricing } : null,
    item.affiliation ? { label: "Affiliation", value: item.affiliation } : null,
    item.lastChecked ? { label: "Last checked", value: formatLibraryDate(item.lastChecked) } : null,
    { label: "Date added", value: formatLibraryDate(item.dateAdded) },
  ].filter((row): row is { label: string; value: string } => Boolean(row));

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-8 flex items-start justify-between gap-6">
          <SiteLogo />
          <Link href="/library" className="mt-3 inline-block text-sm" style={{ color: "var(--text-muted)" }}>
            &larr; Library
          </Link>
        </div>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className="rounded px-2 py-0.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--accent-warm)", border: "1px solid var(--border-default)" }}
            >
              {getLibraryTypeLabel(item.type)}
            </span>
            <span
              className="rounded px-2 py-0.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border-default)" }}
            >
              {getLibraryStatusLabel(item.status)}
            </span>
          </div>

          <h1
            className="text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            {item.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            {item.summary}
          </p>

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-md border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "rgba(0, 245, 255, 0.35)",
                background: "rgba(0, 245, 255, 0.08)",
                color: "var(--accent-primary)",
                textDecoration: "none",
              }}
            >
              Open public link &rarr;
            </a>
          )}
        </header>

        <section
          className="mb-10 grid gap-3 rounded-lg border p-5 md:grid-cols-2"
          style={{
            borderColor: "var(--border-default)",
            background: "rgba(61, 52, 48, 0.28)",
          }}
        >
          {metadataRows.map((row) => (
            <div key={row.label}>
              <p
                className="text-xs font-medium uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                {row.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-heading)" }}>
                {row.value}
              </p>
            </div>
          ))}
        </section>

        {item.whySaved && (
          <section
            className="mb-12 rounded-lg border p-5"
            style={{
              borderColor: "var(--border-default)",
              background: "rgba(61, 52, 48, 0.28)",
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--accent-primary)" }}
            >
              Why I Saved This
            </p>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
              {item.whySaved}
            </p>
          </section>
        )}

        <article className="prose prose-lg max-w-none">
          <MDXRemote source={item.content} />
        </article>

        <div className="mt-16 mb-8 h-px" style={{ background: "var(--border-default)" }} />

        <Link href="/library" className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          &larr; Back to library
        </Link>
      </main>
    </div>
  );
}
