"use client";

import { redirect } from "next/navigation";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteBox } from "@/actions/box";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteBoxButton({ boxId }: { boxId: string }) {
  async function handleDeleteBox() {
    await deleteBox(boxId);

    toast.error("Box has been deleted.");
    redirect("/");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-destructive! w-full cursor-pointer">
          <TrashIcon />
          <span>Delete box</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold">Delete box</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your box and all the files
            associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBox}
            asChild>
            <Button
              variant="destructive"
              className="bg-destructive! text-primary cursor-pointer">
              <TrashIcon />
              <span>Delete</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
