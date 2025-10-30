import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    await fs.access(filePath);

    const file = await fs.readFile(filePath);
    return new Response(file);
  } catch (_error) {
    return new Response("Something went wrong!", {
      status: 400,
    });
  }
}
