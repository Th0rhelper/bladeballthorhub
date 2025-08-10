"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  children: string
  className?: string
  startOnView?: boolean
  speed?: number
}

export function TypingAnimation({ 
  children, 
  className,
  startOnView = false,
  speed = 50
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(!startOnView)

  useEffect(() => {
    if (!isVisible) return

    let index = 0
    const timer = setInterval(() => {
      if (index < children.length) {
        setDisplayText(children.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [children, speed, isVisible])

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`typing-${Math.random()}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [startOnView])

  return (
    <span 
      id={startOnView ? `typing-${Math.random()}` : undefined}
      className={cn("", className)}
    >
      {displayText}
      
    </span>
  )
}
