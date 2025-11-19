import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";

import { deleteBox } from "@/actions/box";
import { db } from "@/db";
import { boxes } from "@/db/schema";

import Wrapper from "@/app/(home)/[slug]/wrapper";

export default async function BoxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const box = await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
    with: { files: true },
  });

  if (!box) {
    notFound();
  }

  const currentTime = new Date().getTime();
  const isExpired = box.expiresAt.getTime() < currentTime;

  if (isExpired) {
    await deleteBox(box.id);

    notFound();
  }

  return (
    <Wrapper
      box={box}
      currentTime={currentTime}
    />
  );
}
