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

const workingOn = [
  "Mapping the infrastructure layer of the agency era: what gets built, by whom, and why it compounds",
  "Writing about AI-native product marketing and what the job actually looks like now",
];

export default async function Home() {
  const essays = getAllEssays().slice(0, 3);
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
                  <h3
                    className="text-lg font-semibold leading-snug"
                    style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {essay.title}
                  </h3>
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

        {/* Thesis Tracker */}
        <section className="mb-20">
          <TrackerPreview data={trackerData} />
        </section>

        {/* Divider */}
        <div className="mb-20 h-px w-full" style={{ background: "var(--border-default)" }} />

        {/* What I'm working on */}
        <section id="working-on" className="mb-20 scroll-mt-20">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            What I&apos;m working on
          </h2>
          <ul className="space-y-3">
            {workingOn.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent-warm)" }}
                />
                <span className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
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
