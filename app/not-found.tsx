import Link from "next/link";

import { PackagePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
      <EmptyHeader>
        <EmptyTitle className="mb-2 flex items-center gap-3">
          <span className="border-r pr-3 text-2xl font-bold">404</span> <span>Not found</span>
        </EmptyTitle>
        <EmptyDescription>The page you’re looking for doesn’t exist.</EmptyDescription>
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
