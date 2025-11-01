import { castError } from "@/lib/utils";

export function downloadBlobFile({ blob, fileName }: { blob: Blob; fileName: string }) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadBase64File({ base64, fileName }: { base64: string; fileName: string }) {
  const a = document.createElement("a");
  a.href = base64;
  a.download = fileName;
  a.click();
}

export function downloadSvgFile({ svg, fileName }: { svg: string; fileName: string }) {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  downloadBlobFile({ blob, fileName });
}

export function svgToBase64Png({
  svg,
  width,
  height,
}: {
  svg: string;
  width: number;
  height: number;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.width = width;
    img.height = height;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get 2d context"));
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (error) => {
      reject(castError(error));
    };
    img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  });
}
