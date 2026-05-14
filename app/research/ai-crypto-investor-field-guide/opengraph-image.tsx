import { ImageResponse } from "next/og";

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
            "linear-gradient(180deg, rgb(27, 22, 20) 0%, rgb(42, 31, 26) 54%, rgb(26, 42, 26) 100%)",
          color: "#FDF5E6",
          padding: "62px",
          border: "1px solid rgba(184, 115, 51, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#00F5FF",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Research / Field Guide
          </div>
          <div
            style={{
              display: "flex",
              color: "#8A7F79",
              fontSize: 24,
            }}
          >
            v1.7 / May 2026
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            maxWidth: "930px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1.04,
              fontWeight: 700,
            }}
          >
            AI x Crypto Investor Field Guide
          </div>
          <div
            style={{
              display: "flex",
              color: "#C9C0BB",
              fontSize: 31,
              lineHeight: 1.35,
              maxWidth: "900px",
            }}
          >
            Separating real AI x crypto utility from token narrative.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "#8A7F79",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>Doug Antin</div>
          <div style={{ display: "flex", color: "#00F5FF" }}>dougantin.ai</div>
        </div>
      </div>
    ),
    size,
  );
}
