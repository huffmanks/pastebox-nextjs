import { type NextRequest } from "next/server";

import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const boxUrl = searchParams.get("box_url");

  if (!boxUrl) {
    return new Response("Failed to create QR code.", { status: 500 });
  }

  const darkScheme = { dark: "#fafafa", light: "#0000" };
  const lightScheme = { dark: "#000000", light: "#0000" };

  const darkSvg = await QRCode.toString(boxUrl, {
    type: "svg",
    margin: 2,
    color: darkScheme,
  });

  const lightSvg = await QRCode.toString(boxUrl, {
    type: "svg",
    margin: 2,
    color: lightScheme,
  });

  return new Response(JSON.stringify({ lightSvg, darkSvg }), {
    headers: { "Content-Type": "application/json" },
  });
}
