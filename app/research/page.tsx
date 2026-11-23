import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./research.module.css";

export const metadata: Metadata = {
  title: "Research",
  description: "Doug Antin's research, including four curated special edition magazines of his writing from 2019 to 2023, Nearside, and the AI x Crypto Investor Field Guide.",
  alternates: { canonical: "/research" },
};

const base = "/research/special-editions";
const editions = [
  { number: "00", count: "13 essays · 2019–2020", title: "The Precursors", subtitle: "The first principles behind the later thesis.", description: <>Before exploring personal agency, Doug examined reality, narrative creation, luck, compounding value, and asymmetric opportunities. These early mental models led him toward <em>The Sovereign Individual</em> thesis.</>, file: "dougantin_precursors_issue_00.html", cover: "issue-00-cover.jpg", alt: "Cover of Doug Antin Archive Issue 00: The Precursors" },
  { number: "01", count: "10 essays · 2020–2022", title: "The Sovereign Individual", subtitle: "The original work behind the personal agency thesis.", description: <>Doug maps how digital transformation gave rise to a Sovereign Individual worldview, connecting remote work, crypto, geopolitics, global mobility, and personal resilience to the headlines of the moment.</>, file: "dougantin_sovereign_individual_issue_01.html", cover: "issue-01-cover.jpg", alt: "Cover of The Sovereign Individual, Doug Antin special edition" },
  { number: "02", count: "12 original pieces · 2023", title: "The Sovereign Individual Weekly", subtitle: "The thesis in real time.", description: <>A curated selection of the newsletter’s defining essays. Through banking stress, generative AI, remote work, digital culture, and Bitcoin, Doug follows the Sovereign Individual thesis as it collides with the events of 2023.</>, file: "the_sovereign_individual_weekly_issue_02.html", cover: "issue-02-cover.jpg", alt: "Cover of The Sovereign Individual Weekly Issue 02" },
  { number: "03", count: "10 long reads · Evergreen", title: "The Long-Form Canon", subtitle: "The long view beyond the headlines.", description: <>Ten unabridged essays and book studies gather Doug’s most durable frameworks: digital wealth, universal basic income, longevity, Black Swan resilience, accumulated advantage, and hard decisions. The volume closes with three studies of books that shaped his thinking.</>, file: "dougantin_longform_canon_issue_03.html", cover: "issue-03-cover.jpg", alt: "Cover of Doug Antin Archive Issue 03: The Long-Form Canon" },
];

export default function ResearchPage() {
  return <main className={styles.page} id="top">
    <section className={`${styles.intro} ${styles.wrap}`} aria-labelledby="page-title">
      <div className={styles.introRule} />
      <p className={styles.eyebrow}>Research</p>
      <h1 id="page-title">Field Guides and<br />Diligence Resources</h1>
      <p className={styles.introCopy}>Structured research projects and diligence resources I use to make sense of emerging opportunity spaces.</p>
    </section>

    <section className={styles.editions} aria-labelledby="editions-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>A collected history of ideas</p><h2 id="editions-title">The Special Editions</h2></div>
        <p className={styles.sectionIntro}>A four-volume e-magazine collecting Doug Antin’s original writing from 2019 to 2023. Curated and annotated, it brings together the defining essays, ideas, and deeper cuts from his blog, <em>dougantin.com</em>, and his previous newsletter, <em>The Sovereign Individual Weekly</em>.</p>
      </div>
      <div className={styles.seriesContext}>
        <div><p className={styles.contextLabel}>For new readers</p><h3>What was <em>The Sovereign Individual Weekly</em>?</h3></div>
        <p>Before dougantin.ai, Doug published a newsletter that tracked the digital transformation through the lens of personal agency. Taking its name from the 1997 book <em>The Sovereign Individual</em>, it connected current events to shifts in work, money, mobility, and institutional power. This collection starts with the blog essays that shaped that lens, then follows it into the weekly writing of 2023.</p>
      </div>
      <div className={styles.path} aria-label="Reading path: first principles, the sovereign thesis, macro collisions, and enduring frameworks"><span>First principles</span><i /><span>The sovereign thesis</span><i /><span>Macro collisions</span><i /><span>Enduring frameworks</span></div>
      <div className={styles.issueGrid}>{editions.map(edition => {
        const href = `${base}/issues/${edition.file}`;
        return <article className={styles.issue} key={edition.number}>
          <a className={styles.coverLink} href={href} aria-label={`Read Issue ${edition.number}: ${edition.title}`}><Image src={`${base}/assets/${edition.cover}`} alt={edition.alt} width={896} height={1200} priority={edition.number === "00"} /></a>
          <div className={styles.issueCopy}>
            <p className={styles.issueMeta}><span>Issue {edition.number}</span><span>{edition.count}</span></p>
            <h3><a href={href}>{edition.title}</a></h3><p className={styles.issueSubtitle}>{edition.subtitle}</p>
            <p className={styles.issueDescription}>{edition.description}</p><a className={styles.readLink} href={href}>Read the edition</a>
          </div>
        </article>;
      })}</div>
      <div className={styles.editorialNote}><span className={styles.noteLabel}>Editor&apos;s note</span><p>These magazines offer a clearer view of Doug’s work and thesis, taking readers from his early questions about reality and agency through the sustained research that laid the foundation for his work today.</p><a href={`${base}/issues/${editions[0].file}`}>Begin with Issue 00</a></div>
    </div></section>

    <section className={`${styles.current} ${styles.wrap}`} aria-labelledby="current-title">
      <div className={styles.currentHeading}><p className={styles.eyebrow}>Ongoing research</p><h2 id="current-title">Current Fieldwork</h2><p>Exploratory projects and practical guides for the opportunities taking shape now.</p></div>
      <div className={styles.currentGrid}>
        <Link className={`${styles.currentCard} ${styles.nearside}`} href="/research/nearside"><span className={styles.cardType}>Nearside · Field signal active</span><strong>Cyberpunk has arrived.<br />It’s just disguised as ordinary life.</strong><span className={styles.cardDesc}>Real-world technology and news headlines, told through stories about the world already arriving.</span><span className={styles.cardAction}>Read Nearside</span></Link>
        <Link className={`${styles.currentCard} ${styles.fieldGuide}`} href="/research/ai-crypto-investor-field-guide"><span className={styles.cardType}>Field guide</span><strong>AI x Crypto<br />Investor Field Guide</strong><span className={styles.cardDesc}>A public guide for separating real AI x crypto utility from token narrative, with emphasis on usage, token proximity, and evidence quality.</span><span className={styles.cardAction}>Read the field guide</span></Link>
      </div>
    </section>
  </main>;
}
