import Link from "next/link";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";
import { getAllEssays } from "@/lib/mdx";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import TrackerPreview from "@/src/components/tracker/TrackerPreview";
import { getTrackerData } from "@/src/lib/tracker/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default async function Home() {
  const allEssays = getAllEssays();
  const startHereEssay = allEssays.find((essay) => essay.slug === "agency-era");
  const essays = [
    ...(startHereEssay ? [startHereEssay] : []),
    ...allEssays.filter((essay) => essay.slug !== "agency-era").slice(0, 2),
  ];
  const trackerData = await getTrackerData();

  return (
    <div id="top" style={{ background: "var(--gradient-section)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">

        {/* Hero */}
        <section className="mb-20 text-center">
          <div className="mb-8 flex justify-center">
            <SiteLogo
              href="/#top"
              priority
              className="h-auto w-[200px] md:w-[240px]"
              imageClassName="opacity-85 mix-blend-screen [filter:saturate(0.78)_brightness(0.92)_contrast(0.96)]"
            />
          </div>
          <h1
            className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Doug Antin
          </h1>
          <p
            className="mb-8 text-lg font-medium"
            style={{ color: "var(--accent-primary)" }}
          >
            Product marketer. AI practitioner. Writer.
          </p>
          <div
            className="mx-auto max-w-2xl space-y-4 text-left text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
          >
            <p>
              Building a point of view on how cheap intelligence reshapes infrastructure, incentives, and capital allocation.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-20 h-px w-full" style={{ background: "var(--border-default)" }} />

        {/* What this site is for */}
        <section className="mb-20">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--accent-primary)" }}
            >
              What This Site Is For
            </p>
            <div
              className="mt-4 space-y-4 text-sm leading-relaxed md:text-base"
              style={{ color: "var(--text-body)" }}
            >
              <p>
                dougantin.ai is where I develop and test a point of view on what happens when
                intelligence becomes abundant and cheap, and how that reshapes work, software,
                and capital allocation.
              </p>
              <p>
                I use it to turn observations into frameworks, exploratory work into conclusions,
                and conclusions into artifacts that can be monitored over time. The site is a
                constant work in progress and everything here is in motion.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Notes explore",
                body: "Early observations and rough models.",
              },
              {
                title: "Essays synthesize",
                body: "Structured arguments about what is changing and why it matters.",
              },
              {
                title: "Tracker monitors",
                body: "A live watchlist of public signals tied to the thesis.",
              },
              {
                title: "Convictions accumulate",
                body: "The clearest conclusions that survive contact with reality.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border px-5 py-5"
                style={{
                  borderColor: "var(--border-default)",
                  background: "rgba(61, 52, 48, 0.28)",
                }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                >
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-20 h-px w-full" style={{ background: "var(--border-default)" }} />

        {/* Writing */}
        <section id="writing" className="mb-20 scroll-mt-20">
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Recent writing
          </h2>
          <div className="space-y-4">
            {essays.map((essay) => (
              <Link key={essay.slug} href={`/writing/${essay.slug}`} className="essay-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {essay.slug === "agency-era" && (
                      <span
                        className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{
                          color: "#1b1614",
                          background: "var(--accent-primary)",
                        }}
                      >
                        Start Here
                      </span>
                    )}
                    <h3
                      className="text-lg font-semibold leading-snug"
                      style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                    >
                      {essay.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {essay.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/writing" className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
              All writing →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-20 h-px w-full" style={{ background: "var(--border-default)" }} />

        {/* Tracking Systems */}
        <section id="tracking" className="mb-20 scroll-mt-20">
          <div className="mb-8 max-w-2xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--accent-primary)" }}
            >
              Tracking Systems
            </p>
            <p
              className="mt-4 text-sm leading-relaxed md:text-base"
              style={{ color: "var(--text-body)" }}
            >
              I&apos;m building tracking systems to help me make better decisions through the
              transition to commoditized intelligence by watching bottlenecks, rates of change,
              and the places where the shift becomes visible first.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
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
                <span
                  className="inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: "#1b1614",
                    background: "var(--accent-primary)",
                  }}
                >
                  In Progress
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                <Link
                  href="/tracking/intelligence-cost"
                  className="text-sm font-medium"
                  style={{ color: "var(--accent-primary)" }}
                >
                  View tracker →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-12 h-px w-full" style={{ background: "var(--border-default)" }} />

        {/* Contact */}
        <footer id="contact" className="scroll-mt-20">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Contact
          </h2>
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:doug@dougantin.com"
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              doug@dougantin.com
            </a>
            <a
              href="https://x.com/dougantin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              X / Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/douglas-antin-a8222945/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              LinkedIn
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
