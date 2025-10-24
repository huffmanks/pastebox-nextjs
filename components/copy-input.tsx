"use client";

import { useState } from "react";

import { CopyCheckIcon, CopyIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function CopyInput({ link }: { link: string }) {
  const [isCopying, setIsCopying] = useState(false);

  async function copyToClipboard() {
    setIsCopying(true);
    await navigator.clipboard.writeText(link);

    setTimeout(() => setIsCopying(false), 2000);
  }

  return (
    <InputGroup className="mb-8">
      <InputGroupInput
        readOnly
        value={link}
        onFocus={(e) => e.target.select()}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          className="cursor-pointer"
          onClick={copyToClipboard}>
          {isCopying ? <CopyCheckIcon className="stroke-green-500" /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
