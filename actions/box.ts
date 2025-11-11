"use server";

import { eq, inArray } from "drizzle-orm";
import { promises as fs } from "fs";
import path from "path";

import { db } from "@/db";
import { boxes, files } from "@/db/schema";

export async function deleteBox(boxId: string) {
  await db.transaction(async (tx) => {
    const found = await tx.query.boxes.findFirst({
      where: eq(boxes.id, boxId),
      with: { files: true },
    });

    if (!found) return;

    for (const f of found.files) {
      await fs.unlink(path.join(process.cwd(), "uploads", f.name)).catch(() => {});

      await tx.delete(files).where(
        inArray(
          files.id,
          found.files.map((f) => f.id)
        )
      );
    }

    await tx.delete(boxes).where(eq(boxes.id, boxId));
  });
}
