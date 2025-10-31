import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";
import { CloudDownloadIcon, TrashIcon } from "lucide-react";

import { db } from "@/db";
import { boxes } from "@/db/schema";

import BoxUploadsList from "@/components/box-uploads-list";
import { Button } from "@/components/ui/button";

export default async function BoxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const box = await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
    with: { files: true },
  });

  if (!box) notFound();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_1.25fr]">
      <div>
        <div>{box.id}</div>
        <div>{box.slug}</div>
      </div>

      <div>
        {box?.files && box.files.length && (
          <div className="mb-4">
            <Button className="mb-4 w-full cursor-pointer">
              <CloudDownloadIcon />
              <span>Download all</span>
            </Button>
            <BoxUploadsList files={box.files} />
          </div>
        )}
        <div>
          <Button
            variant="outline"
            className="group focus-within:bg-destructive! hover:bg-destructive! w-full cursor-pointer focus-within:border-transparent! hover:border-transparent!">
            <TrashIcon className="group-hover:text-foreground group-focus-within:text-foreground text-destructive" />
            <span className="group-hover:text-foreground group-focus-within:text-foreground text-destructive">
              Delete box
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
