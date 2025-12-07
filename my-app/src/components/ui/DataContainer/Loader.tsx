"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface LoaderProps {
  loading?: boolean;
  msg?: string;
  size?: number;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({
  loading = false,
  msg = "Loading...",
  size = 12,
  className,
}) => {
  if (!loading) return null;

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center p-6 text-center gap-4",
        className
      )}
    >
      <Spinner className={`w-${size} h-${size}`} />
      {msg && (
        <p className="text-lg font-medium text-muted-foreground dark:text-muted-foreground">
          {msg}
        </p>
      )}
    </div>
  );
};
