"use server";

import { eq, inArray } from "drizzle-orm";
import fs from "node:fs/promises";
import path from "node:path";

import { db } from "@/db";
import { BoxInsert, boxes, files } from "@/db/schema";
import { EXPIRY_TIME, UPLOADS_DIR } from "@/lib/constants";
import { getFormString } from "@/lib/utils";

export type CreateBoxReturn = Promise<Pick<BoxInsert, "id" | "slug" | "expiresAt"> | string>;

export async function createBox(formData: FormData): CreateBoxReturn {
  try {
    try {
      await fs.access(UPLOADS_DIR);
    } catch (_error) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
    }

    const now = Date.now();
    const expiresAt = new Date(now + EXPIRY_TIME);

    const slug = getFormString("slug", formData);

    if (!slug || typeof slug !== "string") return "Missing slug." as string;

    const existing = await db.select().from(boxes).where(eq(boxes.slug, slug)).limit(1);

    if (existing.length > 0) {
      return "Slug already exists.";
    }

    const content = getFormString("content", formData);
    const password = getFormString("password", formData);
    const isProtected = Boolean(formData.get("isProtected"));
    const uploadedFiles = formData.getAll("files").filter((f): f is File => f instanceof File);

    if (!content && uploadedFiles.length === 0) {
      return "Must provide a note or at least one file.";
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
      return "Failed to create box.";
    }
    const boxId = createdBox.id;

    if (uploadedFiles.length > 0) {
      await Promise.all(
        uploadedFiles.map(async (file: File) => {
          const name = `${boxId}_${file.name}`;
          const uploadPath = path.join(UPLOADS_DIR, name);
          const buffer = Buffer.from(await file.arrayBuffer());

          await fs.writeFile(uploadPath, buffer);

          await db.insert(files).values({
            boxId,
            path: `/uploads/${name}`,
            type: file.type || "application/octet-stream",
            size: file.size,
            name,
            originalName: file.name,
          });
        })
      );
    }

    return createdBox;
  } catch (_error) {
    return "Something went wrong!";
  }
}

export async function updateBoxExpiresAt(boxId: string, ms: number) {
  try {
    const expiresAt = new Date(Date.now() + (ms / 1000) * 1000);

    await db.update(boxes).set({ expiresAt }).where(eq(boxes.id, boxId));
  } catch (_error) {
    console.warn("Error updating box expiresAt.");
  }
}

export async function validatePassword(boxId: string, boxPassword: string) {
  try {
    const [box] = await db.select().from(boxes).where(eq(boxes.id, boxId));

    if (!box) throw new Error("Invalid password");

    if (box.password !== boxPassword) throw new Error("Invalid password");

    return true;
  } catch (_error) {
    console.warn("Error validating password.");
  }
}

export async function deleteBox(boxId: string) {
  try {
    await db.transaction(async (tx) => {
      const found = await tx.query.boxes.findFirst({
        where: eq(boxes.id, boxId),
        with: { files: true },
      });

      if (!found) return;

      if (found.files.length > 0) {
        await Promise.all(
          found.files.map(async (f) => {
            const uploadsDir = path.resolve(process.cwd(), UPLOADS_DIR);
            const filePath = path.resolve(uploadsDir, f.name);

            if (filePath.startsWith(uploadsDir)) {
              await fs.unlink(filePath).catch(() => {});
            }
          })
        );

        await tx.delete(files).where(
          inArray(
            files.id,
            found.files.map((f) => f.id)
          )
        );
      }

      await tx.delete(boxes).where(eq(boxes.id, boxId));
    });
  } catch (error) {
    console.warn("Deleting box failed:", error);
  }
}
