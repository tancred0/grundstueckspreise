"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: ProgressBarProps) {
  const { scrollProgress } = useScrollProgress();

  return (
    <div className={cn("sticky top-[73px] z-50 h-1 w-full bg-[#f6f7f9]", className)}>
      <div
        className="h-full bg-primary/50 transition-all duration-500 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
