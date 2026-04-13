import type { Metadata } from "next";
import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";
import { getAllDailyBriefings } from "@/lib/daily-briefings";

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(year, (month ?? 1) - 1, day ?? 1);

  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata: Metadata = {
  title: "Daily Briefing",
  description:
    "A reverse-chronological feed of daily intelligence memos synthesized from real-time market signals across the Agency Era thesis.",
  alternates: {
    canonical: "/daily-briefing",
  },
};

export default function DailyBriefingPage() {
  const briefings = getAllDailyBriefings();

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>

        <div className="max-w-2xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Daily Intelligence
          </p>
          <h1
            className="mt-4 text-4xl font-bold md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Daily Briefing
          </h1>
          <p
            className="mt-5 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
          >
            A reverse-chronological feed of daily intelligence memos synthesized from real-time
            market signals across the Agency Era thesis.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Public daily briefs live here. Monthly and quarterly reviews can be gated later
            without changing the structure of the archive.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {briefings.length === 0 && (
            <div className="essay-card">
              <h2
                className="text-xl font-semibold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                No briefings yet
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                Add markdown memos in <code>/Users/panda/memos</code> and they&apos;ll appear here.
              </p>
            </div>
          )}

          {briefings.map((briefing) => (
            <Link
              key={briefing.slug}
              href={`/daily-briefing/${briefing.slug}`}
              className="essay-card"
            >
              <div>
                <span
                  className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--accent-warm)", border: "1px solid var(--border-default)" }}
                >
                  {briefing.cadence}
                </span>
                <h2
                  className="text-lg font-semibold leading-snug"
                  style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                >
                  {briefing.title}
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                {briefing.description}
              </p>
              <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                {briefing.date.slice(0, 4)}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
