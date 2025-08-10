"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface IconCloudProps {
  images: string[]
  className?: string
}

export function IconCloud({ images, className }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll(".cloud-icon") as NodeListOf<HTMLElement>

    // Animação dos ícones
    icons.forEach((icon, index) => {
      const phi = Math.acos(-1 + (2 * index) / icons.length)
      const theta = Math.sqrt(icons.length * Math.PI) * phi
      let time = 0
      const baseRadius = 140

      const animate = () => {
        time += 0.02
        const normalSpeed = time * 0.4
        const x = Math.cos(theta + normalSpeed) * Math.sin(phi) * baseRadius
        const y = Math.cos(phi) * baseRadius * 0.7
        const z = Math.sin(theta + normalSpeed) * Math.sin(phi) * baseRadius

        const normalDepth = (z + baseRadius) / (2 * baseRadius)
        const opacity = 0.4 + normalDepth * 0.6
        const scale = 0.8 + normalDepth * 0.4

        icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`
        icon.style.opacity = `${opacity}`
        requestAnimationFrame(animate)
      }

      animate()
    })
  }, [images])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full flex items-center justify-center", className)}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Ícones dos aplicativos */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src || "/placeholder.svg"}
          alt={`Tech ${index}`}
          className="cloud-icon absolute w-10 h-10 object-contain"
          style={{
            transformStyle: "preserve-3d",
            filter: "brightness(0.9) saturate(1.1)",
          }}
        />
      ))}

      {/* Efeito de brilho central */}
      <div
        className="absolute inset-0 rounded-full opacity-10 animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)`,
          animationDuration: "4s",
        }}
      />
    </div>
  )
}
