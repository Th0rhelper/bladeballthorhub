"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const zoomedContentRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const cursor = cursorRef.current
    const zoomedContent = zoomedContentRef.current
    if (!cursor || !zoomedContent) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Posicionar lupa
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`
      
      // Ajustar o conteúdo ampliado para mostrar a área correta
      const offsetX = -x * 1.5 + 40 // 40 é metade do tamanho da lupa
      const offsetY = -y * 1.5 + 40
      
      zoomedContent.style.transform = `scale(2.5) translate(${offsetX}px, ${offsetY}px)`
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const getCursorStyle = () => {
    if (theme === "red") {
      return "border-red-400 shadow-red-400/50"
    }
    return "border-cyan-400 shadow-cyan-400/50"
  }

  return (
    <>
      {/* Círculo da lupa */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed w-20 h-20 border-3 rounded-full pointer-events-none z-50 hidden md:block overflow-hidden",
          "shadow-xl",
          getCursorStyle()
        )}
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(1px)'
        }}
      >
        {/* Conteúdo ampliado dentro da lupa */}
        <div 
          ref={zoomedContentRef}
          className="absolute inset-0 w-screen h-screen"
          style={{
            background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)`,
            transformOrigin: '0 0'
          }}
        >
          {/* Canvas ampliado das partículas */}
          <canvas
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'transparent'
            }}
          />
        </div>
      </div>
    </>
  )
}
