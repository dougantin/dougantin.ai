import { ImageResponse } from "next/og";
import { getAllDailyBriefings } from "@/lib/daily-briefings";
import { getAllEssays } from "@/lib/mdx";
import { getAllLibraryItems } from "@/lib/library";
import { cardFile } from "@/lib/share-cards";
import { SITE_NAME } from "@/lib/site";

// Render only cards for published entries, at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

function publishedCards() {
  const cards = [
    ...getAllEssays().filter(essay => !essay.socialImage).map(essay => ({ title: essay.title, section: essay.tag || "Writing" })),
    ...getAllLibraryItems().map(item => ({ title: item.title, section: "Library" })),
    ...getAllDailyBriefings().map(briefing => ({ title: briefing.title, section: "Middlegame Weekly" })),
  ];
  return new Map(cards.map(card => [cardFile(card.title, card.section), card]));
}

export function generateStaticParams() {
  return Array.from(publishedCards().keys(), file => ({ file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const card = publishedCards().get((await params).file);
  if (!card) return new Response(null, { status: 404 });
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", padding: 64, display: "flex", flexDirection: "column",
      justifyContent: "space-between", color: "#FDF5E6",
      background: "linear-gradient(160deg, #1b1614, #2a201c 65%, #192a20)",
    }}>
      <div style={{ color: "#00f5ff", fontSize: 28, letterSpacing: 3 }}>{SITE_NAME.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: card.title.length > 90 ? 55 : 72, lineHeight: 1.1 }}>{card.title}</div>
        <div style={{ width: 187, height: 2, marginTop: 30, background: "#bc754b" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#c9c0bb" }}>
        <span>{card.section}</span><span>dougantin.ai</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
