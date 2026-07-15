import type { Metadata } from "next";
import Link from "next/link";
import { getAllNearsideIssues } from "@/lib/nearside";
import { SITE_NAME, X_HANDLE } from "@/lib/site";
import styles from "./nearside.module.css";

export const metadata: Metadata = {
  title: "Nearside",
  description:
    "A field guide to the cyberpunk present: real-world tech and real news headlines showcased in fictional stories.",
  alternates: {
    canonical: "/research/nearside",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Nearside | Doug Antin",
    description:
      "Real-world tech. Real news headlines. Showcased in fictional stories. A field guide to the cyberpunk present.",
    url: "/research/nearside",
    images: [
      {
        url: "/research/nearside/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nearside — Cyberpunk has arrived. It’s just disguised as ordinary life.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: X_HANDLE,
    title: "Nearside | Doug Antin",
    description:
      "Real-world tech. Real news headlines. Showcased in fictional stories.",
    images: ["/research/nearside/opengraph-image"],
  },
};

const productionSteps = ["Research", "Verify", "Draft", "QA", "Ship"] as const;

export default function NearsideIndexPage() {
  const issues = getAllNearsideIssues();

  return (
    <div className={styles.root}>
      <header className={`${styles.indexHero} ${styles.shell}`}>
        <div className={styles.topline}>
          <span className={styles.wordmark}>Nearside</span>
          <span className={styles.signal}>Field signal active</span>
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.kicker}>A field guide to the cyberpunk present</p>
          <h1 className={`${styles.title} ${styles.indexTitle}`}>
            Cyberpunk has arrived. It’s just disguised as ordinary life.
          </h1>
          <p className={styles.dek}>
            Nearside is a publication sharing real-world tech and real news headlines repacked
            into simple fictional stories to show how we’ve entered the cyberpunk era and why
            it’s not some distant future. In fact, it’s right next door.
          </p>
        </div>

        <div className={styles.metaGrid} aria-label="Nearside editorial coordinates">
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tech</span>
            <span className={styles.metaValue}>Real-world / verified / directly linked</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>News</span>
            <span className={styles.metaValue}>Real-world / sourced / directly linked</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Stories</span>
            <span className={styles.metaValue}>Fictional / clearly marked</span>
          </div>
        </div>
      </header>

      <main className={`${styles.issueIndex} ${styles.shell}`}>
        <section className={styles.framingSection} aria-labelledby="nearside-experiment">
          <div className={styles.framingBlock}>
            <div>
              <p className={styles.framingLabel}>Experiment // live</p>
              <h2 id="nearside-experiment" className={styles.framingTitle}>
                An experiment in whether editorial judgment can be written down.
              </h2>
            </div>

            <p className={styles.framingCopy}>
              Nearside is a field guide to the real-world tech and real news headlines quietly
              turning ordinary life into cyberpunk. Producing the publication relies heavily on
              LLMs, and I’m documenting how I do it as yet another way to showcase that
              we’re living in a cyberpunk era. Each issue is produced by an LLM under an
              evolving editorial operating manual, and every edition ships with a changelog
              of what the system learned. So, in addition to consuming the publication,
              you’re also watching it—and its editorial machine—get built at the same time.
            </p>
          </div>

          <div className={styles.processBlock}>
            <p className={styles.processLabel}>How an issue gets made</p>
            <ol className={styles.processStrip} aria-label="How a Nearside issue gets made">
              {productionSteps.map((step, index) => (
                <li key={step} className={styles.processStep}>
                  <span className={styles.processNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.processTitle}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.issueArchive} aria-labelledby="newsletter-issues">
          <p id="newsletter-issues" className={styles.sectionLabel}>Read the newsletter</p>

          <div className={styles.issueGrid}>
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/research/nearside/${issue.slug}`}
                className={styles.issueCard}
                data-number={issue.number}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardNumber}>Issue {issue.number}</span>
                </div>
                <h2 className={styles.cardTitle}>{issue.title}</h2>
                <p className={styles.cardSummary}>{issue.summary}</p>
                <div className={styles.cardChangelog}>
                  <span className={styles.cardChangelogLabel}>Changelog //</span>
                  <span className={styles.cardChangelogText}>{issue.iterationNote}</span>
                </div>
                <span className={styles.cardAction}>Open transmission &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.indexNote}>
          <Link href="/research" className={styles.indexBack}>
            &larr; Back to research
          </Link>
        </div>
      </main>
    </div>
  );
}
