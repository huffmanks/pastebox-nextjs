import { type NextRequest } from "next/server";

import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const boxLink = searchParams.get("box_link");

  if (!boxLink) {
    return new Response("Failed to create QR code.", { status: 500 });
  }

  const svg = await QRCode.toString(boxLink, {
    type: "svg",
    color: { dark: "#fafafa", light: "#0000" },
  });

  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
