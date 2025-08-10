"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export function AnimatedThemeToggler() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = async () => {
    const newTheme = theme === "cyan" ? "red" : "cyan"

    // Check if View Transitions API is supported
    if (!document.startViewTransition || !buttonRef.current) {
      setTheme(newTheme)
      return
    }

    // Get button position for circle animation
    const rect = buttonRef.current.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // Calculate the radius needed to cover the entire viewport
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    // Start the view transition with circle reveal effect
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    // Wait for the transition to be ready, then apply the circle animation
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      )
    })
  }

  return (
    <>
      <style jsx global>{`
        /* Disable default view transition animations */
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
        }

        /* Ensure smooth transition */
        ::view-transition-new(root) {
          mix-blend-mode: normal;
        }
      `}</style>

      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "relative h-8 w-16 rounded-full p-1 transition-all duration-300 ease-in-out transform hover:scale-110",
          theme === "cyan"
            ? "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 shadow-cyan-500/50"
            : "bg-gradient-to-r from-red-400 via-red-500 to-red-700 shadow-red-500/50",
          "shadow-lg hover:shadow-xl",
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out transform flex items-center justify-center",
            theme === "cyan" ? "translate-x-0" : "translate-x-8",
          )}
        >
          {/* Cyan indicator */}
          <div
            className={cn(
              "transition-all duration-300 transform",
              theme === "cyan" ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0",
            )}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          </div>

          {/* Red indicator */}
          <div
            className={cn(
              "absolute transition-all duration-300 transform",
              theme === "red" ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0",
            )}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
          </div>
        </div>

        {/* Animated background glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-500 -z-10",
            theme === "cyan"
              ? "bg-gradient-to-r from-cyan-400/20 to-blue-600/20 animate-pulse"
              : "bg-gradient-to-r from-red-400/20 to-red-700/20 animate-pulse",
          )}
        />

        {/* Hover ring */}
        <div
          className={cn(
            "absolute -inset-1 rounded-full border-2 transition-all duration-300 opacity-0 hover:opacity-50",
            theme === "cyan" ? "border-cyan-400/50" : "border-red-400/50",
          )}
        />
      </button>
    </>
  )
}
