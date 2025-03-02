"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LanguageFontProviderProps {
  children: ReactNode;
  className?: string;
}

export function LanguageFontProvider({
  children,
  className,
}: LanguageFontProviderProps) {
  const { language } = useI18n();

  return (
    <div
      className={cn(
        language === "ml" ? "font-malayalam" : "font-sans",
        className
      )}
    >
      {children}
    </div>
  );
}
