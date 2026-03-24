import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Doug Antin",
};

const essays = [
  {
    href: "/writing/language-is-code",
    title: "Language Is Code",
    date: "2025",
    description:
      "Every brand guide I've ever read is lying to itself about what it is. Here's the better frame.",
    tag: "Essay",
  },
  {
    href: "/writing/agency-era",
    title: "The Agency Era",
    date: "2025",
    description:
      "We're not entering an AI era. We're entering an agency era. The distinction matters.",
    tag: "Thesis",
  },
];

export default function WritingIndex() {
  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <Link href="/" className="mb-12 inline-block text-sm" style={{ color: "var(--text-muted)" }}>
          ← Doug Antin
        </Link>
        <h1
          className="mb-12 text-4xl font-bold"
          style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
        >
          Writing
        </h1>
        <div className="space-y-4">
          {essays.map((essay) => (
            <Link key={essay.href} href={essay.href} className="essay-card">
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
                {essay.date}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
