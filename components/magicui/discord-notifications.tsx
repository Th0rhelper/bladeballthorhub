"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/translations"

interface NotificationItem {
  name: string
  description: string
  icon: string
  color: string
  time: string
  id: string
}

const Notification = ({
  name,
  description,
  icon,
  color,
  time,
  onClose,
}: NotificationItem & { onClose: () => void }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[350px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-card/90 backdrop-blur-md border border-border/50",
        "shadow-lg hover:shadow-xl",
      )}
      onClick={() => window.open("https://discord.gg/stumbleleague", "_blank")}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50 transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-foreground">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-muted-foreground">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export function DiscordNotifications() {
  const [notifications, setNotifications] = useState<(NotificationItem & { id: string })[]>([])
  const { language } = useLanguage()

  // Função para tocar som de notificação
  const playNotificationSound = () => {
    try {
      // Criar um contexto de áudio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Criar um oscilador para gerar o som
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      // Conectar oscilador -> gain -> saída
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configurar o som (frequência e tipo)
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // Nota aguda
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1) // Desce um pouco

      // Configurar o volume (envelope)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01) // Fade in rápido
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3) // Fade out

      // Tocar o som
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      // Fallback: tentar usar um beep simples do sistema
      console.log("🔔 Notification sound (audio context failed)")

      // Alternativa: criar um elemento audio com data URL
      try {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        )
        audio.volume = 0.3
        audio.play().catch(() => {
          console.log("🔔 Notification (silent)")
        })
      } catch {
        console.log("🔔 Notification (silent)")
      }
    }
  }

  const getDiscordNotifications = () => [
    {
      name: getTranslation(language, "discordNotifications.joinDiscord.name"),
      description: getTranslation(language, "discordNotifications.joinDiscord.description"),
      icon: "💬",
      color: "#5865F2",
      time: language === "pt" ? "agora" : "now",
    },
    {
      name: getTranslation(language, "discordNotifications.tournaments.name"),
      description: getTranslation(language, "discordNotifications.tournaments.description"),
      icon: "🏆",
      color: "#5865F2",
      time: language === "pt" ? "agora" : "now",
    },
    {
      name: getTranslation(language, "discordNotifications.community.name"),
      description: getTranslation(language, "discordNotifications.community.description"),
      icon: "👥",
      color: "#5865F2",
      time: language === "pt" ? "agora" : "now",
    },
    {
      name: getTranslation(language, "discordNotifications.support.name"),
      description: getTranslation(language, "discordNotifications.support.description"),
      icon: "🛠️",
      color: "#5865F2",
      time: language === "pt" ? "agora" : "now",
    },
  ]

  useEffect(() => {
    const showNotification = () => {
      const discordNotifications = getDiscordNotifications()
      const randomNotification = discordNotifications[Math.floor(Math.random() * discordNotifications.length)]
      const newNotification = {
        ...randomNotification,
        id: Date.now().toString(),
      }

      // Tocar som antes de mostrar a notificação
      playNotificationSound()

      setNotifications((prev) => [...prev, newNotification])

      // Remove notification after 8 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
      }, 8000)
    }

    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(showNotification, 10000)

    // Then show every 2 minutes
    const interval = setInterval(showNotification, 120000) // 2 minutes

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [language])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 max-w-[350px]">
      <AnimatedList delay={500}>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} onClose={() => removeNotification(notification.id)} />
        ))}
      </AnimatedList>
    </div>
  )
}
