"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TerminalProps {
  children: React.ReactNode
  className?: string
}

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-2xl mx-auto bg-black/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl overflow-hidden",
        className,
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">Terminal</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm text-green-400 space-y-2 min-h-[300px]">{children}</div>
    </div>
  )
}

interface TypingAnimationProps {
  children: string
  className?: string
  speed?: number
  delay?: number
}

export function TypingAnimation({ children, className, speed = 50, delay = 0 }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

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

  return (
    <div className={cn("", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  )
}

interface AnimatedSpanProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSpan({ children, className, delay = 0 }: AnimatedSpanProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isVisible) return null

  return <div className={cn("animate-in fade-in duration-500", className)}>{children}</div>
}
