import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { boxes } from "@/db/schema";

import { ScrollArea } from "@/components/ui/scroll-area";

export default async function BoxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const box = await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
    with: { files: true },
  });

  if (!box) notFound();

  const content = JSON.stringify(box.content);

  return (
    <div>
      <div>{box.id}</div>
      <div>{box.slug}</div>
      {box?.content && (
        <div>
          <pre className="wrap-break-word">{content}</pre>
        </div>
      )}

      {box?.files && box.files.length && (
        <div>
          <ScrollArea className="max-h-80 w-full rounded-md border p-4">
            {box.files.map((file) => (
              <div key={file.id}>
                <div>{file.id}</div>
                <div>{file.filePath}</div>
                <div>{file.mimeType}</div>
                <div>{file.size}</div>
                <div>{file.uploadedAt.toLocaleDateString()}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
