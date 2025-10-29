import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import path from "node:path";

import { db } from "@/db";
import { boxes, files } from "@/db/schema";
import { EXPIRY_TIME } from "@/lib/constants";
import { getFormString } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const UPLOAD_DIR = path.join(process.cwd(), "uploads");

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();

    const now = Date.now();
    const expiresAt = new Date(now + EXPIRY_TIME);

    const slug = getFormString("slug", formData);

    if (!slug || typeof slug !== "string") return new Response("Missing slug.", { status: 400 });

    const existing = await db.select().from(boxes).where(eq(boxes.slug, slug)).limit(1);

    if (existing.length > 0) {
      return new Response("Slug already exists.", { status: 409 });
    }

    const content = getFormString("content", formData);
    const password = getFormString("password", formData);
    const isProtected = Boolean(formData.get("isProtected"));
    const uploadedFiles = formData.getAll("files").filter((f): f is File => f instanceof File);

    if (!content && uploadedFiles.length === 0) {
      return new Response("Must provide a note or at least one file.", { status: 400 });
    }

    const [createdBox] = await db
      .insert(boxes)
      .values({
        slug,
        content,
        password: isProtected ? password : null,
        isProtected,
        expiresAt,
      })
      .returning({ id: boxes.id, slug: boxes.slug, expiresAt: boxes.expiresAt });

    if (!createdBox) {
      return new Response("Failed to create box.", { status: 500 });
    }
    const boxId = createdBox.id;

    if (uploadedFiles.length > 0) {
      await Promise.all(
        uploadedFiles.map(async (file: File) => {
          const fileName = file.name || "unnamed";
          const filePath = path.join(UPLOAD_DIR, `${boxId}_${fileName}`);
          const buffer = Buffer.from(await file.arrayBuffer());

          await fs.writeFile(filePath, buffer);

          await db.insert(files).values({
            boxId,
            filePath,
            mimeType: file.type || "application/octet-stream",
            size: file.size,
            fileName,
          });
        })
      );
    }

    return Response.json(createdBox);
  } catch (error) {
    console.error(error);
    return new Response("There was an error!", {
      status: 400,
    });
  }
}
