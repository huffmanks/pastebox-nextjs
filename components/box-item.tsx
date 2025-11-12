"use client";

import Link from "next/link";

import { ExternalLinkIcon } from "lucide-react";

import { BoxSelect, FileSelect } from "@/db/schema";
import { countNoteElements, pluralize } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type BoxItemWithFiles = BoxSelect & {
  files?: FileSelect[];
};

export default function BoxItem({ box }: { box: BoxItemWithFiles }) {
  const filesLength = box?.files?.length ?? 0;

  function generateNotesString() {
    if (!box.content) return "Note: empty";

    const count = countNoteElements(JSON.parse(box.content));

    return `Note: ${count} ${pluralize("element", count)}`;
  }

  function generateFilesString() {
    if (filesLength === 0) return "Attachments: empty";

    return `Attachments: ${filesLength} ${pluralize("file", filesLength)}`;
  }

  const notesString = generateNotesString();
  const filesString = generateFilesString();

  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar>
          <AvatarFallback>{box.slug.charAt(0)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemTitle>{box.slug}</ItemTitle>
        <ItemDescription>
          <span>{notesString}</span>
          <span> — </span>
          <span>{filesString}</span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          asChild>
          <Link href={`/${box.slug}`}>
            <ExternalLinkIcon />
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
}
