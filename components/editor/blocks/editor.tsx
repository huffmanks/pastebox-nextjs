"use client";

import { type InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, SerializedEditorState } from "lexical";

import { nodes } from "@/components/editor/blocks/nodes";
import { Plugins } from "@/components/editor/blocks/plugins";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import CopyEditorButton from "@/components/editor/ui/copy-editor-button";
import { Field } from "@/components/ui/field";
import { TooltipProvider } from "@/components/ui/tooltip";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  isEditable = true,
  onChange,
  onSerializedChange,
  setContent,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  isEditable?: boolean;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  setContent?: (editorState: string) => void;
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable: isEditable,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}),
        }}>
        <TooltipProvider>
          <CopyEditorButton />
          <Plugins isReadOnly={!isEditable} />

          <Field>
            <OnChangePlugin
              ignoreSelectionChange={true}
              onChange={(editorState) => {
                onChange?.(editorState);
                const editorStateJSON = editorState.toJSON();

                onSerializedChange?.(editorStateJSON);
                setContent?.(JSON.stringify(editorStateJSON));
              }}
            />
          </Field>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
