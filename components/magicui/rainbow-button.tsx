"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface RainbowButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function RainbowButton({ children, className, onClick }: RainbowButtonProps) {
  const { theme } = useTheme()

  const getGradient = () => {
    if (theme === "red") {
      return "bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000_0%,#8b0000_50%,#ff0000_100%)]"
    }
    return "bg-[conic-gradient(from_90deg_at_50%_50%,#00ffff_0%,#0080ff_50%,#00ffff_100%)]"
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all duration-500",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] transition-all duration-500",
          getGradient(),
        )}
      />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-6 py-1 text-sm font-medium text-foreground backdrop-blur-3xl hover:bg-card transition-all duration-300">
        {children}
      </span>
    </button>
  )
}
