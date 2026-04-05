"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(27, 22, 20, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href={isHome ? "#top" : "/"}
          className="text-sm font-semibold"
          style={{
            color: "var(--text-heading)",
            fontFamily: "var(--font-playfair), serif",
            textDecoration: "none",
          }}
        >
          Doug Antin
        </Link>
        <div className="flex gap-6">
          <Link
            href={isHome ? "#writing" : "/#writing"}
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Writing
          </Link>
          <Link
            href={isHome ? "#tracking" : "/#tracking"}
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            What I&apos;m tracking
          </Link>
          <Link
            href={isHome ? "#contact" : "/#contact"}
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
