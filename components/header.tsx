"use client";

import Link from "next/link";

import { PackageIcon, PackageOpenIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <>
      <header className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="flex items-center gap-2"
            href="/">
            <h1>pastebox</h1>
            <PackageOpenIcon />
          </Link>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Create a new note"
              className="size-9 cursor-pointer rounded-full sm:h-8 sm:w-auto sm:rounded-md"
              variant="outline"
              size="sm"
              asChild>
              <Link href="/">
                <PlusIcon /> <span className="hidden sm:inline-flex">New</span>
              </Link>
            </Button>
            <Button
              aria-label="View current boxes"
              className="size-9 cursor-pointer rounded-full sm:h-8 sm:w-auto sm:rounded-md"
              variant="outline"
              size="sm"
              asChild>
              <Link href="/boxes">
                <PackageIcon /> <span className="hidden sm:inline-flex">Boxes</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <Separator />
    </>
  );
}
