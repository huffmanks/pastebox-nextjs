"use client";

import Link from "next/link";
import { type JSX, useEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { validateUrl } from "@/components/editor/utils/url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LinkPlugin(): JSX.Element {
  const [pendingUrl, setPendingUrl] = useState("");
  const [open, setOpen] = useState(false);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor) return;

    const remove = editor.registerRootListener((root) => {
      if (!root) return;

      const handler = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest("a");
        if (!link) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        setPendingUrl(link.getAttribute("href") || "");
        setOpen(true);
      };

      root.addEventListener("click", handler, true);

      return () => root.removeEventListener("click", handler, true);
    });

    return () => remove();
  }, [editor]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open link?</DialogTitle>
            <DialogDescription>
              <span className="block max-w-xs truncate sm:max-w-md">{pendingUrl}</span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-3 sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button asChild>
              <Link
                href={pendingUrl}
                target="_blank"
                rel="noopener noreferrer">
                Open
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <LexicalLinkPlugin validateUrl={validateUrl} />
    </>
  );
}
