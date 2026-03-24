export default function HomeNav() {
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
        <a
          href="#top"
          className="text-sm font-semibold"
          style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif", textDecoration: "none" }}
        >
          Doug Antin
        </a>
        <div className="flex gap-6">
          <a
            href="#writing"
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Writing
          </a>
          <a
            href="#working-on"
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            What I&apos;m working on
          </a>
          <a
            href="#contact"
            className="text-sm"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
