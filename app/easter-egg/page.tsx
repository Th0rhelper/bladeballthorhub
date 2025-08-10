"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Home, FileText, Gamepad2, Star, Trophy, Crown } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { CustomCursor } from "@/components/magicui/custom-cursor"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
}

interface GameObject {
  x: number
  y: number
  z: number
  width: number
  height: number
  depth: number
}

interface Obstacle extends GameObject {
  passed: boolean
  type: "low" | "high" | "double" | "moving"
  moveDirection?: number
  color: string
}

interface Collectible extends GameObject {
  collected: boolean
  type: "coin" | "gem" | "star"
  rotation: number
  pulse: number
}

interface BackgroundElement {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  pulse: number
  type: "glitch" | "error" | "warning" | "code"
  rotation: number
  rotationSpeed: number
}

function EasterEggBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [secretMode, setSecretMode] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const elements: BackgroundElement[] = []

    const errorSymbols = ["404", "ERR", "NULL", "VOID", "???", "X", "!", "⚠", "💀", "🚫"]
    const codeSymbols = ["</>", "{}", "[]", "()", "//", "/*", "*/", "&&", "||", "!="]
    const glitchSymbols = ["█", "▓", "▒", "░", "▄", "▀", "■", "□", "▪", "▫"]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createElement = (): BackgroundElement => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 30 + 10,
      opacity: Math.random() * 0.6 + 0.2,
      hue: secretMode ? Math.random() * 360 : Math.random() * 60 + 340,
      life: 0,
      maxLife: Math.random() * 600 + 400,
      pulse: Math.random() * Math.PI * 2,
      type: ["glitch", "error", "warning", "code"][Math.floor(Math.random() * 4)] as
        | "glitch"
        | "error"
        | "warning"
        | "code",
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    })

    const initElements = () => {
      elements.length = 0
      for (let i = 0; i < 60; i++) {
        elements.push(createElement())
      }
    }

    const getSymbol = (type: string) => {
      switch (type) {
        case "error":
          return errorSymbols[Math.floor(Math.random() * errorSymbols.length)]
        case "code":
          return codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
        case "glitch":
          return glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)]
        case "warning":
          return "⚠"
        default:
          return "?"
      }
    }

    const drawFloatingErrors = () => {
      ctx.save()
      ctx.globalAlpha = 0.03
      ctx.strokeStyle = secretMode ? "#ff6b6b" : "#ef4444"
      ctx.lineWidth = 1

      for (let i = 0; i < 15; i++) {
        const x = (canvas.width / 15) * i + ((Date.now() * 0.01) % (canvas.width / 15))
        const y = (canvas.height / 15) * i + ((Date.now() * 0.008) % (canvas.height / 15))

        ctx.beginPath()
        ctx.moveTo(x - 100, y)
        ctx.lineTo(x + 100, y + 50)
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawGlitchGrid = () => {
      ctx.save()
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = secretMode ? "#ff9f43" : "#f97316"
      ctx.lineWidth = 2

      const time = Date.now() * 0.001
      const gridSize = 80

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offset = Math.sin(time + x * 0.01 + y * 0.01) * 10

          ctx.beginPath()
          ctx.rect(x + offset, y + offset, gridSize - 20, gridSize - 20)
          ctx.stroke()
        }
      }
      ctx.restore()
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001

      if (secretMode) {
        const hue1 = (time * 20) % 360
        const hue2 = (time * 25 + 180) % 360
        gradient.addColorStop(0, `hsla(${hue1}, 50%, 8%, 1)`)
        gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 60%, 5%, 1)`)
        gradient.addColorStop(1, `hsla(${hue2}, 50%, 8%, 1)`)
      } else {
        gradient.addColorStop(0, "hsl(0, 50%, 3%)")
        gradient.addColorStop(0.3, "hsl(15, 60%, 4%)")
        gradient.addColorStop(0.7, "hsl(0, 70%, 2%)")
        gradient.addColorStop(1, "hsl(345, 50%, 3%)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawFloatingErrors()
      drawGlitchGrid()

      elements.forEach((element, index) => {
        element.x += element.vx
        element.y += element.vy
        element.life++
        element.pulse += 0.03
        element.rotation += element.rotationSpeed

        if (element.type === "glitch" && Math.random() < 0.05) {
          element.x += (Math.random() - 0.5) * 20
          element.y += (Math.random() - 0.5) * 20
        }

        element.x += Math.sin(element.life * 0.01) * 0.3
        element.y += Math.cos(element.life * 0.012) * 0.2

        const lifeCycle = element.life / element.maxLife
        let opacity = element.opacity
        if (lifeCycle < 0.1) {
          opacity *= lifeCycle / 0.1
        } else if (lifeCycle > 0.9) {
          opacity *= (1 - lifeCycle) / 0.1
        }

        if (
          element.life >= element.maxLife ||
          element.x < -100 ||
          element.x > canvas.width + 100 ||
          element.y < -100 ||
          element.y > canvas.height + 100
        ) {
          elements[index] = createElement()
        }

        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.globalAlpha = opacity

        const glowSize = element.size * 1.5
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)

        let glowColor = `hsla(${element.hue}, 70%, 50%, ${opacity * 0.3})`
        if (element.type === "error") glowColor = `hsla(0, 80%, 50%, ${opacity * 0.4})`
        if (element.type === "warning") glowColor = `hsla(45, 80%, 50%, ${opacity * 0.3})`
        if (element.type === "glitch") glowColor = `hsla(300, 80%, 50%, ${opacity * 0.5})`

        glowGradient.addColorStop(0, glowColor)
        glowGradient.addColorStop(1, "transparent")

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `hsla(${element.hue}, 90%, 70%, ${opacity})`
        ctx.font = `${element.size}px monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(getSymbol(element.type), 0, 0)

        if (element.type === "glitch" && Math.random() < 0.3) {
          ctx.fillStyle = `hsla(${element.hue + 180}, 90%, 70%, ${opacity * 0.5})`
          ctx.fillText(getSymbol(element.type), Math.random() * 4 - 2, Math.random() * 4 - 2)
        }

        ctx.restore()
      })

      if (Math.random() < 0.02) {
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.fillStyle = secretMode ? "#ff6b6b" : "#ef4444"
        const tearY = Math.random() * canvas.height
        ctx.fillRect(0, tearY, canvas.width, 2)
        ctx.restore()
      }

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initElements()
    animate()

    window.addEventListener("resize", resizeCanvas)

    const handleSecretMode = (event: CustomEvent) => {
      setSecretMode(event.detail.active)
    }
    window.addEventListener("secretModeChange", handleSecretMode as EventListener)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("secretModeChange", handleSecretMode as EventListener)
      cancelAnimationFrame(animationId)
    }
  }, [secretMode])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className="absolute inset-0"
        style={{
          background: secretMode
            ? `
              radial-gradient(circle at 25% 25%, hsla(300, 70%, 10%, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsla(60, 70%, 10%, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, hsla(180, 70%, 10%, 0.2) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 25% 25%, hsla(0, 70%, 8%, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsla(15, 70%, 8%, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, hsla(345, 70%, 8%, 0.2) 0%, transparent 50%)
            `,
        }}
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${secretMode ? "#ff6b6b" : "#ef4444"} 2px,
            ${secretMode ? "#ff6b6b" : "#ef4444"} 4px
          )`,
        }}
      />
    </div>
  )
}

export default function EasterEggPage() {
  const { language } = useLanguage()
  const [clickCount, setClickCount] = useState(0)
  const [showClickHint, setShowClickHint] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [secretMode, setSecretMode] = useState(false)
  const [showSecretButton, setShowSecretButton] = useState(false)
  const [easterEggMessages, setEasterEggMessages] = useState<string[]>([])
  const [showGame, setShowGame] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [isDucking, setIsDucking] = useState(false)
  const [gameRunning, setGameRunning] = useState(false)
  const [gameSpeed, setGameSpeed] = useState(3)
  const [player, setPlayer] = useState<GameObject>({ x: 100, y: 300, z: 0, width: 40, height: 40, depth: 40 })
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [collectibles, setCollectibles] = useState<Collectible[]>([])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const keysPressed = useRef<Set<string>>(new Set())

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  const easterEggTexts = [
    language === "pt" ? "🎮 Opa! Achou um segredo!" : "🎮 Hey! Found a secret!",
    language === "pt" ? "🚀 Modo secreto ativo!" : "🚀 Secret mode active!",
    language === "pt" ? "⭐ Eita! Você é bom nisso!" : "⭐ Wow! You're good at this!",
    language === "pt" ? "🎯 Você é demais!" : "🎯 You rock!",
    language === "pt" ? "🏆 Mestre dos segredos!" : "🏆 Secret master!",
    language === "pt" ? "💎 Achado épico!" : "💎 Epic find!",
    language === "pt" ? "🌟 Desbloqueou algo especial!" : "🌟 Unlocked something special!",
    language === "pt" ? "🎊 Demais! Continue explorando!" : "🎊 Awesome! Keep exploring!",
  ]

  useEffect(() => {
    const savedHighScore = localStorage.getItem("league-runner-highscore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecretButton(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clickCount >= 4) {
      setShowClickHint(true)
    }
  }, [clickCount])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("secretModeChange", { detail: { active: secretMode } }))
  }, [secretMode])

  const handleNumberClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount === 7) {
      activateEasterEgg()
      setClickCount(0)
      setShowClickHint(false)
    }
  }

  const activateEasterEgg = () => {
    const randomMessage = easterEggTexts[Math.floor(Math.random() * easterEggTexts.length)]
    setEasterEggMessages((prev) => [...prev, randomMessage])

    setTimeout(() => {
      setEasterEggMessages((prev) => prev.slice(1))
    }, 4000)
  }

  const activateSecretMode = () => {
    setSecretMode(true)
    activateEasterEgg()
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      keysPressed.current.add(event.code)

      if (event.code === konamiCode[konamiSequence.length]) {
        const newSequence = [...konamiSequence, event.code]
        setKonamiSequence(newSequence)

        if (newSequence.length === konamiCode.length) {
          activateSecretMode()
          setKonamiSequence([])
        }
      } else {
        setKonamiSequence([])
      }

      // Game controls - WASD
      if (showGame && gameRunning && !gameOver) {
        event.preventDefault()

        if ((event.code === "KeyW" || event.code === "Space") && !isJumping) {
          jump()
        }
        if (event.code === "KeyS" && !isDucking) {
          duck()
        }
      }
    },
    [konamiSequence, showGame, gameRunning, gameOver, isJumping, isDucking],
  )

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    keysPressed.current.delete(event.code)

    if (event.code === "KeyS") {
      setIsDucking(false)
      setPlayer((prev) => ({ ...prev, y: 300, height: 40 }))
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyPress, handleKeyUp])

  const draw3DBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    color: string,
  ) => {
    const perspective = 0.6
    const offsetX = z * perspective
    const offsetY = z * perspective * 0.5

    // Front face
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)

    // Top face
    ctx.fillStyle = adjustBrightness(color, 20)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + offsetX, y - offsetY)
    ctx.lineTo(x + width + offsetX, y - offsetY)
    ctx.lineTo(x + width, y)
    ctx.closePath()
    ctx.fill()

    // Right face
    ctx.fillStyle = adjustBrightness(color, -20)
    ctx.beginPath()
    ctx.moveTo(x + width, y)
    ctx.lineTo(x + width + offsetX, y - offsetY)
    ctx.lineTo(x + width + offsetX, y + height - offsetY)
    ctx.lineTo(x + width, y + height)
    ctx.closePath()
    ctx.fill()

    // Outline
    ctx.strokeStyle = adjustBrightness(color, -40)
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, width, height)
  }

  const adjustBrightness = (color: string, amount: number) => {
    const hex = color.replace("#", "")
    const r = Math.max(0, Math.min(255, Number.parseInt(hex.substr(0, 2), 16) + amount))
    const g = Math.max(0, Math.min(255, Number.parseInt(hex.substr(2, 2), 16) + amount))
    const b = Math.max(0, Math.min(255, Number.parseInt(hex.substr(4, 2), 16) + amount))
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  const startGame = () => {
    setShowGame(true)
    setGameOver(false)
    setGameScore(0)
    setGameSpeed(3)
    setPlayer({ x: 100, y: 300, z: 0, width: 40, height: 40, depth: 40 })
    setObstacles([])
    setCollectibles([])
    particlesRef.current = []
    setIsJumping(false)
    setIsDucking(false)
    setGameRunning(true)

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }

    gameLoop()
  }

  const jump = () => {
    if (isJumping || isDucking) return
    setIsJumping(true)

    let jumpHeight = 0
    const jumpInterval = setInterval(() => {
      jumpHeight += 8
      setPlayer((prev) => ({ ...prev, y: 300 - jumpHeight }))

      if (jumpHeight >= 120) {
        clearInterval(jumpInterval)
        const fallInterval = setInterval(() => {
          jumpHeight -= 8
          setPlayer((prev) => ({ ...prev, y: 300 - jumpHeight }))

          if (jumpHeight <= 0) {
            clearInterval(fallInterval)
            setPlayer((prev) => ({ ...prev, y: 300 }))
            setIsJumping(false)
          }
        }, 20)
      }
    }, 20)
  }

  const duck = () => {
    if (isJumping || isDucking) return
    setIsDucking(true)
    setPlayer((prev) => ({ ...prev, y: 340, height: 20 }))
  }

  const gameLoop = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    if (secretMode) {
      gradient.addColorStop(0, "#1a1a2e")
      gradient.addColorStop(1, "#16213e")
    } else {
      gradient.addColorStop(0, "#000011")
      gradient.addColorStop(1, "#001122")
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw game elements
    updateGame()
    drawGame(ctx)

    if (gameRunning && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
  }

  const updateGame = () => {
    // Move obstacles
    setObstacles((prev) => {
      const updated = prev
        .map((obstacle) => {
          const newObstacle = { ...obstacle, x: obstacle.x - gameSpeed }

          // Moving obstacles
          if (obstacle.type === "moving" && obstacle.moveDirection !== undefined) {
            newObstacle.y += obstacle.moveDirection * 2
            if (newObstacle.y <= 200 || newObstacle.y >= 350) {
              newObstacle.moveDirection = -obstacle.moveDirection
            }
          }

          return newObstacle
        })
        .filter((obstacle) => obstacle.x > -obstacle.width - obstacle.depth)

      // Add new obstacles
      const lastObstacle = updated[updated.length - 1]
      if (!lastObstacle || lastObstacle.x < 600) {
        const obstacleTypes = ["low", "high", "double", "moving"]
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)] as
          | "low"
          | "high"
          | "double"
          | "moving"

        const newObstacles: Obstacle[] = []

        switch (type) {
          case "low":
            newObstacles.push({
              x: 900,
              y: 320,
              z: Math.random() * 20,
              width: 30,
              height: 60,
              depth: 30,
              passed: false,
              type: "low",
              color: secretMode ? "#ff6b6b" : "#ef4444",
            })
            break
          case "high":
            newObstacles.push({
              x: 900,
              y: 200,
              z: Math.random() * 20,
              width: 30,
              height: 80,
              depth: 30,
              passed: false,
              type: "high",
              color: secretMode ? "#ff9f43" : "#fbbf24",
            })
            break
          case "double":
            newObstacles.push({
              x: 900,
              y: 200,
              z: Math.random() * 20,
              width: 30,
              height: 60,
              depth: 30,
              passed: false,
              type: "double",
              color: secretMode ? "#a855f7" : "#8b5cf6",
            })
            newObstacles.push({
              x: 900,
              y: 340,
              z: Math.random() * 20,
              width: 30,
              height: 40,
              depth: 30,
              passed: false,
              type: "double",
              color: secretMode ? "#a855f7" : "#8b5cf6",
            })
            break
          case "moving":
            newObstacles.push({
              x: 900,
              y: 280,
              z: Math.random() * 20,
              width: 35,
              height: 50,
              depth: 35,
              passed: false,
              type: "moving",
              moveDirection: Math.random() > 0.5 ? 1 : -1,
              color: secretMode ? "#10b981" : "#059669",
            })
            break
        }

        updated.push(...newObstacles)
      }

      // Check for score
      updated.forEach((obstacle) => {
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
          obstacle.passed = true
          setGameScore((prev) => prev + 1)
        }
      })

      return updated
    })

    // Move collectibles
    setCollectibles((prev) => {
      const updated = prev
        .map((collectible) => ({
          ...collectible,
          x: collectible.x - gameSpeed,
          rotation: collectible.rotation + 0.1,
          pulse: collectible.pulse + 0.05,
        }))
        .filter((collectible) => collectible.x > -collectible.width - collectible.depth)

      // Add new collectibles
      if (Math.random() < 0.03) {
        const types = ["coin", "gem", "star"] as const
        const type = types[Math.floor(Math.random() * types.length)]

        updated.push({
          x: 900,
          y: 200 + Math.random() * 150,
          z: Math.random() * 30,
          width: 20,
          height: 20,
          depth: 20,
          collected: false,
          type,
          rotation: 0,
          pulse: 0,
        })
      }

      // Check for collection
      updated.forEach((collectible) => {
        if (
          !collectible.collected &&
          player.x < collectible.x + collectible.width &&
          player.x + player.width > collectible.x &&
          player.y < collectible.y + collectible.height &&
          player.y + player.height > collectible.y
        ) {
          collectible.collected = true
          const points = collectible.type === "coin" ? 5 : collectible.type === "gem" ? 10 : 20
          setGameScore((prev) => prev + points)
        }
      })

      return updated.filter((c) => !c.collected)
    })

    // Check collisions with obstacles
    obstacles.forEach((obstacle) => {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        endGame()
      }
    })

    // Increase speed over time
    setGameSpeed((prev) => prev + 0.002)
  }

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    // Draw ground with 3D effect
    ctx.fillStyle = secretMode ? "#16213e" : "#333333"
    ctx.fillRect(0, 380, ctx.canvas.width, 20)

    // Ground shadow
    ctx.fillStyle = secretMode ? "#0f1419" : "#222222"
    ctx.fillRect(0, 400, ctx.canvas.width, 10)

    // Draw player with 3D effect
    const playerColor = secretMode ? "#e94560" : "#06b6d4"
    draw3DBox(ctx, player.x, player.y, player.z, player.width, player.height, player.depth, playerColor)

    // Draw obstacles with 3D effect
    obstacles.forEach((obstacle) => {
      draw3DBox(
        ctx,
        obstacle.x,
        obstacle.y,
        obstacle.z,
        obstacle.width,
        obstacle.height,
        obstacle.depth,
        obstacle.color,
      )
    })

    // Draw collectibles with 3D effect and animation
    collectibles.forEach((collectible) => {
      const pulse = Math.sin(collectible.pulse) * 0.2 + 1
      const size = collectible.width * pulse

      let color = "#ffd700"
      if (collectible.type === "gem") color = "#ff69b4"
      if (collectible.type === "star") color = "#00ffff"

      ctx.save()
      ctx.translate(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2)
      ctx.rotate(collectible.rotation)

      // Glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      glowGradient.addColorStop(0, color + "80")
      glowGradient.addColorStop(1, "transparent")
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(0, 0, size * 2, 0, Math.PI * 2)
      ctx.fill()

      // Main shape
      ctx.fillStyle = color
      if (collectible.type === "star") {
        // Draw star
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5
          const outerRadius = size / 2
          const innerRadius = size / 4
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
      } else {
        // Draw circle for coin/gem
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    })

    // Draw UI
    ctx.fillStyle = secretMode ? "#e94560" : "#ffffff"
    ctx.font = "bold 24px monospace"
    ctx.fillText(`Score: ${gameScore}`, 20, 40)
    ctx.fillText(`High: ${highScore}`, 20, 70)

    // Draw speed indicator
    ctx.font = "16px monospace"
    ctx.fillText(`Speed: ${gameSpeed.toFixed(1)}x`, 20, 100)

    // Draw controls
    ctx.font = "14px monospace"
    ctx.fillStyle = secretMode ? "#ff9f43" : "#fbbf24"
    ctx.fillText("W/SPACE: Pular | S: Abaixar", ctx.canvas.width - 250, 30)

    // Draw collectible legend
    ctx.fillText("🪙 +5  💎 +10  ⭐ +20", ctx.canvas.width - 200, 60)
  }

  const endGame = () => {
    setGameRunning(false)
    setGameOver(true)

    if (gameScore > highScore) {
      setHighScore(gameScore)
      localStorage.setItem("league-runner-highscore", gameScore.toString())
    }
  }

  const closeGame = () => {
    setShowGame(false)
    setGameRunning(false)
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <EasterEggBackground />
      <CustomCursor />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="relative">
            <h1
              className={cn(
                "text-8xl md:text-9xl lg:text-[10rem] font-black cursor-pointer select-none transition-all duration-300 hover:scale-105",
                secretMode
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500",
              )}
              onClick={handleNumberClick}
              style={{
                filter: secretMode
                  ? "drop-shadow(0 0 30px rgba(255, 107, 107, 0.8))"
                  : "drop-shadow(0 0 30px rgba(239, 68, 68, 0.6))",
                textShadow: secretMode
                  ? "0 0 60px rgba(255, 107, 107, 0.9), 0 0 100px rgba(255, 20, 147, 0.6)"
                  : "0 0 60px rgba(239, 68, 68, 0.8), 0 0 100px rgba(249, 115, 22, 0.6)",
              }}
            >
              404
            </h1>

            {showClickHint && (
              <Badge
                variant="secondary"
                className={cn(
                  "absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce",
                  secretMode
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    : "bg-red-500/20 text-red-300 border-red-400/30",
                )}
              >
                {clickCount}/7 {language === "pt" ? "cliques" : "clicks"}
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <h2 className={cn("text-4xl md:text-6xl font-bold", secretMode ? "text-yellow-300" : "text-white")}>
              {language === "pt" ? "Página Perdida" : "Page Lost"}
            </h2>

            <p
              className={cn(
                "text-xl md:text-2xl max-w-2xl mx-auto",
                secretMode ? "text-yellow-200/80" : "text-gray-300",
              )}
            >
              {language === "pt"
                ? "Eita! Você se perdeu aqui no StumbleLeague. Mas ei, achou uns segredos!"
                : "Whoops! You got lost here in StumbleLeague. But hey, you found some secrets!"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              asChild
              size="lg"
              className={cn(
                "text-lg px-8 py-3 group relative overflow-hidden",
                secretMode
                  ? "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600"
                  : "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700",
              )}
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {language === "pt" ? "Voltar pro Início" : "Back to Home"}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "text-lg px-8 py-3 group bg-transparent",
                secretMode
                  ? "border-yellow-400 text-yellow-300 hover:bg-yellow-400/10"
                  : "border-red-400 text-red-300 hover:bg-red-400/10",
              )}
            >
              <Link href="/changelogs">
                <FileText className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                {language === "pt" ? "Ver Updates" : "View Updates"}
              </Link>
            </Button>
          </div>

          {/* Game Button - More prominent */}
          <div className="mb-8">
            <Button
              onClick={startGame}
              size="lg"
              className={cn(
                "group relative overflow-hidden text-lg px-8 py-4",
                secretMode
                  ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 hover:from-green-500 hover:via-emerald-600 hover:to-teal-700"
                  : "bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 hover:from-green-600 hover:via-emerald-700 hover:to-green-800",
                "shadow-lg hover:shadow-xl transition-all duration-500 animate-pulse hover:animate-none",
              )}
            >
              <Gamepad2 className="w-6 h-6 mr-2 transition-transform group-hover:scale-110" />
              {language === "pt" ? "🎮 LEAGUE RUNNER!" : "🎮 LEAGUE RUNNER!"}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>

          <div className="pt-8">
            <p className={cn("text-sm", secretMode ? "text-yellow-300/60" : "text-gray-400")}>
              {language === "pt"
                ? "🎮 Jogue o League Runner 3D com obstáculos e coletáveis!"
                : "🎮 Play League Runner 3D with obstacles and collectibles!"}
            </p>
          </div>
        </div>

        {showSecretButton && (
          <Button
            onClick={activateEasterEgg}
            className={cn(
              "fixed top-4 right-4 animate-bounce hover:scale-110 transition-transform",
              secretMode
                ? "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600"
                : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600",
            )}
            size="sm"
          >
            {secretMode ? <Crown className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {easterEggMessages.map((message, index) => (
        <div key={index} className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-500">
          <Card
            className={cn(
              "border-2 backdrop-blur-sm",
              secretMode
                ? "bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-yellow-400/50"
                : "bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/50",
            )}
          >
            <CardContent className="p-4">
              <p className={cn("font-medium", secretMode ? "text-yellow-200" : "text-green-200")}>{message}</p>
            </CardContent>
          </Card>
        </div>
      ))}

      {showGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">🎮 League Runner 3D</h3>
              <Button onClick={closeGame} variant="outline" size="sm">
                ✕
              </Button>
            </div>

            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>Score: {gameScore} pontos</span>
              <span>High Score: {highScore}</span>
              <span>Speed: {gameSpeed.toFixed(1)}x</span>
            </div>

            <canvas
              ref={canvasRef}
              width={900}
              height={420}
              className="border-2 border-gray-300 rounded mb-4 w-full bg-black"
              style={{ maxWidth: "100%" }}
            />

            {gameOver ? (
              <div className="text-center space-y-2">
                <p className="text-gray-800 font-bold text-lg">Game Over!</p>
                <p className="text-sm text-gray-600">Final Score: {gameScore} pontos</p>
                {gameScore === highScore && gameScore > 0 && (
                  <p className="text-yellow-600 font-bold flex items-center justify-center animate-bounce">
                    <Trophy className="h-4 w-4 mr-1" />
                    Novo Recorde!
                  </p>
                )}
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {language === "pt" ? "Jogar Novamente" : "Play Again"}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {language === "pt"
                    ? "W/SPACE: Pular | S: Abaixar | Colete: 🪙💎⭐"
                    : "W/SPACE: Jump | S: Duck | Collect: 🪙💎⭐"}
                </p>
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {language === "pt" ? "Iniciar Jogo" : "Start Game"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
