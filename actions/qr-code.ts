"use server";

import QRCode from "qrcode";

export async function createQrCode(boxUrl: string) {
  const darkScheme = { dark: "#fafafa", light: "#0a0a0a" };
  const lightScheme = { dark: "#0a0a0a", light: "#ffff" };

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

  return { darkSvg, lightSvg };
}
