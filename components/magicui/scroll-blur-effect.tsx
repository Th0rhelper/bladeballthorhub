"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollBlurEffect() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calcular blur baseado no scroll (máximo blur = 20px, diminui até 0)
  const maxBlur = 20
  const blurIntensity = Math.max(0, maxBlur - (scrollY / 30))
  
  // Calcular opacidade do overlay (começa em 0.8, vai até 0)
  const overlayOpacity = Math.max(0, 0.8 - (scrollY / 800))

  return (
    <>
      {/* Overlay com blur */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transition-all duration-300"
        style={{
          backdropFilter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
          background: `rgba(0, 0, 0, ${overlayOpacity * 0.1})`,
        }}
      />
      
      {/* Gradiente adicional para suavizar */}
      <div 
        className="fixed inset-0 pointer-events-none z-39"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0, 0, 0, ${overlayOpacity * 0.3}) 0%, 
            rgba(0, 0, 0, ${overlayOpacity * 0.1}) 50%, 
            transparent 100%
          )`,
        }}
      />
    </>
  )
}
