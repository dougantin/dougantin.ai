import Link from "next/link";
import { trackerConfig } from "@/src/config/thesis-tracker";
import type { TrackerData } from "@/src/lib/tracker/types";

interface TrackerPreviewProps {
  data: TrackerData | null;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(new Date(dateString));
}

export default function TrackerPreview({ data }: TrackerPreviewProps) {
  const totalVerticals = trackerConfig.verticals.length;
  const totalTickers = trackerConfig.verticals.reduce(
    (sum, vertical) => sum + vertical.tickers.length,
    0
  );

  return (
    <div
      className="rounded-2xl border px-6 py-7 md:px-8 md:py-8"
      style={{
        borderColor: "var(--border-default)",
        background: "rgba(61, 52, 48, 0.32)",
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-primary)" }}
          >
            Thesis Tracker
          </p>
          <h2
            className="mt-3 text-2xl font-bold"
            style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
          >
            Agency Era Thesis Tracker
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            A living watchlist of the public names most exposed to the power, compute, and
            physical bottlenecks behind the Agency Era thesis.
          </p>
        </div>
        <div className="text-right text-sm">
          <div className="uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Coverage
          </div>
          <div className="mt-2 font-mono text-2xl font-semibold" style={{ color: "var(--text-heading)" }}>
            {totalTickers}
          </div>
          <div style={{ color: "var(--text-muted)" }}>across {totalVerticals} verticals</div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          {data?.fetchedAt
            ? `Last data refresh: ${formatDate(data.fetchedAt)}`
            : "Tracker data is being loaded. Check back shortly."}
        </div>

        <Link
          href="/thesis-tracker"
          className="text-sm font-medium"
          style={{ color: "var(--accent-primary)" }}
        >
          View tracker →
        </Link>
      </div>
    </div>
  );
}
