"use client";

import { useState, useEffect } from "react";
import { Monitor, Clock } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
          <Monitor className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">
            QuickPOS
          </h1>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Point of Sale
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        {currentTime ? (
          <>
            <span className="text-sm font-medium">{formatDate(currentTime)}</span>
            <span className="text-sm text-muted-foreground/60">|</span>
            <span className="text-sm font-mono font-semibold text-foreground">
              {formatTime(currentTime)}
            </span>
          </>
        ) : (
          <span className="text-sm font-mono font-semibold text-foreground opacity-0">
            --:--:-- --
          </span>
        )}
      </div>
    </header>
  );
}
