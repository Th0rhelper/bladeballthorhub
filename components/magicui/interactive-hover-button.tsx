"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  isDownloadButton?: boolean
}

export function InteractiveHoverButton({
  children,
  className,
  onClick,
  isDownloadButton = false,
}: InteractiveHoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCallToAction, setIsCallToAction] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const callToActionCount = useRef(0)
  const lastInteractionTime = useRef(Date.now())

  // Monitorar scroll para inteligência
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)
      lastInteractionTime.current = Date.now()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Monitorar interações do usuário
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true)
      lastInteractionTime.current = Date.now()
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { passive: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [])

  useEffect(() => {
    if (!isDownloadButton) return

    const triggerCallToAction = () => {
      // Não mostrar se o usuário interagiu recentemente (últimos 5 segundos)
      const timeSinceLastInteraction = Date.now() - lastInteractionTime.current
      if (timeSinceLastInteraction < 5000) return

      // Não mostrar se já mostrou muitas vezes
      if (callToActionCount.current >= 5) return

      // Intensidade baseada no progresso do scroll e número de tentativas
      const intensity = Math.min(0.3 + scrollProgress * 0.4 + callToActionCount.current * 0.1, 1)

      setIsCallToAction(true)
      callToActionCount.current++

      // Duração da animação de "chamar" - 4 segundos com múltiplos pulsos
      setTimeout(() => setIsCallToAction(false), 4000)
    }

    // Primeira chamada após 10 segundos
    const initialTimeout = setTimeout(() => {
      if (hasInteracted) {
        triggerCallToAction()
      }
    }, 10000)

    // Depois a cada 30 segundos, mas com lógica inteligente
    const interval = setInterval(() => {
      triggerCallToAction()
    }, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [isDownloadButton, hasInteracted, scrollProgress])

  const handleClick = () => {
    setHasInteracted(true)
    callToActionCount.current = 0 // Reset contador se clicou
    onClick?.()
  }

  // Calcular intensidade da animação
  const animationIntensity = Math.min(0.3 + scrollProgress * 0.4 + callToActionCount.current * 0.1, 1)

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative px-8 py-4 font-bold text-lg text-primary-foreground bg-gradient-to-r from-primary via-accent to-primary rounded-xl overflow-hidden transition-all duration-700 hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out",
        isHovered && "before:translate-x-[200%]",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary/80 after:via-accent/80 after:to-primary/80 after:opacity-0 after:transition-opacity after:duration-300",
        "hover:after:opacity-100",
        // Animação de "chamar" - vai e volta múltiplas vezes
        isCallToAction && isDownloadButton && "animate-callUser",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide">
        {children}
      </span>

      {/* Partículas que pulsam junto com a animação */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
          isCallToAction && isDownloadButton && "opacity-80",
        )}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 bg-white/50 rounded-full",
              isCallToAction && isDownloadButton && "animate-sparkle",
            )}
            style={{
              left: `${15 + i * 7}%`,
              top: `${25 + (i % 4) * 12}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>

      {/* Ondas que se propagam em sequência */}
      {isCallToAction && isDownloadButton && (
        <>
          {/* Primeira onda */}
          <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-waveOut" />
          {/* Segunda onda com delay */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-primary/25 animate-waveOut"
            style={{ animationDelay: "0.3s" }}
          />
          {/* Terceira onda com delay maior */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-primary/20 animate-waveOut"
            style={{ animationDelay: "0.6s" }}
          />

          {/* Brilho interno que pulsa */}
          <div className="absolute inset-1 rounded-lg bg-gradient-to-r from-primary/15 via-accent/20 to-primary/15 animate-innerGlow" />
        </>
      )}

      <style jsx>{`
        @keyframes callUser {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 15px hsl(var(--primary)/0.3);
          }
          12.5% { 
            transform: scale(1.05); 
            box-shadow: 0 0 25px hsl(var(--primary)/0.5), 0 0 50px hsl(var(--primary)/0.3);
          }
          25% { 
            transform: scale(1); 
            box-shadow: 0 0 15px hsl(var(--primary)/0.3);
          }
          37.5% { 
            transform: scale(1.08); 
            box-shadow: 0 0 30px hsl(var(--primary)/0.6), 0 0 60px hsl(var(--primary)/0.4);
          }
          50% { 
            transform: scale(1); 
            box-shadow: 0 0 15px hsl(var(--primary)/0.3);
          }
          62.5% { 
            transform: scale(1.06); 
            box-shadow: 0 0 28px hsl(var(--primary)/0.55), 0 0 55px hsl(var(--primary)/0.35);
          }
          75% { 
            transform: scale(1); 
            box-shadow: 0 0 15px hsl(var(--primary)/0.3);
          }
          87.5% { 
            transform: scale(1.04); 
            box-shadow: 0 0 22px hsl(var(--primary)/0.45), 0 0 45px hsl(var(--primary)/0.25);
          }
        }

        @keyframes waveOut {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes innerGlow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-callUser {
          animation: callUser 4s ease-in-out;
        }

        .animate-waveOut {
          animation: waveOut 1.2s ease-out infinite;
        }

        .animate-innerGlow {
          animation: innerGlow 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1s ease-in-out infinite;
        }
      `}</style>
    </button>
  )
}
