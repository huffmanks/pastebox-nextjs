"use client";

import { useRouter } from "next/navigation";

import { PackageOpenIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const router = useRouter();

  return (
    <>
      <header className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1>pastebox</h1>
            <PackageOpenIcon />
          </div>
          <div>
            <Button
              aria-label="Create a new note"
              className="hidden cursor-pointer sm:inline-flex"
              variant="outline"
              size="sm"
              onClick={() => router.refresh()}>
              <PlusIcon /> <span>New</span>
            </Button>
            <Button
              aria-label="Create a new note"
              className="cursor-pointer rounded-full sm:hidden"
              variant="outline"
              size="icon"
              onClick={() => router.refresh()}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </header>
      <Separator />
    </>
  );
}
