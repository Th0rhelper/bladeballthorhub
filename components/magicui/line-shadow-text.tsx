"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface LineShadowTextProps {
  children: React.ReactNode
  className?: string
  shadowColor?: string
}

export function LineShadowText({ 
  children, 
  className,
  shadowColor
}: LineShadowTextProps) {
  const { resolvedTheme } = useTheme()
  
  const getShadowColor = () => {
    if (shadowColor) return shadowColor
    return resolvedTheme === "dark" ? "white" : "black"
  }

  return (
    <span
      className={cn("relative inline-block", className)}
      style={{
        textShadow: `3px 3px 0 ${getShadowColor()}, -3px -3px 0 ${getShadowColor()}, 3px -3px 0 ${getShadowColor()}, -3px 3px 0 ${getShadowColor()}`,
      }}
    >
      {children}
    </span>
  )
}
