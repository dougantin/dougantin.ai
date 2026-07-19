import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNearsideIssues, getNearsideIssue } from "@/lib/nearside";
import { SITE_NAME, X_HANDLE } from "@/lib/site";
import styles from "../nearside.module.css";

interface Props {
  params: Promise<{ issue: string }>;
}

interface NearsideLoadoutProps {
  children?: ReactNode;
  verified: string;
  total: string;
  totalDetail: string;
  powerTitle: string;
  powerDetail: string;
}

interface NearsideLoadoutItemProps {
  number: string;
  price: string;
  title: string;
  description: string;
}

interface NearsideArtifactProps {
  children?: ReactNode;
  status: string;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllNearsideIssues().map((issue) => ({ issue: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issue: slug } = await params;
  const issue = getNearsideIssue(slug);
  if (!issue) return {};

  return {
    title: `Nearside ${issue.number}: ${issue.title}`,
    description: issue.summary,
    alternates: {
      canonical: `/research/nearside/${issue.slug}`,
    },
    openGraph: {
      siteName: SITE_NAME,
      title: `Nearside ${issue.number}: ${issue.title}`,
      description: issue.summary,
      type: "article",
      url: `/research/nearside/${issue.slug}`,
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
      title: `Nearside ${issue.number}: ${issue.title}`,
      description: issue.summary,
      images: ["/research/nearside/opengraph-image"],
    },
  };
}

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  return "";
}

function NearsideSectionHeading({ children }: { children?: ReactNode }) {
  const text = textFromChildren(children);
  const match = text.match(/^(\d{2})\s*\/\s*(.+)$/);

  if (!match) return <h2>{children}</h2>;

  return (
    <h2 className={styles.storyHeading}>
      <span className={styles.storyNumber}>Transmission {match[1]}</span>
      <span className={styles.storyTitle}>{match[2]}</span>
    </h2>
  );
}

function NearsideLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function NearsideLoadout({
  children,
  verified,
  total,
  totalDetail,
  powerTitle,
  powerDetail,
}: NearsideLoadoutProps) {
  return (
    <section className={styles.loadout} aria-label="Six-piece everyday carry loadout">
      <p className={styles.loadoutLabel}>Loadout / Verified {verified}</p>
      <div className={styles.loadoutGrid}>{children}</div>
      <p className={styles.loadoutTotal}>
        <strong>{total}</strong>
        <span>{totalDetail}</span>
      </p>
      <p className={styles.loadoutTotal}>
        <strong>{powerTitle}</strong>
        <span>{powerDetail}</span>
      </p>
    </section>
  );
}

function NearsideLoadoutItem({
  number,
  price,
  title,
  description,
}: NearsideLoadoutItemProps) {
  return (
    <article className={styles.loadoutItem} data-number={number}>
      <div className={styles.loadoutItemTop}>
        <span className={styles.loadoutItemNumber}>Carry {number}</span>
        <span className={styles.loadoutItemPrice}>{price}</span>
      </div>
      <h3 className={styles.loadoutItemTitle}>{title}</h3>
      <p className={styles.loadoutItemDescription}>{description}</p>
    </article>
  );
}

function NearsideArtifact({ children, status }: NearsideArtifactProps) {
  return (
    <aside className={styles.artifact} aria-label={`${status} real-world technology`}>
      <span className={styles.artifactStatus}>{status}</span>
      <div className={styles.artifactBody}>{children}</div>
    </aside>
  );
}

function NearsideArtifactSources({ children }: { children?: ReactNode }) {
  return <div className={styles.artifactSources}>{children}</div>;
}

function NearsideArtifactSource({
  href = "",
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <NearsideLink
      href={href}
      className={[styles.artifactSource, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </NearsideLink>
  );
}

const mdxComponents = {
  h2: NearsideSectionHeading,
  a: NearsideLink,
  NearsideLoadout,
  NearsideLoadoutItem,
  NearsideArtifact,
  NearsideArtifactSources,
  NearsideArtifactSource,
};

export default async function NearsideIssuePage({ params }: Props) {
  const { issue: slug } = await params;
  const issue = getNearsideIssue(slug);
  if (!issue) notFound();

  const allIssues = getAllNearsideIssues();
  const issueIndex = allIssues.findIndex((candidate) => candidate.slug === issue.slug);
  const newerIssue = issueIndex > 0 ? allIssues[issueIndex - 1] : null;
  const olderIssue = issueIndex >= 0 && issueIndex < allIssues.length - 1 ? allIssues[issueIndex + 1] : null;

  return (
    <div className={styles.root}>
      <header className={`${styles.issueHero} ${styles.shell}`}>
        <div className={styles.topline}>
          <Link href="/research/nearside" className={styles.wordmark}>
            Nearside
          </Link>
          <span className={styles.signal}>Field signal active</span>
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            Issue {issue.number}
            {issue.byline ? (
              <>
                &nbsp;&middot;&nbsp; By <span className={styles.byline}>{issue.byline}</span>
              </>
            ) : null}
            &nbsp;&middot;&nbsp; {issue.publishedLabel}
          </p>
          <h1 className={styles.title}>{issue.title}</h1>
          <p className={styles.dek}>Real-world tech and real news headlines, showcased in fictional stories.</p>
        </div>

        <div className={styles.metaGrid} aria-label="Issue metadata">
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.metaValue}>Published</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Stories</span>
            <span className={styles.metaValue}>{issue.sceneCount} / status clearly marked</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Real-world evidence</span>
            <span className={styles.metaValue}>{issue.artifactCount} / verified, sourced and linked</span>
          </div>
        </div>
      </header>

      <main className={`${styles.articleShell} ${styles.shell}`}>
        <article className={styles.article}>
          <MDXRemote source={issue.content} components={mdxComponents} />
        </article>
      </main>

      <footer className={`${styles.issueNavigation} ${styles.shell}`}>
        <div>
          {newerIssue ? (
            <Link href={`/research/nearside/${newerIssue.slug}`} className={styles.issueNavLink}>
              &larr; Newer / {newerIssue.number}
            </Link>
          ) : (
            <span className={styles.footerCode}>Latest transmission</span>
          )}
        </div>
        <Link href="/research/nearside" className={styles.issueNavLink}>
          All issues
        </Link>
        <div>
          {olderIssue ? (
            <Link href={`/research/nearside/${olderIssue.slug}`} className={styles.issueNavLink}>
              Older / {olderIssue.number} &rarr;
            </Link>
          ) : (
            <span className={styles.footerCode}>First transmission</span>
          )}
        </div>
      </footer>
    </div>
  );
}
