"use client";

import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { CircleCheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "@/components/ui/button";

export default function ReadOnlyToolbar({ slug }: { slug: string }) {
  const [editor] = useLexicalComposerContext();
  const { copy, isCopySuccess } = useCopy();

  async function handleCopyRichText() {
    const editorContent = editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);
      const rootNode = $getRoot();
      const plainText = rootNode.getTextContent();
      return { html, plainText };
    });

    try {
      const item = new ClipboardItem({
        "text/html": new Blob([editorContent.html], { type: "text/html" }),
        "text/plain": new Blob([editorContent.plainText], { type: "text/plain" }),
      });

      await copy([item]);
    } catch (_error) {
      toast.error("Copy failed.");
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 border-b">
      <h1 className="pl-3 font-semibold">{slug}</h1>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="ml-auto cursor-pointer"
        onClick={handleCopyRichText}
        aria-label="copy to clipboard">
        {isCopySuccess ? <CircleCheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </Button>
    </div>
  );
}
