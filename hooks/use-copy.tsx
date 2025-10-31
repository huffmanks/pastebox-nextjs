import { useCallback, useState } from "react";

import { useDebounce } from "@/components/editor/hooks/use-debounce";

type CopiedValue = string | null;

type CopyFn = (text: string | ClipboardItem[]) => Promise<boolean>;

export function useCopy() {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopySuccess, setIsCopySuccess] = useState(false);

  const debouncedReset = useDebounce(() => {
    setIsCopySuccess(false);
  }, 1500);

  const copy: CopyFn = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        setIsCopySuccess(false);
        return false;
      }

      try {
        if (Array.isArray(text) && text[0] instanceof ClipboardItem) {
          await navigator.clipboard.write(text);
        } else if (typeof text === "string") {
          await navigator.clipboard.writeText(text);
        } else {
          return false;
        }
        setCopiedText(text.toLocaleString());
        setIsCopySuccess(true);
        return true;
      } catch (_error) {
        setCopiedText(null);
        setIsCopySuccess(false);
        return false;
      } finally {
        debouncedReset();
      }
    },
    [debouncedReset]
  );

  return { copiedText, copy, isCopySuccess };
}
