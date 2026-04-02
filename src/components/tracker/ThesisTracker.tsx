import VerticalGroup from "@/src/components/tracker/VerticalGroup";
import { trackerConfig } from "@/src/config/thesis-tracker";
import type { TrackerData } from "@/src/lib/tracker/types";

interface ThesisTrackerProps {
  data: TrackerData | null;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(new Date(dateString));
}

function formatEditorialDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(dateString));
}

export default function ThesisTracker({ data }: ThesisTrackerProps) {
  const quotes = data?.quotes ?? {};

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <main className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="max-w-4xl">
          <p
            className="text-sm font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Research Dashboard
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight md:text-6xl"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Agency Era Thesis Tracker
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
            A curated watchlist for the infrastructure side of the Agency Era thesis:
            power, compute, and the physical bottlenecks that capital is likely to chase as AI
            demand compounds.
          </p>
        </header>

        <div
          className="mt-10 grid gap-4 rounded-xl border px-5 py-5 text-sm md:grid-cols-2 md:px-6"
          style={{
            borderColor: "var(--border-default)",
            background: "rgba(61, 52, 48, 0.32)",
          }}
        >
          <div>
            <div className="uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Last data refresh
            </div>
            <div className="mt-2" style={{ color: "var(--text-heading)" }}>
              {data?.fetchedAt ? formatDate(data.fetchedAt) : "No cached market data yet"}
            </div>
          </div>
          <div>
            <div className="uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Last editorial review
            </div>
            <div className="mt-2" style={{ color: "var(--text-heading)" }}>
              {formatEditorialDate(trackerConfig.lastUpdated)}
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-16 md:space-y-20">
          {trackerConfig.verticals.map((vertical, index) => (
            <VerticalGroup
              key={vertical.id}
              vertical={vertical}
              quotes={quotes}
              bordered={index > 0}
            />
          ))}
        </div>

        <footer className="mt-20 border-t pt-8" style={{ borderColor: "var(--border-default)" }}>
          <p className="max-w-4xl text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {trackerConfig.disclaimer}
          </p>
        </footer>
      </main>
    </div>
  );
}
