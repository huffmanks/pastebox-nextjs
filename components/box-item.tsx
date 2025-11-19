"use client";

import Link from "next/link";

import { ExternalLinkIcon, LockIcon } from "lucide-react";

import { countNoteElements, getRelativeTimeLeft, pluralize } from "@/lib/utils";
import { BoxWithFiles } from "@/types";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function BoxItem({ box }: { box: BoxWithFiles }) {
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

  const expiresAt = getRelativeTimeLeft(box.expiresAt.getTime() - new Date().getTime());
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
        <ItemTitle className="flex-wrap gap-1">
          {box.isProtected && (
            <Badge
              variant="secondary"
              size="icon">
              <LockIcon />
            </Badge>
          )}
          <span>{box.slug}</span>
          <Badge
            className="ml-1"
            variant="destructive">
            {expiresAt}
          </Badge>
        </ItemTitle>
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
