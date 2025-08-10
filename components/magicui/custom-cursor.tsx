"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.9)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.2)'
    }

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const animateCursor = () => {
      // Cursor principal com delay suave
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      // Dot central mais rápido
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3
      cursorDot.style.left = `${dotX}px`
      cursorDot.style.top = `${dotY}px`

      requestAnimationFrame(animateCursor)
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    
    // Hover effects para elementos interativos
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    animateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  const getCursorStyle = () => {
    if (theme === "red") {
      return "border-red-400/60 bg-red-400/10"
    }
    return "border-cyan-400/60 bg-cyan-400/10"
  }

  const getDotStyle = () => {
    if (theme === "red") {
      return "bg-red-400"
    }
    return "bg-cyan-400"
  }

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-200 ease-out backdrop-blur-sm",
          getCursorStyle()
        )}
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Dot central */}
      <div
        ref={cursorDotRef}
        className={cn(
          "fixed w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-100 ease-out",
          getDotStyle()
        )}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
