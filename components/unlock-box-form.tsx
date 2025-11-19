"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { ArrowLeftIcon, UnlockIcon } from "lucide-react";

import { validatePassword } from "@/actions/box";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface UnlockBoxFormProps {
  boxId: string;
  setIsProtected: Dispatch<SetStateAction<boolean>>;
}

export default function UnlockBoxForm({ boxId, setIsProtected }: UnlockBoxFormProps) {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (!password) {
        setError(true);
        return;
      }

      await validatePassword(boxId, password);

      const ok = await validatePassword(boxId, password);
      if (!ok) throw new Error("Invalid password.");

      setOpen(false);
      setIsProtected(false);
    } catch (_error) {
      console.warn("Invalid password.");
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle className="sr-only">Password dialog</DialogTitle>
        <DialogDescription className="sr-only">
          This box is protected. Enter the password to unlock it.
        </DialogDescription>
        <DialogContent showCloseButton={false}>
          <form
            id="unlock-box-form"
            name="unlock-box-form"
            className="max-w-md"
            autoComplete="off"
            onFocus={() => setError(false)}
            onSubmit={handleSubmit}>
            <FieldSet className="gap-4">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription className="mb-2">
                  This box is protected. Enter the password to unlock it.
                </FieldDescription>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="off"
                  value={password}
                  aria-invalid={error}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError className={cn(error ? "visible opacity-100" : "invisible opacity-0")}>
                  Password was incorrect. Try again.
                </FieldError>
              </Field>
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  className="cursor-pointer"
                  asChild>
                  <Link href="/">
                    <ArrowLeftIcon />
                    <span>Back</span>
                  </Link>
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="cursor-pointer">
                  <UnlockIcon />
                  <span>Unlock</span>
                </Button>
              </div>
            </FieldSet>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
