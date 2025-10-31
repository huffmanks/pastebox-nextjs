"use client";

import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CircleCheckIcon, CopyIcon } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "@/components/ui/button";

export default function CopyEditorButton() {
  const [editor] = useLexicalComposerContext();
  const { copy, isCopySuccess } = useCopy();

  async function handleCopyRichText() {
    const html = $generateHtmlFromNodes(editor);
    const blob = new Blob([html], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];
    await copy(data);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={handleCopyRichText}
      aria-label="copy to clipboard">
      {isCopySuccess ? <CircleCheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </Button>
  );
}
