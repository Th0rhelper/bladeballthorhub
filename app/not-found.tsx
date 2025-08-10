"use client"

import React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

function NotFoundBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const elements: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
      life: number
      maxLife: number
      rotation: number
      rotationSpeed: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createElement = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      hue: Math.random() * 60 + 340,
      life: 0,
      maxLife: Math.random() * 400 + 200,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    })

    const initElements = () => {
      elements.length = 0
      for (let i = 0; i < 30; i++) {
        elements.push(createElement())
      }
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "hsl(0, 50%, 3%)")
      gradient.addColorStop(0.5, "hsl(15, 60%, 4%)")
      gradient.addColorStop(1, "hsl(345, 50%, 3%)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element, index) => {
        element.x += element.vx
        element.y += element.vy
        element.life++
        element.rotation += element.rotationSpeed

        const lifeCycle = element.life / element.maxLife
        let opacity = element.opacity
        if (lifeCycle < 0.1) {
          opacity *= lifeCycle / 0.1
        } else if (lifeCycle > 0.9) {
          opacity *= (1 - lifeCycle) / 0.1
        }

        if (
          element.life >= element.maxLife ||
          element.x < -50 ||
          element.x > canvas.width + 50 ||
          element.y < -50 ||
          element.y > canvas.height + 50
        ) {
          elements[index] = createElement()
        }

        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.globalAlpha = opacity

        ctx.fillStyle = `hsla(${element.hue}, 80%, 60%, ${opacity})`
        ctx.font = `${element.size}px monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("404", 0, 0)

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initElements()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, hsla(0, 70%, 8%, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsla(15, 70%, 8%, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsla(345, 70%, 8%, 0.2) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  )
}

export default function NotFound() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NotFoundBackground />

      <div className="relative z-10 text-center max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center px-6">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative mb-8"
        >
          <div
            className="text-8xl md:text-9xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 leading-none select-none"
            style={{
              filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.8))",
              textShadow: "0 0 60px rgba(239, 68, 68, 0.9), 0 0 100px rgba(249, 115, 22, 0.6)",
            }}
          >
            404
          </div>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          {language === "pt" ? "Página Perdida" : "Page Lost"}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed"
        >
          {language === "pt"
            ? "Eita! Você se perdeu aqui no <i>Stumble League</i>. Essa página sumiu ou mudou de lugar."
            : "Whoops! You got lost here in <i>Stumble League</i>. This page vanished or moved somewhere else."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
              {language === "pt" ? "Voltar pro Início" : "Back to Home"}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="group bg-transparent border-red-500/50 hover:border-red-500"
          >
            <Link href="/changelogs" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              {language === "pt" ? "Ver Updates" : "View Updates"}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
