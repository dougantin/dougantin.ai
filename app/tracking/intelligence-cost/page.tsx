import Image from "next/image";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";

export const metadata: Metadata = {
  title: "How Fast Is Intelligence Getting Cheaper?",
  description:
    "A curated tracking page on frontier model capability, inference price declines, and the compute buildout behind commoditized intelligence.",
  alternates: {
    canonical: "/tracking/intelligence-cost",
  },
};

export default function IntelligenceCostPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>

        <section className="max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Tracking System
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            How Fast Is Intelligence Getting Cheaper?
          </h1>
          <div
            className="mt-8 space-y-5 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
          >
            <p>
              Commoditized intelligence is the thesis. The rate at which it gets cheaper
              determines how much time you have to prepare and gain positioning. This page
              (currently v1) tracks that rate of change using public signals I&apos;ve found,
              interpreted through the lens of the Agency Era thesis.
            </p>
            <p>
              The question this page is meant to help answer is simple: how urgently do you
              need to act? If capability is rising, prices are falling, and the training race
              is still accelerating, the window to adapt is likely shorter than it appears. If
              those curves flatten, the need for urgency changes.
            </p>
            <p>
              Below, I&apos;m curating some signals to help determine the level of urgency for
              taking action to adapt to the agency era. The underlying charts come from
              providers who track the specific data I want better than I could. What I&apos;m
              adding below is my interpretation: what each signal says about the long march
              toward commoditized intelligence, and what that means for decisions about work,
              skills, capital, and time.
            </p>
            <p>This will be updated as new data becomes available.</p>
          </div>
        </section>

        <div className="my-16 h-px w-full" style={{ background: "var(--border-default)" }} />

        <section className="space-y-16">
          <article className="space-y-6">
            <div className="max-w-3xl">
              <p
                className="text-xs font-medium uppercase tracking-[0.22em]"
                style={{ color: "var(--accent-primary)" }}
              >
                Signal 1
              </p>
              <h2
                className="mt-3 text-3xl font-bold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                Frontier Model Capability
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Image source: Artificial Analysis
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-default)" }}>
              <Image
                src="/images/tracking/frontier-language-model-intelligence.png"
                alt="Frontier Language Model Intelligence, Over Time chart from Artificial Analysis."
                width={1839}
                height={946}
                className="h-auto w-full"
              />
            </div>

            <div className="max-w-3xl">
              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                What this tells us
              </h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
                The frontier of AI intelligence is still moving up quickly, but the more
                important signal may be the crowding at the top. AI capability is no longer a
                story about a single dominant lab pulling away. It&apos;s becoming a story about
                multiple labs reaching increasingly similar performance thresholds in rapid
                succession. That matters because intelligence starts behaving more like a
                commodity when the performance gap narrows and the market has more
                interchangeable supply. In other words, lots of competition creates a forcing
                function for increased capabilities at lower prices.
              </p>
            </div>
          </article>

          <article className="space-y-6">
            <div className="max-w-3xl">
              <p
                className="text-xs font-medium uppercase tracking-[0.22em]"
                style={{ color: "var(--accent-primary)" }}
              >
                Signal 2
              </p>
              <h2
                className="mt-3 text-3xl font-bold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                Pricing Per Million Tokens
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Image source: Epoch AI
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-default)" }}>
              <Image
                src="/images/tracking/llm-inference-price-trends.png"
                alt="LLM inference price trends chart from Epoch AI."
                width={1120}
                height={840}
                className="h-auto w-full"
              />
            </div>

            <div className="max-w-3xl">
              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                What this tells us
              </h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
                Prices are falling faster than capability is improving. That&apos;s the most
                important ratio on this page. Frontier labs are subsidizing usage aggressively
                to capture market share and to get users to build habits. The question is how
                long that subsidization is sustainable given the compute and energy constraints
                documented in the thesis tracker. Watch for the moment pricing flattens or
                reverses. That&apos;s when you&apos;ll know the infrastructure bottleneck is binding,
                and it will tell you a lot about which problems intelligence gets deployed to
                solve first: the expensive problems, the ones with enough margin to justify the
                compute.
              </p>
            </div>
          </article>

          <article className="space-y-6">
            <div className="max-w-3xl">
              <p
                className="text-xs font-medium uppercase tracking-[0.22em]"
                style={{ color: "var(--accent-primary)" }}
              >
                Signal 3
              </p>
              <h2
                className="mt-3 text-3xl font-bold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                The Compute Buildout Is Real
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Image source: Epoch AI
              </p>
            </div>

            <div className="grid gap-6">
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-default)" }}>
                <Image
                  src="/images/tracking/training-compute-trend.png"
                  alt="Training compute trend chart from Epoch AI."
                  width={1120}
                  height={840}
                  className="h-auto w-full"
                />
              </div>

              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-default)" }}>
                <Image
                  src="/images/tracking/frontier-data-centers.png"
                  alt="Frontier data centers compute capacity chart from Epoch AI."
                  width={1366}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="max-w-3xl">
              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                What this tells us
              </h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
                The infrastructure layer is still compounding fast. Installed compute is
                rising, and planned frontier campuses imply that major labs and hyperscalers
                are still underwriting a much larger intelligence economy than what exists
                today. The physical commitment matters because it is harder to fake than model
                demos or narrative enthusiasm. The buildout itself is a signal.
              </p>
            </div>
          </article>
        </section>

        <div className="my-16 h-px w-full" style={{ background: "var(--border-default)" }} />

        <section className="max-w-3xl">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Closing
          </h2>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            This page is one part of a broader system I&apos;m building to track the long march
            toward commoditized intelligence. The Thesis Tracker monitors the public market
            names most exposed to the transition. The essays I&apos;m writing help me develop the
            frameworks for how to think about the changes we&apos;re seeing. This page tracks the
            capability curve itself. Together, they&apos;re meant to support better decisions
            about work, capital, and time in the agency era.
          </p>
        </section>
      </main>
    </div>
  );
}
