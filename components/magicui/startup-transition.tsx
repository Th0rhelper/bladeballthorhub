"use client"

import { useEffect, useState } from "react"
import { AuroraText } from "@/components/magicui/aurora-text"
import { cn } from "@/lib/utils"

export function StartupTransition() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simular progresso de carregamento mais rápido
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 200)
          return 100
        }
        // Velocidade mais rápida
        let increment = 2.5
        if (prev < 20) increment = 4 // Início mais rápido
        if (prev > 80) increment = 1.5 // Final mais lento

        return prev + increment
      })
    }, 40) // Intervalo menor para ser mais rápido

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center",
        "bg-gradient-to-br from-background via-secondary/30 to-accent/30",
        "transition-opacity duration-1000",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto px-6">
        {/* Título */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold px-4">
            <AuroraText>
              <em style={{ fontStyle: "italic" }}>Stumble League</em>
            </AuroraText>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Carregando o site do melhor mod de Stumble Guys...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto space-y-4">
          <div className="relative h-3 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Brilho na barra */}
            <div
              className="absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-200 ease-out"
              style={{ left: `${Math.max(0, progress - 15)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {progress < 30
                ? "Inicializando..."
                : progress < 60
                  ? "Carregando recursos..."
                  : progress < 90
                    ? "Finalizando..."
                    : "Quase pronto!"}
            </span>
            <span className="font-mono">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Círculos decorativos */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute border border-primary/10 rounded-full animate-ping"
              style={{
                width: `${ring * 200}px`,
                height: `${ring * 200}px`,
                animationDelay: `${ring * 0.5}s`,
                animationDuration: `${3 + ring}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
