import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const signals = ["Real-world tech", "Real news headlines", "Showcased in fictional stories"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "48px 56px 42px",
          border: "2px solid #2b342d",
          color: "#edf1ea",
          backgroundColor: "#080b09",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(237, 241, 234, 0.024) 1px, transparent 1px)",
            backgroundSize: "100% 4px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -190,
            right: -100,
            width: 560,
            height: 560,
            display: "flex",
            borderRadius: "50%",
            backgroundColor: "rgba(114, 220, 255, 0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 9,
            height: "100%",
            display: "flex",
            backgroundColor: "#d8ff52",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-22px",
            bottom: "-156px",
            display: "flex",
            color: "rgba(237, 241, 234, 0.035)",
            fontSize: 420,
            fontWeight: 900,
            letterSpacing: "-0.12em",
            lineHeight: 1,
          }}
        >
          N
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            fontFamily: "monospace",
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", color: "#d8ff52", letterSpacing: "0.34em" }}>
            Nearside
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 1040 }}>
          <div
            style={{
              display: "flex",
              color: "#72dcff",
              fontFamily: "monospace",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            A field guide to the cyberpunk present
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 1040,
              fontSize: 88,
              fontWeight: 850,
              letterSpacing: "-0.06em",
              lineHeight: 0.92,
            }}
          >
            Cyberpunk has arrived.
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 930,
              color: "#c9d0ca",
              fontFamily: "Georgia, serif",
              fontSize: 39,
              lineHeight: 1.18,
            }}
          >
            It’s just disguised as ordinary life.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderTop: "1px solid #2b342d",
              borderBottom: "1px solid #2b342d",
              fontFamily: "monospace",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {signals.map((signal, index) => (
              <div
                key={signal}
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: index === 0 ? "flex-start" : "center",
                  padding: "13px 14px",
                  paddingLeft: index === 0 ? 0 : 14,
                  borderLeft: index === 0 ? "none" : "1px solid #2b342d",
                  color: index === 1 ? "#edf1ea" : "#a2aca4",
                }}
              >
                {signal}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              color: "#707a72",
              fontFamily: "monospace",
              fontSize: 17,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "flex", color: "#72dcff" }}>
              dougantin.ai/research/nearside
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
