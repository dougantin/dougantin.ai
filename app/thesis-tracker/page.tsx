import type { Metadata } from "next";
import ThesisTracker from "@/src/components/tracker/ThesisTracker";
import { getTrackerData } from "@/src/lib/tracker/data";

export const metadata: Metadata = {
  title: "Agency Era Thesis Tracker",
  description:
    "A curated stock thesis tracker covering energy, compute, and physical bottlenecks behind the Agency Era buildout.",
  alternates: {
    canonical: "/thesis-tracker",
  },
};

export default async function ThesisTrackerPage() {
  const data = await getTrackerData();

  if (!data) {
    return (
      <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
        <main className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <h1
            className="text-4xl font-bold md:text-5xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Agency Era Thesis Tracker
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
          >
            Tracker data is being loaded. Check back shortly.
          </p>
        </main>
      </div>
    );
  }

  return <ThesisTracker data={data} />;
}
