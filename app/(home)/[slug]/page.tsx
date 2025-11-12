import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";
import { EditorState } from "lexical";
import { FileXIcon, NotebookIcon } from "lucide-react";

import { db } from "@/db";
import { boxes } from "@/db/schema";
import { cn, pluralize } from "@/lib/utils";

import BoxUploadsList from "@/components/box-uploads-list";
import DeleteBoxButton from "@/components/delete-box-button";
import DownloadAllButton from "@/components/download-all-button";
import { Editor } from "@/components/editor/blocks/editor";
import ShareButton from "@/components/share-button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function BoxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const box = await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
    with: { files: true },
  });

  if (!box) notFound();

  const hasNote = !!box?.content;

  const editorJson = hasNote ? (box.content as unknown as EditorState) : undefined;

  const boxFilesLength = box.files.length;
  const filesString = `${boxFilesLength} ${pluralize("file", boxFilesLength)} attached`;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          hasNote ? "md:grid-cols-[3fr_1.25fr]" : "md:grid-cols-[1.5fr_1fr]"
        )}>
        <section>
          {hasNote ? (
            <Editor
              slug={box.slug}
              editorState={editorJson}
              isEditable={false}
            />
          ) : (
            <Empty className="rounded-lg border shadow">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <NotebookIcon />
                </EmptyMedia>
                <EmptyTitle>No note</EmptyTitle>
                <EmptyDescription>This pastebox does not contain a note.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>

        <section>
          {box?.files && boxFilesLength > 0 ? (
            <div className="mb-4">
              {boxFilesLength > 1 && <DownloadAllButton id={box.id} />}
              <div className="text-muted-foreground mb-2 text-sm">{filesString}</div>
              <BoxUploadsList files={box.files} />
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileXIcon />
                </EmptyMedia>
                <EmptyTitle>No files</EmptyTitle>
                <EmptyDescription>This pastebox does not have any attached files.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          <div className="space-y-4">
            <ShareButton url={`${process.env.NEXT_PUBLIC_APP_URL}/${box.slug}`} />
            <DeleteBoxButton boxId={box.id} />
          </div>
        </section>
      </div>
    </>
  );
}
