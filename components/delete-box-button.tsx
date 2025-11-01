"use client";

import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DeleteBoxButton() {
  function handleDeleteBox() {}
  return (
    <Button
      variant="destructive"
      className="bg-destructive! w-full cursor-pointer"
      onClick={handleDeleteBox}>
      <TrashIcon />
      <span>Delete box</span>
    </Button>
  );
}
