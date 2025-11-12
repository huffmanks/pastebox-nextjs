"use client";

import { CircleCheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { useCopy } from "@/hooks/use-copy";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function CopyInput({ url }: { url: string }) {
  const { copy, isCopySuccess } = useCopy();

  async function copyToClipboard() {
    try {
      await copy(url);
      toast.success("Link copied to clipboard.");
    } catch (_error) {
      toast.error("Copying failed.");
    }
  }

  return (
    <InputGroup className="mb-8">
      <InputGroupInput
        readOnly
        value={url}
        onFocus={(e) => e.target.select()}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          className="cursor-pointer"
          onClick={copyToClipboard}>
          {isCopySuccess ? <CircleCheckIcon className="stroke-green-500" /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
