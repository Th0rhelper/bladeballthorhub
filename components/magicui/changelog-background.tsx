"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ChangelogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
      life: number
      maxLife: number
      type: "code" | "version" | "bug" | "feature"
      rotation: number
      rotationSpeed: number
    }> = []

    const codeSymbols = ["<", ">", "{", "}", "/", "*", "+", "-", "=", ";", "(", ")", "[", "]"]
    const versionSymbols = ["v", "1", "2", "3", "4", ".", "0"]
    const bugSymbols = ["!", "?", "x", "×", "⚠", "🐛"]
    const featureSymbols = ["✓", "★", "♦", "●", "▲", "✨"]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      const types = ["code", "version", "bug", "feature"] as const
      const type = types[Math.floor(Math.random() * types.length)]

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.4 + 0.1,
        hue:
          theme === "red"
            ? type === "bug"
              ? 0
              : type === "feature"
                ? 120
                : type === "version"
                  ? 60
                  : 300
            : type === "bug"
              ? 0
              : type === "feature"
                ? 120
                : type === "version"
                  ? 200
                  : 180,
        life: 0,
        maxLife: Math.random() * 500 + 300,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      }
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 60; i++) {
        particles.push(createParticle())
      }
    }

    const getSymbol = (type: string) => {
      switch (type) {
        case "code":
          return codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
        case "version":
          return versionSymbols[Math.floor(Math.random() * versionSymbols.length)]
        case "bug":
          return bugSymbols[Math.floor(Math.random() * bugSymbols.length)]
        case "feature":
          return featureSymbols[Math.floor(Math.random() * featureSymbols.length)]
        default:
          return "•"
      }
    }

    const drawFloatingCode = () => {
      // Desenhar linhas de código flutuantes no fundo
      ctx.save()
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = theme === "red" ? "#ff4444" : "#44ffff"
      ctx.lineWidth = 1

      for (let i = 0; i < 8; i++) {
        const y = (canvas.height / 8) * i + ((Date.now() * 0.01) % (canvas.height / 8))
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      for (let i = 0; i < 12; i++) {
        const x = (canvas.width / 12) * i + ((Date.now() * 0.005) % (canvas.width / 12))
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawGitGraph = () => {
      // Desenhar um gráfico de commits estilizado
      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = theme === "red" ? "#ff6666" : "#66ffff"
      ctx.lineWidth = 2

      const centerX = canvas.width * 0.8
      const centerY = canvas.height * 0.3
      const time = Date.now() * 0.001

      // Linha principal (branch master)
      ctx.beginPath()
      ctx.moveTo(centerX - 200, centerY)
      ctx.lineTo(centerX + 200, centerY)
      ctx.stroke()

      // Branches
      for (let i = 0; i < 3; i++) {
        const branchY = centerY + (i + 1) * 60
        const offset = Math.sin(time + i) * 20

        ctx.beginPath()
        ctx.moveTo(centerX - 100 + offset, centerY)
        ctx.quadraticCurveTo(centerX - 50 + offset, centerY + 30, centerX + offset, branchY)
        ctx.lineTo(centerX + 100 + offset, branchY)
        ctx.stroke()

        // Merge back
        ctx.beginPath()
        ctx.moveTo(centerX + 100 + offset, branchY)
        ctx.quadraticCurveTo(centerX + 150 + offset, centerY + 30, centerX + 200 + offset, centerY)
        ctx.stroke()
      }

      // Commits (círculos)
      for (let i = 0; i < 8; i++) {
        const x = centerX - 150 + i * 50
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.7

        ctx.fillStyle = theme === "red" ? `rgba(255, 100, 100, ${0.6 * pulse})` : `rgba(100, 255, 255, ${0.6 * pulse})`
        ctx.beginPath()
        ctx.arc(x, centerY, 4 * pulse, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const animate = () => {
      // Fundo com gradiente dinâmico
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001
      const hue1 = theme === "red" ? (time * 10) % 60 : ((time * 10) % 60) + 180
      const hue2 = theme === "red" ? (time * 15 + 180) % 60 : ((time * 15 + 180) % 60) + 180

      gradient.addColorStop(0, `hsla(${hue1}, 20%, 5%, 1)`)
      gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 25%, 8%, 1)`)
      gradient.addColorStop(1, `hsla(${hue2}, 20%, 5%, 1)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Desenhar elementos de fundo
      drawFloatingCode()
      drawGitGraph()

      // Animar partículas
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        particle.rotation += particle.rotationSpeed

        // Efeito de flutuação suave
        particle.x += Math.sin(particle.life * 0.01) * 0.2
        particle.y += Math.cos(particle.life * 0.015) * 0.15

        // Variação na opacidade
        const lifeCycle = particle.life / particle.maxLife
        let opacity = particle.opacity
        if (lifeCycle < 0.1) {
          opacity *= lifeCycle / 0.1 // Fade in
        } else if (lifeCycle > 0.9) {
          opacity *= (1 - lifeCycle) / 0.1 // Fade out
        }

        if (
          particle.life >= particle.maxLife ||
          particle.x < -50 ||
          particle.x > canvas.width + 50 ||
          particle.y < -50 ||
          particle.y > canvas.height + 50
        ) {
          particles[index] = createParticle()
        }

        // Desenhar partícula
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.globalAlpha = opacity

        // Brilho externo baseado no tipo
        const glowSize = particle.size * 2
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${opacity * 0.3})`)
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Símbolo principal
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${opacity})`
        ctx.font = `${particle.size}px monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(getSymbol(particle.type), 0, 0)

        // Borda brilhante para alguns tipos
        if (particle.type === "feature" || particle.type === "version") {
          ctx.strokeStyle = `hsla(${particle.hue}, 90%, 80%, ${opacity * 0.8})`
          ctx.lineWidth = 1
          ctx.strokeText(getSymbol(particle.type), 0, 0)
        }

        ctx.restore()
      })

      // Efeito de ondas no canto
      ctx.save()
      ctx.globalAlpha = 0.1
      const waveTime = Date.now() * 0.002
      for (let i = 0; i < 5; i++) {
        const radius = 100 + i * 80 + Math.sin(waveTime + i) * 20
        ctx.strokeStyle = theme === "red" ? "#ff4444" : "#44ffff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(canvas.width - 100, 100, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay gradiente para melhor legibilidade */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, hsl(var(--background)/0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, hsl(var(--background)/0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
              hsl(var(--background)/0.8) 0%, 
              hsl(var(--background)/0.6) 50%,
              hsl(var(--background)/0.8) 100%
            )
          `,
        }}
      />
    </div>
  )
}
