"use client";

import { CloudDownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function DownloadAllButton({ id }: { id: string }) {
  async function handleDownloadAll() {
    try {
      window.location.href = `/api/box/${id}/download`;

      toast.success("Files have been downloaded.");
    } catch (_error) {
      toast.error("Download failed!");
    }
  }

  return (
    <Button
      variant="secondary"
      className="mb-4 w-full cursor-pointer"
      onClick={handleDownloadAll}>
      <CloudDownloadIcon />
      <span>Download all</span>
    </Button>
  );
}
