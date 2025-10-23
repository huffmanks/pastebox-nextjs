"use client";

import { type JSX, createContext } from "react";

import type { LexicalEditor } from "lexical";

export const ToolbarContext = createContext<{
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (title: string, showModal: (onClose: () => void) => JSX.Element) => void;
}>({
  activeEditor: {} as LexicalEditor,
  $updateToolbar: () => {},
  blockType: "paragraph",
  setBlockType: () => {},
  showModal: () => {},
});
