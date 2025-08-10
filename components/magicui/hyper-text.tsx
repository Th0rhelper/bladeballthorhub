"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface HyperTextProps {
  children: string
  className?: string
  animateOnLoad?: boolean
}

export function HyperText({ 
  children, 
  className,
  animateOnLoad = true 
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const animateText = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    let iteration = 0

    intervalRef.current = setInterval(() => {
      setDisplayText(
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("")
      )

      if (iteration >= children.length) {
        clearInterval(intervalRef.current)
        setIsAnimating(false)
      }

      iteration += 1 / 3
    }, 30)
  }

  useEffect(() => {
    if (animateOnLoad) {
      animateText()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [children, animateOnLoad])

  return (
    <span
      className={cn("font-mono cursor-pointer", className)}
      onMouseEnter={animateText}
    >
      {displayText}
    </span>
  )
}
