import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const FIELD_GUIDE_PATH = path.join(
  process.cwd(),
  "content",
  "research",
  "ai-crypto-investor-briefing-avery-v1.7.html",
);

export const metadata: Metadata = {
  title: "AI x Crypto Investor Field Guide",
  description:
    "A public investor field guide to the AI x crypto market, focused on product reality, token utility, and evidence quality.",
  alternates: {
    canonical: "/research/ai-crypto-investor-field-guide",
  },
};

function extractTagContent(html: string, tag: "style" | "body") {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*)<\\/${tag}>`, "i"));
  return match?.[1] ?? "";
}

export default function AiCryptoInvestorFieldGuidePage() {
  const html = fs.readFileSync(FIELD_GUIDE_PATH, "utf-8");
  const styles = extractTagContent(html, "style");
  const body = extractTagContent(html, "body");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
