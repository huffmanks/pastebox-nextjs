import { eq } from "drizzle-orm";

import { db } from "@/db";
import { boxes } from "@/db/schema";

export default async function BoxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const box = await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
    with: { files: true },
  });

  console.log(box);

  return (
    <div>
      <p>hi</p>
    </div>
  );
}
