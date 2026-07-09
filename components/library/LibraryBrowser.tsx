"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LibraryMeta, LibraryStatus, LibraryItemType } from "@/lib/library";

interface Props {
  items: LibraryMeta[];
}

const typeOptions: Array<{ value: "all" | LibraryItemType; label: string }> = [
  { value: "all", label: "All" },
  { value: "tool", label: "Tools" },
  { value: "person", label: "People" },
  { value: "text", label: "Texts" },
];

const statusLabels: Record<LibraryStatus, string> = {
  using: "Using",
  saved: "Saved",
  monitoring: "Monitoring",
  reference: "Reference",
  archived: "Archived",
};

const typeLabels: Record<LibraryItemType, string> = {
  tool: "Tool",
  person: "Person",
  text: "Text",
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export default function LibraryBrowser({ items }: Props) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | LibraryItemType>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LibraryStatus>("all");

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))).sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);

    return items.filter((item) => {
      const haystack = normalize(
        [
          item.title,
          item.summary,
          item.whySaved,
          item.category,
          item.platform,
          item.pricing,
          item.affiliation,
          item.tags.join(" "),
        ]
          .filter(Boolean)
          .join(" ")
      );

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesQuery && matchesType && matchesCategory && matchesStatus;
    });
  }, [categoryFilter, items, query, statusFilter, typeFilter]);

  return (
    <section className="space-y-8">
      <div
        className="rounded-lg border p-4 md:p-5"
        style={{
          borderColor: "var(--border-default)",
          background: "rgba(61, 52, 48, 0.28)",
        }}
      >
        <label
          htmlFor="library-search"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.22em]"
          style={{ color: "var(--accent-primary)" }}
        >
          Search Library
        </label>
        <input
          id="library-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools, people, texts, tags..."
          className="w-full rounded-md border px-4 py-3 text-sm outline-none"
          style={{
            borderColor: "var(--border-default)",
            background: "rgba(27, 22, 20, 0.72)",
            color: "var(--text-heading)",
          }}
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {typeOptions.map((option) => {
            const active = typeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTypeFilter(option.value)}
                className="rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{
                  borderColor: active ? "var(--accent-primary)" : "var(--border-default)",
                  background: active ? "var(--accent-primary)" : "rgba(61, 52, 48, 0.28)",
                  color: active ? "var(--bg-primary)" : "var(--text-muted)",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm normal-case tracking-normal outline-none"
              style={{
                borderColor: "var(--border-default)",
                background: "var(--bg-primary)",
                color: "var(--text-heading)",
              }}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "all" | LibraryStatus)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm normal-case tracking-normal outline-none"
              style={{
                borderColor: "var(--border-default)",
                background: "var(--bg-primary)",
                color: "var(--text-heading)",
              }}
            >
              <option value="all">All statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
        <p>
          Showing {filteredItems.length} of {items.length} saved references
        </p>
        <p className="hidden md:block">Tools and people now. Foundational texts next.</p>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredItems.map((item) => (
            <Link
              key={`${item.collection}-${item.slug}`}
              href={`/library/${item.collection}/${item.slug}`}
              className="essay-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span
                      className="rounded px-2 py-0.5 text-xs font-medium uppercase tracking-[0.14em]"
                      style={{ color: "var(--accent-warm)", border: "1px solid var(--border-default)" }}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <span
                      className="rounded px-2 py-0.5 text-xs font-medium uppercase tracking-[0.14em]"
                      style={{ color: "var(--text-muted)", border: "1px solid var(--border-default)" }}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-semibold leading-snug"
                    style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                {item.summary}
              </p>

              {item.whySaved && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--text-heading)" }}>Why saved:</span> {item.whySaved}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {[item.category, ...item.tags.slice(0, 3)].map((tag) => (
                  <span
                    key={tag}
                    className="rounded px-2 py-1 text-xs"
                    style={{
                      color: "var(--text-muted)",
                      background: "rgba(27, 22, 20, 0.45)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
                View note &rarr;
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="rounded-lg border p-8 text-center"
          style={{
            borderColor: "var(--border-default)",
            background: "rgba(61, 52, 48, 0.28)",
            color: "var(--text-body)",
          }}
        >
          No saved references match those filters yet.
        </div>
      )}
    </section>
  );
}
