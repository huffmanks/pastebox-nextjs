"use client";

import { DownloadIcon } from "lucide-react";

import { FileSelect } from "@/db/schema";
import { cn, formatBytes } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { getFileIcon } from "@/components/ui/file-upload";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  files: FileSelect[];
}

export default function BoxUploadsList({ files }: Props) {
  function handleDownload() {
    console.log("downloaded");
  }
  return (
    <ScrollArea className="max-h-80 w-full rounded-md border p-4">
      <div className="data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 data-[state=inactive]:slide-out-to-top-2 data-[state=active]:slide-in-from-top-2 data-[state=active]:animate-in data-[state=inactive]:animate-out flex flex-col gap-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative flex w-full items-center gap-2.5 rounded-md border p-3 has-data-[slot=file-upload-progress]:flex-col has-data-[slot=file-upload-progress]:items-start">
            <ItemPreview file={file} />
            <ItemMetadata file={file} />
            <Button
              variant="ghost"
              size="icon"
              className="size-7 cursor-pointer"
              onClick={handleDownload}>
              <DownloadIcon />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function ItemPreview({ file }: { file: FileSelect }) {
  const isImage = file.type.startsWith("image/");
  const fileUrl = `${process.env.NEXT_PUBLIC_APP_URL}${file.path}`;

  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-md",
        isImage ? "object-cover" : "bg-accent/50 [&>svg]:size-7"
      )}>
      {isImage ? (
        <img
          src={fileUrl}
          alt={file.name}
          className="size-full rounded object-cover"
        />
      ) : (
        <>{getFileIcon(file)}</>
      )}
    </div>
  );
}

function ItemMetadata({ file }: { file: FileSelect }) {
  return (
    <div className="flex w-0 min-w-0 flex-1 flex-col">
      <>
        <span className="truncate text-sm font-medium">{file.name}</span>
        <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
      </>
    </div>
  );
}
