import Link from "next/link";
import type { EssayMeta } from "@/lib/mdx";
import SiteLogo from "@/components/SiteLogo";

interface Props {
  meta: EssayMeta;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  showDate?: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EssayLayout({
  meta,
  children,
  backHref = "/writing",
  backLabel = "Writing",
  showDate = true,
}: Props) {
  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-2xl px-6 py-20 md:py-32">
        <div className="mb-8 flex items-start justify-between gap-6">
          <SiteLogo />
          <Link
            href={backHref}
            className="mt-3 inline-block text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            ← {backLabel}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          {meta.tag && (
            <span
              className="mb-4 inline-block rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--accent-warm)", border: "1px solid var(--border-default)" }}
            >
              {meta.tag}
            </span>
          )}
          <h1
            className="mb-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            {meta.title}
          </h1>
          {(showDate || meta.living) && (
            <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
              {showDate && <span>{formatDate(meta.date)}</span>}
              {meta.living && (
                <>
                  {showDate && <span style={{ color: "var(--border-strong)" }}>·</span>}

                  <span
                    className="rounded px-2 py-0.5 text-xs"
                    style={{
                      color: "var(--accent-primary)",
                      border: "1px solid rgba(0, 245, 255, 0.3)",
                      background: "rgba(0, 245, 255, 0.05)",
                    }}
                  >
                    Living document
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="mb-12 h-px" style={{ background: "var(--border-default)" }} />

        {/* Body */}
        <article className="prose prose-lg max-w-none">{children}</article>

        {/* Divider */}
        <div className="mt-16 mb-8 h-px" style={{ background: "var(--border-default)" }} />

        {/* Footer nav */}
        <Link
          href={backHref}
          className="text-sm font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          ← Back to {backLabel.toLowerCase()}
        </Link>

      </main>
    </div>
  );
}
