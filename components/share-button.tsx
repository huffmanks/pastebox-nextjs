"use client";

import { Share2Icon } from "lucide-react";

import { SHARE_API_META } from "@/lib/constants";

import { Button } from "@/components/ui/button";

interface Props {
  url: string;
}

export default function ShareButton({ url }: Props) {
  async function shareNote() {
    const shareData = {
      title: SHARE_API_META.title,
      text: SHARE_API_META.text,
      url,
    };

    try {
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error("Error sharing:", error);
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
