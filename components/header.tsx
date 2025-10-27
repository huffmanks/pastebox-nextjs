"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { PackageOpenIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function handleCreateNew() {
    if (pathname !== "/") {
      router.push("/");
    }
  }

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
          <div>
            <Button
              aria-label="Create a new note"
              className="hidden cursor-pointer sm:inline-flex"
              variant="outline"
              size="sm"
              onClick={handleCreateNew}>
              <PlusIcon /> <span>New</span>
            </Button>
            <Button
              aria-label="Create a new note"
              className="cursor-pointer rounded-full sm:hidden"
              variant="outline"
              size="icon"
              onClick={handleCreateNew}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </header>
      <Separator />
    </>
  );
}
