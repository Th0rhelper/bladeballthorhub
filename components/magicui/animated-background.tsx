"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const smoothScrollRef = useRef(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    // Garantir que o scroll funcione
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      originalY: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
      life: number
      maxLife: number
      pulse: number
      type: "star" | "diamond" | "hexagon" | "triangle" | "circle" | "square"
      rotation: number
      rotationSpeed: number
      depth: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      const depth = Math.random() * 5 + 1
      const originalY = Math.random() * (canvas.height * 3) - canvas.height
      return {
        x: Math.random() * canvas.width,
        y: originalY,
        originalY: originalY,
        vx: (Math.random() - 0.5) * (0.3 / depth),
        vy: (Math.random() - 0.5) * (0.1 / depth),
        size: (Math.random() * 6 + 2) / depth,
        opacity: (Math.random() * 0.8 + 0.2) / depth,
        hue: theme === "red" ? Math.random() * 60 + 340 : Math.random() * 60 + 180,
        life: 0,
        maxLife: Math.random() * 2000 + 1000,
        pulse: Math.random() * Math.PI * 2,
        type: ["star", "diamond", "hexagon", "triangle", "circle", "square"][Math.floor(Math.random() * 6)] as
          | "star"
          | "diamond"
          | "hexagon"
          | "triangle"
          | "circle"
          | "square",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: ((Math.random() - 0.5) * 0.01) / depth,
        depth: depth,
      }
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 200; i++) {
        particles.push(createParticle())
      }
    }

    const drawShape = (ctx: CanvasRenderingContext2D, particle: any) => {
      const { x, y, size, type, rotation } = particle

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      switch (type) {
        case "star":
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5
            const outerRadius = size
            const innerRadius = size * 0.4
            const outerX = Math.cos(angle) * outerRadius
            const outerY = Math.sin(angle) * outerRadius
            const innerX = Math.cos(angle + Math.PI / 5) * innerRadius
            const innerY = Math.sin(angle + Math.PI / 5) * innerRadius
            if (i === 0) ctx.moveTo(outerX, outerY)
            else ctx.lineTo(outerX, outerY)
            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fill()
          break

        case "diamond":
          ctx.beginPath()
          ctx.moveTo(0, -size)
          ctx.lineTo(size * 0.7, 0)
          ctx.lineTo(0, size)
          ctx.lineTo(-size * 0.7, 0)
          ctx.closePath()
          ctx.fill()
          break

        case "hexagon":
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = Math.cos(angle) * size
            const y = Math.sin(angle) * size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
          break

        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -size)
          ctx.lineTo(-size * 0.866, size * 0.5)
          ctx.lineTo(size * 0.866, size * 0.5)
          ctx.closePath()
          ctx.fill()
          break

        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, size, 0, Math.PI * 2)
          ctx.fill()
          break

        case "square":
          ctx.fillRect(-size / 2, -size / 2, size, size)
          break
      }

      ctx.restore()
    }

    const drawThemeSpecificBackground = (smoothScroll: number) => {
      const time = Date.now() * 0.0003

      if (theme === "red") {
        drawLavaFlows(ctx, time, smoothScroll)
        drawVolcanicParticles(ctx, time, smoothScroll)
        drawMagmaVeins(ctx, time, smoothScroll)
      } else {
        drawOceanWaves(ctx, time, smoothScroll)
        drawIceShards(ctx, time, smoothScroll)
        drawAuroraEffect(ctx, time, smoothScroll)
      }
    }

    const drawLavaFlows = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      ctx.globalAlpha = 0.15

      for (let i = 0; i < 8; i++) {
        const baseY = (canvas.height / 8) * i - canvas.height * 0.5
        const flowY = baseY + smoothScroll * 0.8 // Movimento normal
        const waveOffset = Math.sin(time * 2 + i) * 50

        const gradient = ctx.createLinearGradient(0, flowY - 30, 0, flowY + 30)
        gradient.addColorStop(0, `hsla(${15 + i * 5}, 80%, 50%, 0)`)
        gradient.addColorStop(0.5, `hsla(${10 + i * 3}, 90%, 60%, 0.8)`)
        gradient.addColorStop(1, `hsla(${5 + i * 2}, 80%, 50%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(0, flowY + waveOffset)

        for (let x = 0; x <= canvas.width; x += 20) {
          const waveY = flowY + Math.sin((x + time * 100) * 0.01) * 20 + waveOffset
          ctx.lineTo(x, waveY)
        }

        ctx.lineTo(canvas.width, flowY + 60 + waveOffset)
        ctx.lineTo(0, flowY + 60 + waveOffset)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    const drawVolcanicParticles = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      for (let i = 0; i < 30; i++) {
        const x = (canvas.width / 30) * i + Math.sin(time * 3 + i) * 30
        const baseY = canvas.height * 0.2 + (i % 3) * 200
        const y = baseY + Math.sin(time * 2 + i * 0.5) * 100 + smoothScroll * 0.6
        const size = Math.max(1, Math.abs(Math.sin(time * 4 + i)) * 3 + 2)
        const opacity = Math.abs(Math.sin(time * 5 + i)) * 0.5 + 0.3

        ctx.globalAlpha = opacity
        ctx.fillStyle = `hsl(${Math.abs(Math.sin(time + i)) * 30 + 15}, 90%, 70%)`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = opacity * 0.3
        ctx.beginPath()
        ctx.arc(x, y, size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const drawMagmaVeins = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = `hsl(${Math.sin(time) * 20 + 10}, 80%, 60%)`
      ctx.lineWidth = 2

      for (let i = 0; i < 12; i++) {
        const startX = (canvas.width / 12) * i
        const baseY = -200 + (i % 4) * 150
        const startY = baseY + smoothScroll * 0.5

        ctx.beginPath()
        ctx.moveTo(startX, startY)

        for (let j = 0; j < 15; j++) {
          const x = startX + Math.sin(time + i + j * 0.5) * 100
          const y = startY + j * 80 + Math.cos(time * 1.5 + i + j) * 30
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawOceanWaves = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      ctx.globalAlpha = 0.12

      for (let i = 0; i < 10; i++) {
        const baseY = (canvas.height / 10) * i - canvas.height * 0.3
        const waveY = baseY + smoothScroll * 0.7 // Movimento normal
        const amplitude = 40 + i * 10
        const frequency = 0.008 + i * 0.002

        const gradient = ctx.createLinearGradient(0, waveY - amplitude, 0, waveY + amplitude)
        gradient.addColorStop(0, `hsla(${190 + i * 10}, 70%, 60%, 0)`)
        gradient.addColorStop(0.5, `hsla(${200 + i * 5}, 80%, 70%, 0.9)`)
        gradient.addColorStop(1, `hsla(${210 + i * 3}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(0, waveY)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = waveY + Math.sin((x + time * 80) * frequency) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, waveY + amplitude * 2)
        ctx.lineTo(0, waveY + amplitude * 2)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    const drawIceShards = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      for (let i = 0; i < 25; i++) {
        const x = (canvas.width / 25) * i + Math.cos(time * 2 + i) * 50
        const baseY = canvas.height * 0.1 + (i % 5) * 120
        const y = baseY + Math.sin(time * 1.5 + i * 0.7) * 80 + smoothScroll * 0.5
        const size = Math.max(2, Math.abs(Math.cos(time * 3 + i)) * 4 + 6)
        const rotation = time + i

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.globalAlpha = 0.6

        ctx.fillStyle = `hsl(${180 + Math.abs(Math.sin(time + i)) * 30}, 70%, 80%)`
        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3
          const radius = j % 2 === 0 ? size : size * 0.6
          const px = Math.cos(angle) * radius
          const py = Math.sin(angle) * radius
          if (j === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()

        ctx.globalAlpha = 0.3
        ctx.fillStyle = `hsl(${200 + Math.abs(Math.sin(time + i)) * 20}, 80%, 90%)`
        ctx.beginPath()
        ctx.arc(0, 0, Math.max(1, size * 0.4), 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
      ctx.restore()
    }

    const drawAuroraEffect = (ctx: CanvasRenderingContext2D, time: number, smoothScroll: number) => {
      ctx.save()
      ctx.globalAlpha = 0.08

      for (let i = 0; i < 6; i++) {
        const baseY = i * 150 - 200
        const auroraY = baseY + smoothScroll * 0.4

        const gradient = ctx.createLinearGradient(0, auroraY, canvas.width, auroraY + 200)

        const hue1 = 180 + Math.sin(time + i) * 40
        const hue2 = 220 + Math.cos(time * 1.3 + i) * 40

        gradient.addColorStop(0, `hsla(${hue1}, 80%, 70%, 0)`)
        gradient.addColorStop(0.3, `hsla(${(hue1 + hue2) / 2}, 90%, 80%, 0.8)`)
        gradient.addColorStop(0.7, `hsla(${hue2}, 85%, 75%, 0.6)`)
        gradient.addColorStop(1, `hsla(${hue2 + 20}, 80%, 70%, 0)`)

        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.moveTo(0, auroraY)

        for (let x = 0; x <= canvas.width; x += 20) {
          const y1 = auroraY + Math.sin((x + time * 60) * 0.01 + i) * 50
          ctx.lineTo(x, y1)
        }

        for (let x = canvas.width; x >= 0; x -= 20) {
          const y2 = auroraY + 100 + Math.cos((x + time * 40) * 0.008 + i) * 30
          ctx.lineTo(x, y2)
        }

        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    const animate = () => {
      // Interpolação suave para o scroll
      smoothScrollRef.current += (scrollY - smoothScrollRef.current) * 0.1

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.0003
      const scrollProgress = Math.min(smoothScrollRef.current / 2000, 1)

      if (theme === "red") {
        const baseHue = 0 + Math.sin(time) * 15
        const midHue = 15 + Math.cos(time * 1.2) * 10
        const endHue = 30 + Math.sin(time * 0.8) * 20

        gradient.addColorStop(0, `hsl(${baseHue}, ${30 + scrollProgress * 20}%, ${2 + scrollProgress * 3}%)`)
        gradient.addColorStop(0.3, `hsl(${midHue}, ${40 + scrollProgress * 30}%, ${3 + scrollProgress * 4}%)`)
        gradient.addColorStop(0.7, `hsl(${endHue}, ${35 + scrollProgress * 25}%, ${2 + scrollProgress * 3}%)`)
        gradient.addColorStop(1, `hsl(${baseHue + 10}, ${25 + scrollProgress * 15}%, ${1 + scrollProgress * 2}%)`)
      } else {
        const baseHue = 200 + Math.sin(time) * 20
        const midHue = 220 + Math.cos(time * 1.1) * 15
        const endHue = 180 + Math.sin(time * 0.9) * 25

        gradient.addColorStop(0, `hsl(${baseHue}, ${40 + scrollProgress * 20}%, ${2 + scrollProgress * 3}%)`)
        gradient.addColorStop(0.3, `hsl(${midHue}, ${50 + scrollProgress * 30}%, ${3 + scrollProgress * 4}%)`)
        gradient.addColorStop(0.7, `hsl(${endHue}, ${45 + scrollProgress * 25}%, ${2 + scrollProgress * 3}%)`)
        gradient.addColorStop(1, `hsl(${baseHue + 20}, ${30 + scrollProgress * 15}%, ${1 + scrollProgress * 2}%)`)
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawThemeSpecificBackground(smoothScrollRef.current)

      particles.forEach((particle, index) => {
        // Movimento descendente com parallax
        const parallaxMultiplier = 0.3 + particle.depth * 0.2
        const finalY = particle.originalY + smoothScrollRef.current * parallaxMultiplier

        // Movimento próprio da partícula
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        particle.pulse += 0.02
        particle.rotation += particle.rotationSpeed

        // Flutuação suave
        const floatX = Math.sin(particle.life * 0.008) * 0.5
        const floatY = Math.cos(particle.life * 0.01) * 0.3

        const displayX = particle.x + floatX
        const displayY = finalY + floatY

        const pulse = Math.sin(particle.pulse) * 0.3 + 0.7
        const depthOpacity = particle.opacity * (1 - scrollProgress * 0.2)

        // Reset quando sair da tela
        if (
          particle.life >= particle.maxLife ||
          displayX < -150 ||
          displayX > canvas.width + 150 ||
          displayY > canvas.height + 200
        ) {
          particles[index] = createParticle()
        }

        // Desenhar se visível
        if (displayY > -100 && displayY < canvas.height + 100) {
          // Conexões entre partículas próximas
          particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex && Math.abs(particle.depth - otherParticle.depth) < 2) {
              const otherFinalY = otherParticle.originalY + smoothScrollRef.current * (0.3 + otherParticle.depth * 0.2)
              const otherDisplayX = otherParticle.x + Math.sin(otherParticle.life * 0.008) * 0.5
              const otherDisplayY = otherFinalY + Math.cos(otherParticle.life * 0.01) * 0.3

              const dx = displayX - otherDisplayX
              const dy = displayY - otherDisplayY
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 120 && otherDisplayY > -100 && otherDisplayY < canvas.height + 100) {
                const connectionOpacity = (1 - distance / 120) * 0.06 * depthOpacity
                ctx.strokeStyle = `hsla(${particle.hue}, 60%, 50%, ${connectionOpacity})`
                ctx.lineWidth = 0.5 / particle.depth
                ctx.beginPath()
                ctx.moveTo(displayX, displayY)
                ctx.lineTo(otherDisplayX, otherDisplayY)
                ctx.stroke()
              }
            }
          })

          // Desenhar partícula com efeitos
          const finalSize = particle.size * pulse
          const finalOpacity = Math.max(0, Math.min(1, depthOpacity))

          // Brilho externo
          const outerGradient = ctx.createRadialGradient(displayX, displayY, 0, displayX, displayY, finalSize * 6)
          outerGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${finalOpacity * 0.3})`)
          outerGradient.addColorStop(0.5, `hsla(${particle.hue}, 60%, 50%, ${finalOpacity * 0.1})`)
          outerGradient.addColorStop(1, "transparent")

          ctx.fillStyle = outerGradient
          ctx.beginPath()
          ctx.arc(displayX, displayY, finalSize * 6, 0, Math.PI * 2)
          ctx.fill()

          // Forma principal
          ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${finalOpacity * 0.9})`
          drawShape(ctx, { ...particle, x: displayX, y: displayY, size: finalSize })

          // Núcleo brilhante
          ctx.fillStyle = `hsla(${particle.hue}, 90%, 80%, ${finalOpacity})`
          drawShape(ctx, { ...particle, x: displayX, y: displayY, size: finalSize * 0.6 })

          // Centro ultra-brilhante
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${finalOpacity})`
          drawShape(ctx, { ...particle, x: displayX, y: displayY, size: finalSize * 0.3 })
        }
      })

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
  }, [theme, scrollY]) // Adicionei scrollY como dependência

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Background CSS que desce com scroll */}
      <div
        className="absolute inset-0 transition-all duration-75 ease-out will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`, // Movimento normal
          background:
            theme === "red"
              ? `
                radial-gradient(ellipse at 20% ${30 + scrollY * 0.1}%, hsla(0, 60%, 8%, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 80% ${70 + scrollY * 0.15}%, hsla(15, 70%, 6%, 0.3) 0%, transparent 60%),
                radial-gradient(ellipse at 50% ${20 + scrollY * 0.12}%, hsla(30, 50%, 4%, 0.2) 0%, transparent 70%),
                linear-gradient(${135 + scrollY * 0.05}deg, 
                  hsl(345, 100%, 1%) 0%, 
                  hsl(350, 80%, 2%) 25%,
                  hsl(340, 90%, 1%) 50%,
                  hsl(355, 70%, 2%) 75%,
                  hsl(345, 100%, 1%) 100%
                )
              `
              : `
                radial-gradient(ellipse at 20% ${30 + scrollY * 0.1}%, hsla(200, 60%, 8%, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 80% ${70 + scrollY * 0.15}%, hsla(220, 70%, 6%, 0.3) 0%, transparent 60%),
                radial-gradient(ellipse at 50% ${20 + scrollY * 0.12}%, hsla(180, 50%, 4%, 0.2) 0%, transparent 70%),
                linear-gradient(${135 + scrollY * 0.05}deg, 
                  hsl(210, 100%, 1%) 0%, 
                  hsl(200, 80%, 2%) 25%,
                  hsl(220, 90%, 1%) 50%,
                  hsl(190, 70%, 2%) 75%,
                  hsl(210, 100%, 1%) 100%
                )
              `,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className="absolute inset-0 transition-all duration-75"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background)/${0.05 + scrollY * 0.0002}) 100%)
          `,
        }}
      />
    </div>
  )
}
