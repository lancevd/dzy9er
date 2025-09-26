import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2
          className={cn(
            "h-8 w-8 animate-spin text-primary",
            "transition-colors duration-200"
          )}
        />
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Loading your dashboard...</h2>
          <p className="text-sm text-muted-foreground">Please wait a moment.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
