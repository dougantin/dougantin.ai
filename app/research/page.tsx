import Link from "next/link";
import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";
import styles from "./research.module.css";

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

        <div className="space-y-6">
          <Link href="/research/nearside" className={styles.nearsideCard}>
            <div className={styles.nearsideTopline}>
              <span className={styles.nearsideWordmark}>Nearside</span>
              <span className={styles.nearsideSignal}>Field signal active</span>
            </div>
            <p className={styles.nearsideLabel}>
              Real-world tech / Real news headlines / Showcased in fictional stories
            </p>
            <h2 className={styles.nearsideTitle}>
              Cyberpunk has arrived. It’s just disguised as ordinary life.
            </h2>
            <p className={styles.nearsideDescription}>
              A field guide to life on the near side of cyberpunk, where real-world tech
              and real news headlines become stories about the world already arriving.
            </p>
            <div className={styles.nearsideAction}>Read the Newsletter &rarr;</div>
          </Link>

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
        </div>
      </main>
    </div>
  );
}
