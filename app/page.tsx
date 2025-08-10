"use client"
import { StartupTransition } from "@/components/magicui/startup-transition"
import { DiscordNotifications } from "@/components/magicui/discord-notifications"
import { LanguageSelector } from "@/components/magicui/language-selector"
import { AvatarCircles } from "@/components/magicui/avatar-circles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Github, Zap, Shield, Gamepad2, Download } from "lucide-react"
import Link from "next/link"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { DockDemo } from "@/components/magicui/dock-demo"
import { AnimatedBackground } from "@/components/magicui/animated-background"
import { useEffect, useState } from "react"
import { useLanguage, type Language } from "@/hooks/use-language"
import { getTranslation } from "@/lib/translations"
import { CustomCursor } from "@/components/magicui/custom-cursor"
import { Terminal, TypingAnimation as TerminalTyping, AnimatedSpan } from "@/components/magicui/terminal"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { useTheme } from "next-themes"
import { AuroraText } from "@/components/magicui/aurora-text"

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
]

const DOWNLOAD_LINK = "https://example.com/download-stumble-league"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 4800)

    return () => clearTimeout(timer)
  }, [])

  const handleLanguageSelect = (selectedLanguage: Language) => {
    changeLanguage(selectedLanguage)
  }

  const handleDownloadClick = () => {
    window.open(DOWNLOAD_LINK, "_blank")
  }

  const TerminalDemo = () => {
    return (
      <div className="w-full flex items-center justify-center">
        <Terminal>
          <TerminalTyping delay={500}>&gt; stumble-league --install</TerminalTyping>
          <AnimatedSpan className="text-green-500" delay={2000}>
            <span>✔ Verificando sistema...</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={2500}>
            <span>✔ Stumble Guys detectado.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={3000}>
            <span>✔ Validando anti-cheat.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={3500}>
            <span>✔ Aplicando melhorias de performance.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={4000}>
            <span>✔ Instalando novos modos de jogo.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={4500}>
            <span>✔ Configurando mapas customizados.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500" delay={5000}>
            <span>✔ Otimizando gráficos.</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-blue-500" delay={5500}>
            <span>ℹ Arquivos atualizados:</span>
            <span className="pl-2">- game/performance.dll</span>
          </AnimatedSpan>
          <TerminalTyping className="text-green-400" delay={6000} speed={30}>
            Sucesso! Stumble League instalado com êxito.
          </TerminalTyping>
          <TerminalTyping className="text-yellow-400" delay={7000} speed={40}>
            Prepare-se para a melhor experiência de jogo!
          </TerminalTyping>
        </Terminal>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StartupTransition />
      <AnimatedBackground />
      <CustomCursor />
      <DiscordNotifications />
      <LanguageSelector onLanguageSelect={handleLanguageSelect} />

      <DockDemo />

      <div
        className={cn(
          "relative transition-all duration-1000 ease-out pt-14",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto px-6">
            <div className="space-y-8">
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-6xl px-4">
                <AuroraText>
                  <em style={{ fontStyle: "italic" }}>{getTranslation(language, "title")}</em>
                </AuroraText>
              </h1>

              <div className="max-w-4xl mx-auto space-y-6 mt-8">
                <TypingAnimation
                  className="text-xl md:text-2xl text-muted-foreground font-medium"
                  startOnView={showContent}
                  speed={50}
                >
                  {getTranslation(language, "subtitle")}
                </TypingAnimation>

                <TypingAnimation
                  className="text-lg md:text-xl text-muted-foreground/80"
                  startOnView={showContent}
                  speed={30}
                >
                  {getTranslation(language, "description")}
                </TypingAnimation>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <RainbowButton onClick={handleDownloadClick}>
                <Download className="mr-2 h-5 w-5" />
                {getTranslation(language, "downloadNow")}
              </RainbowButton>
              <RainbowButton>
                <Github className="mr-2 h-5 w-5" />
                {getTranslation(language, "discord")}
              </RainbowButton>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-muted-foreground">
              <div className="flex items-center space-x-4">
                <AvatarCircles numPeople={99} avatarUrls={avatars} />
                <span className="text-lg font-medium">{getTranslation(language, "activePlayers")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Download className="h-6 w-6" />
                <span className="text-lg font-medium">5K+ {getTranslation(language, "downloads")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {getTranslation(language, "featuresTitle")}
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                {getTranslation(language, "featuresSubtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative h-[500px] flex items-center justify-center">
                <TerminalDemo />
              </div>

              <div className="space-y-8">
                <Card className="bg-card/60 border-border/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-foreground text-xl">
                        {getTranslation(language, "performanceTitle")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TypingAnimation className="text-muted-foreground text-lg">
                      {getTranslation(language, "performanceDesc")}
                    </TypingAnimation>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 border-border/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-foreground text-xl">
                        {getTranslation(language, "anticheatTitle")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TypingAnimation className="text-muted-foreground text-lg">
                      {getTranslation(language, "anticheatDesc")}
                    </TypingAnimation>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 border-border/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Gamepad2 className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-foreground text-xl">
                        {getTranslation(language, "newModesTitle")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TypingAnimation className="text-muted-foreground text-lg">
                      {getTranslation(language, "newModesDesc")}
                    </TypingAnimation>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 py-24 px-6 bg-secondary/10 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
                {getTranslation(language, "latestUpdate")}
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <em style={{ fontStyle: "italic" }}>Stumble League</em> v0.61.6 / 1.4{" "}
              {language === "pt" ? "Disponível!" : "Available!"}
            </h2>
            <TypingAnimation className="text-muted-foreground mb-12 text-xl max-w-3xl mx-auto">
              {language === "pt"
                ? "Nova versão do Stumble League com correções de bugs, melhorias de performance e recursos incríveis para uma experiência ainda melhor."
                : "New version of Stumble League with bug fixes, performance improvements and amazing features for an even better experience."}
            </TypingAnimation>
          </div>
        </div>

        <footer className="relative z-10 py-16 px-6 border-t border-border/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center space-x-8 text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors text-lg">
                {getTranslation(language, "discord")}
              </Link>
              <Link href="/easter-egg" className="hover:text-foreground transition-colors text-lg">
                GitHub
              </Link>
              <Link href="/changelogs" className="hover:text-foreground transition-colors text-lg">
                {getTranslation(language, "changelogs")}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
