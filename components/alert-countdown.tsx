"use client";

import { useEffect } from "react";

import { ClockAlertIcon, ClockPlusIcon } from "lucide-react";
import { toast } from "sonner";

import { useCountdown } from "@/hooks/use-countdown";
import { EXPIRY_TIME } from "@/lib/constants";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertCountdown({ timeLeftMs }: { timeLeftMs: number }) {
  const [count, prettyCount, { resetCountdown, startCountdown }] = useCountdown({
    countStart: timeLeftMs,
  });

  startCountdown();

  function handleExtendExpiresAt() {
    console.log("extend to 24hrs in db");
    resetCountdown(EXPIRY_TIME);
    toast("Timer reset", {
      description: "This box has been granted 24 hrs. to live.",
    });
  }

  useEffect(() => {
    if (count === 0) {
      toast.success("Time's up! 🎉", {
        description: "Your countdown has finished",
      });
    }
  }, [count]);

  return (
    <Alert className="mb-8">
      <ClockAlertIcon className="stroke-red-500" />

      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="mb-0.5 text-sm font-medium">Time remaining</p>
          <p className="text-muted-foreground mb-1 text-xs">{prettyCount}</p>
          <p className="text-sm">
            Your box will be deleted when time expires. Extend to refresh the 24-hour timer.
          </p>
        </div>

        <div className="flex items-center">
          <Button
            className="w-full cursor-pointer sm:w-auto"
            onClick={handleExtendExpiresAt}>
            <ClockPlusIcon />
            <span>Extend</span>
          </Button>
        </div>
      </div>
    </Alert>
  );
}
