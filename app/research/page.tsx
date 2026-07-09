import Link from "next/link";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Structured research projects and diligence resources Doug Antin uses to make sense of emerging opportunity spaces.",
  alternates: {
    canonical: "/research",
  },
};

export default function ResearchPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>

        <section className="mb-12 max-w-2xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Research
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Field Guides and Diligence Resources
          </h1>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            Structured research projects and diligence resources I use to make sense of
            emerging opportunity spaces.
          </p>
        </section>

        <Link href="/research/ai-crypto-investor-field-guide" className="essay-card">
          <p
            className="mb-3 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Field Guide
          </p>
          <h2
            className="text-2xl font-bold leading-snug"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            AI x Crypto Investor Field Guide
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            A public research guide for separating real AI x crypto utility from token
            narrative, with emphasis on product usage, token proximity, and evidence quality.
          </p>
          <div className="mt-6 text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
            Read the field guide &rarr;
          </div>
        </Link>
      </main>
    </div>
  );
}
