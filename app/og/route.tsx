import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  const font = fetch(
    new URL("../fonts/Inter-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const fontData = await font;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingBottom: 180,
        paddingLeft: 180,
        paddingRight: 180,
        justifyContent: "center",
        backgroundImage: "url(https://www.mensing.dev/images/og-bg.jpg)",
      }}
    >
      <div
        style={{
          fontSize: 32,
          background: "#dae1e7",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius: 999,
          marginBottom: 40,
        }}
      >
        Blog post
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 110,
          fontFamily: "Inter",
          letterSpacing: "-0.02em",
          fontStyle: "normal",
          color: "#0c1018",
          lineHeight: "130px",
          whiteSpace: "pre-wrap",
        }}
      >
        {postTitle}
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
      emoji: "noto",
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
