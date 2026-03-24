import Link from "next/link";
import type { Metadata } from "next";
import { getAllEssays } from "@/lib/mdx";
import SiteLogo from "@/components/SiteLogo";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and thesis notes on AI, agency, product marketing, and capital allocation.",
  alternates: {
    canonical: "/writing",
  },
};

export default function WritingIndex() {
  const essays = getAllEssays();

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>
        <h1
          className="mb-12 text-4xl font-bold"
          style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
        >
          Writing
        </h1>
        <div className="space-y-4">
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/writing/${essay.slug}`} className="essay-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--accent-warm)", border: "1px solid var(--border-default)" }}
                  >
                    {essay.tag}
                  </span>
                  <h2
                    className="text-lg font-semibold leading-snug"
                    style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {essay.title}
                  </h2>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                {essay.description}
              </p>
              <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(essay.date).getFullYear()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
