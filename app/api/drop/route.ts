import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import path from "node:path";

import { db } from "@/db";
import { drops, files } from "@/db/schema";
import { EXPIRY_TIME } from "@/lib/constants";
import { getFormString } from "@/lib/get-form-string";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const UPLOAD_DIR = path.join(process.cwd(), "uploads");

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();

    const now = Date.now();
    const expiresAt = new Date(now + EXPIRY_TIME);

    const slug = getFormString("slug", formData);

    if (!slug || typeof slug !== "string") return new Response("Missing slug", { status: 400 });

    const existing = await db.select().from(drops).where(eq(drops.slug, slug)).limit(1);

    if (existing.length > 0) {
      return new Response("Slug already exists", { status: 409 });
    }

    const content = getFormString("content", formData);
    const password = getFormString("password", formData);
    const uploadedFiles = formData.getAll("files").filter((f): f is File => f instanceof File);

    if (!content && uploadedFiles.length === 0) {
      return new Response("Must provide content or at least one file", { status: 400 });
    }

    const [createdDrop] = await db
      .insert(drops)
      .values({
        slug,
        content,
        password,
        expiresAt,
      })
      .returning({ id: drops.id, expiresAt: drops.expiresAt });

    if (!createdDrop) {
      return new Response("Failed to create drop", { status: 500 });
    }
    const dropId = createdDrop.id;

    if (uploadedFiles.length > 0) {
      await Promise.all(
        uploadedFiles.map(async (file: any) => {
          const fileName = file.name || "unnamed";
          const filePath = path.join(UPLOAD_DIR, `${dropId}_${fileName}`);
          const buffer = Buffer.from(await file.arrayBuffer());

          await fs.writeFile(filePath, buffer);

          await db.insert(files).values({
            dropId,
            filePath,
            mimeType: file.type || file.mimeType || "application/octet-stream",
            size: file.size,
            fileName,
          });
        })
      );
    }

    return Response.json(createdDrop);
  } catch (error) {
    console.error(error);
    return new Response("There was an error!", {
      status: 400,
    });
  }
}
