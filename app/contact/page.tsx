import type { Metadata } from "next";
import SiteLogo from "@/components/SiteLogo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Doug Antin by email, X, or LinkedIn.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
            Contact
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Get In Touch
          </h1>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            The best place to reach me is email. I&apos;m also active on X and LinkedIn.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            {
              label: "Email",
              value: "doug@dougantin.com",
              href: "mailto:doug@dougantin.com",
            },
            {
              label: "X / Twitter",
              value: "@dougantin",
              href: "https://x.com/dougantin",
            },
            {
              label: "LinkedIn",
              value: "Douglas Antin",
              href: "https://www.linkedin.com/in/douglas-antin-a8222945/",
            },
            {
              label: "LLM Site Guide",
              value: "Site guide for agents and models",
              href: "/llms/index.md",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="essay-card"
            >
              <p
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--accent-primary)" }}
              >
                {item.label}
              </p>
              <p
                className="mt-3 text-lg font-semibold"
                style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
              >
                {item.value}
              </p>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
