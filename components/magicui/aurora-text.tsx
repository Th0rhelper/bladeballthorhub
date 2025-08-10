"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
}

export function AuroraText({ children, className }: AuroraTextProps) {
  const { theme } = useTheme()
  
  const getAuroraColors = () => {
    if (theme === "red") {
      return "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
    }
    return "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600"
  }

  return (
    <span className={cn("relative inline-block", className)}>
      <span
        className={cn(
          "absolute inset-0 blur-2xl opacity-30 animate-pulse",
          getAuroraColors()
        )}
        style={{
          clipPath: "text",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {children}
      </span>
      <span
        className={cn(
          "relative bg-clip-text text-transparent animate-pulse",
          getAuroraColors()
        )}
        style={{
          animationDuration: "3s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
        }}
      >
        {children}
      </span>
    </span>
  )
}
