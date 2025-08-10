"use client"

import { cn } from "@/lib/utils"

interface ProgressiveBlurProps {
  position?: "top" | "bottom" | "left" | "right"
  height?: string
  width?: string
  className?: string
}

export function ProgressiveBlur({
  position = "bottom",
  height = "40%",
  width = "100%",
  className
}: ProgressiveBlurProps) {
  const getGradientDirection = () => {
    switch (position) {
      case "top":
        return "to bottom"
      case "bottom":
        return "to top"
      case "left":
        return "to right"
      case "right":
        return "to left"
      default:
        return "to top"
    }
  }

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return { top: 0, height, width: "100%" }
      case "bottom":
        return { bottom: 0, height, width: "100%" }
      case "left":
        return { left: 0, width, height: "100%" }
      case "right":
        return { right: 0, width, height: "100%" }
      default:
        return { bottom: 0, height, width: "100%" }
    }
  }

  return (
    <div
      className={cn(
        "absolute pointer-events-none z-10",
        className
      )}
      style={{
        ...getPositionStyles(),
        background: `linear-gradient(${getGradientDirection()}, transparent 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        maskImage: `linear-gradient(${getGradientDirection()}, transparent 0%, black 100%)`,
        WebkitMaskImage: `linear-gradient(${getGradientDirection()}, transparent 0%, black 100%)`,
      }}
    />
  )
}
