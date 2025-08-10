"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function MagnifyingCursor() {
  const lupaRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const lupa = lupaRef.current
    if (!lupa) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 50
    canvas.height = 50
    canvas.style.width = '50px'
    canvas.style.height = '50px'
    lupa.appendChild(canvas)

    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }> = []

    const createParticle = () => ({
      x: Math.random() * 50,
      y: Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      hue: theme === "red" ? Math.random() * 60 : Math.random() * 60 + 180,
    })

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 8; i++) {
        particles.push(createParticle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, 50, 50)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -3 || particle.x > 53 || 
            particle.y < -3 || particle.y > 53) {
          particles[index] = createParticle()
        }

        // Draw particle
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Posicionamento instantâneo sem delay
      lupa.style.left = e.clientX + 'px'
      lupa.style.top = e.clientY + 'px'
      lupa.style.transform = 'translate(-50%, -50%)'
    }

    initParticles()
    animate()
    
    // Usar mousemove com passive para melhor performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (lupa.contains(canvas)) {
        lupa.removeChild(canvas)
      }
    }
  }, [theme])

  const getCursorStyle = () => {
    if (theme === "red") {
      return "border-red-400/80"
    }
    return "border-cyan-400/80"
  }

  return (
    <div
      ref={lupaRef}
      className={cn(
        "fixed w-12 h-12 border rounded-full pointer-events-none z-50 hidden md:block overflow-hidden",
        getCursorStyle()
      )}
      style={{
        background: `radial-gradient(circle, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)`,
        willChange: 'transform', // Otimização para animações
      }}
    />
  )
}
