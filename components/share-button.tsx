"use client";

import { Share2Icon } from "lucide-react";

import { SHARE_API_META } from "@/lib/constants";
import { castError } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Props {
  url: string;
}

export default function ShareButton({ url }: Props) {
  async function shareNote() {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: SHARE_API_META.title,
        text: SHARE_API_META.text,
        url,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;
      castError(error);
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      aria-label="Share your box."
      onClick={shareNote}>
      <Share2Icon />
      <span>Share</span>
    </Button>
  );
}
