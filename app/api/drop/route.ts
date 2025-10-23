import fs from "node:fs";
import path from "node:path";

import { EXPIRY_TIME } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    // REFACTOR: for location to be root
    //     const UPLOAD_DIR = path.join(process.cwd(), "uploads");

    // if (!fs.existsSync(UPLOAD_DIR)) {
    //   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    // }

    const body = await request.body();

    const now = Date.now();
    const expiresAt = new Date(now + EXPIRY_TIME);

    const { slug, content, password, files: uploadedFiles } = body;

    const createdDrop = await db.insert(drops).values({
      id: dropId,
      slug: (slug as string) || dropId,
      content: content ?? null,
      password: password ?? null,
      expiresAt,
    });

    if (Array.isArray(uploadedFiles) && uploadedFiles.length) {
      await Promise.all(
        uploadedFiles.map(async (file: any) => {
          const fileName = file.name || "unnamed";
          const filePath = path.join(UPLOAD_DIR, `${dropId}_${fileName}`);
          const buffer = await file.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buffer));
          const fileRecord = {
            id: nanoid(12),
            dropId,
            filePath,
            mimeType: file.type || file.mimeType || "application/octet-stream",
            size:
              typeof file.size === "number" ? file.size : Buffer.byteLength(Buffer.from(buffer)),
            fileName,
            uploadedAt: new Date(now),
          };
          await db.insert(files).values(fileRecord);
        })
      );
    }

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
