import Link from "next/link";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";
import TrackerPreview from "@/src/components/tracker/TrackerPreview";
import { getTrackerData } from "@/src/lib/tracker/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tracking",
  description:
    "Systems Doug Antin uses to monitor the bottlenecks, rates of change, and public signals behind the Agency Era thesis.",
  alternates: {
    canonical: "/tracking",
  },
};

export default async function TrackingPage() {
  const trackerData = await getTrackerData();

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>

        <section className="mb-12 max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Tracking
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Intelligence Systems
          </h1>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            Systems for watching bottlenecks, rates of change, and public signals tied to
            commoditized intelligence, then turning those signals into working briefs.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TrackerPreview data={trackerData} />

          <div
            className="rounded-2xl border px-6 py-7 md:px-8 md:py-8"
            style={{
              borderColor: "var(--border-default)",
              background: "rgba(61, 52, 48, 0.32)",
            }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Intelligence Cost
                </p>
                <h2
                  className="mt-3 text-2xl font-bold"
                  style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                >
                  How Fast Is Intelligence Getting Cheaper?
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  Tracking capability gains, inference price declines, and the physical
                  buildout behind commoditized intelligence.
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                  Coverage
                </div>
                <div className="mt-2 font-mono text-2xl font-semibold" style={{ color: "var(--text-heading)" }}>
                  3
                </div>
                <div style={{ color: "var(--text-muted)" }}>core signals</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
              <Link
                href="/tracking/intelligence-cost"
                className="text-sm font-medium"
                style={{ color: "var(--accent-primary)" }}
              >
                View tracker &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
