import Image from "next/image";
import Link from "next/link";

interface SiteLogoProps {
  href?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export default function SiteLogo({
  href = "/",
  priority = false,
  className = "h-auto w-[120px] md:w-[140px]",
  imageClassName = "",
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      aria-label="Doug Antin home"
      className="inline-flex items-start"
      style={{ textDecoration: "none" }}
    >
      <Image
        src="/logo.png"
        alt="Doug Antin logo"
        width={168}
        height={108}
        priority={priority}
        className={`${className} ${imageClassName}`.trim()}
      />
    </Link>
  );
}
