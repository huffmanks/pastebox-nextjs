import Link from "next/link";

import { gt } from "drizzle-orm";
import { PackagePlusIcon, PackageXIcon } from "lucide-react";

import { db } from "@/db";
import { boxes } from "@/db/schema";

import BoxItem from "@/components/box-item";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";

export const dynamic = "force-dynamic";

export default async function BoxesPage() {
  const allBoxes = await db.query.boxes.findMany({
    where: gt(boxes.expiresAt, new Date()),
    with: { files: true },
  });

  if (!allBoxes || allBoxes.length < 1) {
    return (
      <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageXIcon />
          </EmptyMedia>
          <EmptyTitle className="mb-2 flex items-center gap-3 text-2xl font-bold">
            No boxes yet
          </EmptyTitle>
          <EmptyDescription>
            You haven’t created any boxes yet. Get started by creating your first box.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            asChild>
            <Link href="/">
              <PackagePlusIcon />
              <span>Create</span>
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <ItemGroup className="gap-6">
      {allBoxes.map((box) => (
        <BoxItem
          key={box.id}
          box={box}
        />
      ))}
    </ItemGroup>
  );
}
