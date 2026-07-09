import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";
import LibraryBrowser from "@/components/library/LibraryBrowser";
import { getAllLibraryItems } from "@/lib/library";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A curated index of tools, people, and source materials Doug Antin is saving while tracking the Agency Era.",
  alternates: {
    canonical: "/library",
  },
};

export default function LibraryPage() {
  const items = getAllLibraryItems();
  const tools = items.filter((item) => item.type === "tool").length;
  const people = items.filter((item) => item.type === "person").length;
  const texts = items.filter((item) => item.type === "text").length;

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <div className="mb-12">
          <SiteLogo />
        </div>

        <section className="mb-14 max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Library
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Tools, People, and Foundational Texts
          </h1>
          <div
            className="mt-6 space-y-4 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
          >
            <p>
              A public shelf of things I&apos;m saving because they seem useful for
              understanding or operating in the Agency Era: practical tools, expert operators,
              and eventually the memos, whitepapers, and PDFs I keep returning to.
            </p>
            <p>
              This is intentionally partial and alive. Some entries are tools I use now. Some
              are people or products worth monitoring. The common thread is usefulness for
              AI-native work, agency, research, GTM, and building better intelligence systems.
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-4 md:grid-cols-3">
          {[
            { label: "Tools", value: tools },
            { label: "People", value: people },
            { label: "Texts", value: texts },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border px-5 py-5"
              style={{
                borderColor: "var(--border-default)",
                background: "rgba(61, 52, 48, 0.28)",
              }}
            >
              <p
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
              <p className="mt-2 font-mono text-3xl font-semibold" style={{ color: "var(--text-heading)" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <LibraryBrowser items={items} />
      </main>
    </div>
  );
}
