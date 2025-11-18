"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { ClockAlertIcon, ClockPlusIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteBox, updateBoxExpiresAt } from "@/actions/box";
import { useCountdown } from "@/hooks/use-countdown";
import { EXPIRY_TIME } from "@/lib/constants";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function AlertCountdown({
  boxId,
  timeLeftMs,
}: {
  boxId: string;
  timeLeftMs: number;
}) {
  const [count, prettyCount, { resetCountdown, startCountdown, stopCountdown }] = useCountdown({
    countStart: timeLeftMs,
    intervalMs: 1000 * 60,
  });

  console.log(count);

  async function handleExtendExpiresAt() {
    await updateBoxExpiresAt(boxId, EXPIRY_TIME - 1);
    resetCountdown(EXPIRY_TIME - 1);
    toast("Timer reset", {
      description: "This box has been granted 24 hrs. to live.",
    });
  }

  useEffect(() => {
    if (count === 0) {
      deleteBox(boxId);
      redirect("/");
    }
  }, [boxId, count]);

  useEffect(() => {
    startCountdown();

    return () => {
      stopCountdown();
    };
  }, [startCountdown, stopCountdown]);

  return (
    <Alert className="mb-8">
      <ClockAlertIcon className="stroke-red-500" />

      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <HoverCard>
            <div>
              <HoverCardTrigger asChild>
                <div className="mb-0.5 flex items-center gap-1">
                  <p className="text-sm font-medium">Time remaining</p>
                  <InfoIcon className="size-3" />
                </div>
              </HoverCardTrigger>
              <p className="text-muted-foreground text-xs">{prettyCount}</p>
            </div>
            <HoverCardContent>
              <p className="text-sm">
                Your box will be deleted when time expires. Extend to refresh the 24-hour timer.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="flex items-center">
          <Button
            className="size-9 cursor-pointer rounded-full sm:h-8 sm:w-auto sm:rounded-md"
            onClick={handleExtendExpiresAt}>
            <ClockPlusIcon />
            <span className="hidden sm:inline-flex">Extend</span>
          </Button>
        </div>
      </div>
    </Alert>
  );
}
