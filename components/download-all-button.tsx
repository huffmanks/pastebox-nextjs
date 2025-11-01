"use client";

import { CloudDownloadIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function DownlaodAllButton({ id }: { id: string }) {
  async function handleDownloadAll() {
    try {
      window.location.href = `/api/box/${id}/download`;
    } catch (_error) {
      toast.error("Download failed");
    }
  }

  return (
    <Button
      className="mb-4 w-full cursor-pointer"
      onClick={handleDownloadAll}>
      <CloudDownloadIcon />
      <span>Download all</span>
    </Button>
  );
}
