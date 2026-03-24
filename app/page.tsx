import Link from "next/link";
import type { Metadata } from "next";
import HomeNav from "@/components/HomeNav";
import { getAllEssays } from "@/lib/mdx";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

const workingOn = [
  "Mapping the infrastructure layer of the agency era: what gets built, by whom, and why it compounds",
  "Writing about AI-native product marketing and what the job actually looks like in 2025",
  "Building toward a capital allocator role with a thesis grounded in how AI redistributes agency",
];

export default function Home() {
  const essays = getAllEssays().slice(0, 3);

  return (
    <div id="top" style={{ background: "var(--gradient-section)" }} className="min-h-screen">
      <HomeNav />
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">

        {/* Hero */}
        <section className="mb-20">
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
          <div className="space-y-4 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            <p>
              I spend most of my time thinking about how AI redistributes agency, who captures the value, and what the infrastructure of that shift looks like. I write to figure out what I actually believe.
            </p>
            <p>
              My background is in product marketing, which turns out to be a good lens for this moment: it&apos;s fundamentally about encoding meaning into language and getting machines (and people) to execute on it consistently.
            </p>
            <p>
              I&apos;m building toward a capital allocator role. The thesis is that the agency era is real, it&apos;s early, and most people are looking at it wrong.
            </p>
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
