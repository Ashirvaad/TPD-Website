import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.name} — Make your brand impossible to ignore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social sharing image used by every page unless overridden. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(60% 80% at 80% 90%, rgba(139,92,246,0.45), #0b0b0d 70%)",
          color: "#f5f3ef",
          fontFamily: "serif",
        }}
      >
        <svg width="64" height="78" viewBox="0 0 451 547">
          <path d="M0 0H299C389 17 451 87 451 177C451 277 369 354 259 354H234V90H51L161 125V547L0 495Z" fill="#8f6ad8" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -2 }}>Make your brand</div>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2, color: "#65449b", fontStyle: "italic" }}>
            impossible to ignore.
          </div>
          <div style={{ fontSize: 28, marginTop: 32, color: "#a5a3a5", fontFamily: "sans-serif" }}>{siteConfig.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
