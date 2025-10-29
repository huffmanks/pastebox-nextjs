import { $isCodeNode } from "@lexical/code";
import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $setSelection,
  type LexicalEditor,
} from "lexical";
import { CircleCheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { useCopy } from "@/hooks/use-copy";
import { castError } from "@/lib/utils";

interface Props {
  editor: LexicalEditor;
  getCodeDOMNode: () => HTMLElement | null;
}

export function CopyButton({ editor, getCodeDOMNode }: Props) {
  const { copy, isCopySuccess } = useCopy();

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode) {
      return;
    }

    let content = "";

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }

      const selection = $getSelection();
      $setSelection(selection);
    });

    try {
      await copy(content);
    } catch (error) {
      castError(error);
      toast.error("Copying failed.");
    }
  }

  return (
    <button
      className="text-foreground/50 flex shrink-0 cursor-pointer items-center rounded border border-transparent bg-none p-1 uppercase"
      onClick={handleClick}
      aria-label="copy">
      {isCopySuccess ? <CircleCheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </button>
  );
}
