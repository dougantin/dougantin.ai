import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(180deg, rgb(27, 22, 20) 0%, rgb(42, 31, 26) 55%, rgb(26, 42, 26) 100%)",
          color: "#FDF5E6",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#00F5FF",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Doug Antin
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "820px",
            }}
          >
            Thinking about the agency era.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#C9C0BB",
              maxWidth: "920px",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8A7F79",
          }}
        >
          <div style={{ display: "flex" }}>{SITE_NAME}</div>
          <div style={{ display: "flex" }}>dougantin.ai</div>
        </div>
      </div>
    ),
    size
  );
}
