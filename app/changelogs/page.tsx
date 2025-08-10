"use client"

import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SmoothCursor } from "@/components/magicui/smooth-cursor"
import { ArrowLeft, Calendar, Download, Bug, Plus, Zap, Shield, GitCommit } from "lucide-react"
import Link from "next/link"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { ChangelogBackground } from "@/components/magicui/changelog-background"
import { useLanguage } from "@/hooks/use-language"

const DOWNLOAD_LINK = "https://example.com/download-stumble-league"

const getChangelogs = (language: "pt" | "en") => [
  {
    version: "1.4.0",
    codename: "Velocity",
    date: "2024-01-15",
    type: "major",
    downloadCount: "12.5K",
    commitHash: "a7b3c9d",
    changes: [
      {
        type: "fix",
        text:
          language === "pt"
            ? "Resolução de múltiplos problemas críticos de estabilidade que afetavam significativamente a performance do jogo"
            : "Resolved multiple critical stability issues that significantly affected game performance",
        impact: "high",
      },
      {
        type: "fix",
        text:
          language === "pt"
            ? "Correção de artefatos visuais no sistema de temas que causavam distorções gráficas em elementos específicos da interface"
            : "Fixed theme rendering artifacts causing visual distortions on specific UI elements",
        impact: "medium",
      },
      {
        type: "security",
        text:
          language === "pt"
            ? "Aprimoramento substancial do sistema de proteção anti-cheat com implementação de algoritmos de detecção de última geração"
            : "Substantial enhancement of anti-cheat protection system with implementation of next-generation detection algorithms",
        impact: "high",
      },
      {
        type: "performance",
        text:
          language === "pt"
            ? "Otimização completa do processo de inicialização do jogo, resultando em redução de 60% no tempo de startup e melhor responsividade geral"
            : "Complete optimization of game initialization process, resulting in 60% reduction in startup time and improved overall responsiveness",
        impact: "high",
      },
      {
        type: "feature",
        text:
          language === "pt"
            ? 'Implementação do sistema de inventário persistente com associação dinâmica de itens. Os itens do jogador agora são exibidos junto ao nome de usuário (ex: "jogador [W]"), mantendo a vinculação mesmo após alterações de username'
            : 'Implementation of persistent inventory system with dynamic item association. Player items are now displayed alongside username (e.g., "player [W]"), maintaining binding even after username changes',
        impact: "high",
      },
      {
        type: "improvement",
        text:
          language === "pt"
            ? "Diversas otimizações de performance, refinamentos na experiência do usuário e melhorias na qualidade geral do sistema"
            : "Various performance optimizations, user experience refinements, and overall system quality improvements",
        impact: "medium",
      },
    ],
    stats: {
      filesChanged: 20,
      linesAdded: 10000,
      linesRemoved: 298,
      contributors: 3,
    },
  },
]

const getChangeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus className="h-4 w-4 text-emerald-400" />
    case "improvement":
      return <Zap className="h-4 w-4 text-blue-400" />
    case "performance":
      return <Zap className="h-4 w-4 text-purple-400" />
    case "fix":
      return <Bug className="h-4 w-4 text-red-400" />
    case "security":
      return <Shield className="h-4 w-4 text-orange-400" />
    default:
      return <GitCommit className="h-4 w-4 text-gray-400" />
  }
}

const getVersionBadge = (type: string, language: "pt" | "en") => {
  switch (type) {
    case "major":
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-semibold">
          {language === "pt" ? "Versão Principal" : "Major Release"}
        </Badge>
      )
    case "minor":
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-semibold">
          {language === "pt" ? "Atualização Menor" : "Minor Update"}
        </Badge>
      )
    case "patch":
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-semibold">
          {language === "pt" ? "Correção" : "Patch"}
        </Badge>
      )
    default:
      return <Badge variant="secondary">{language === "pt" ? "Atualização" : "Update"}</Badge>
  }
}

const getImpactBadge = (impact: string, language: "pt" | "en") => {
  switch (impact) {
    case "high":
      return (
        <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
          {language === "pt" ? "Alto Impacto" : "High Impact"}
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
          {language === "pt" ? "Médio Impacto" : "Medium Impact"}
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
          {language === "pt" ? "Baixo Impacto" : "Low Impact"}
        </Badge>
      )
    default:
      return null
  }
}

const getChangeTypeLabel = (type: string, language: "pt" | "en") => {
  const labels = {
    pt: {
      feature: "Nova Funcionalidade",
      improvement: "Melhoria",
      performance: "Performance",
      fix: "Correção de Bug",
      security: "Segurança",
      default: "Mudança",
    },
    en: {
      feature: "New Feature",
      improvement: "Enhancement",
      performance: "Performance",
      fix: "Bug Fix",
      security: "Security",
      default: "Change",
    },
  }

  return labels[language][type as keyof typeof labels.pt] || labels[language].default
}

const processChangeText = (text: string) => {
  let processedText = text

  // Destacar [W] em verde
  processedText = processedText.replace(
    /(\[W\])/g,
    '<span class="text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded-md border border-emerald-400/20">[W]</span>',
  )

  // Destacar W sozinho em verde mais claro
  processedText = processedText.replace(
    /\b(W)\b(?![^<]*>)/g,
    '<span class="text-emerald-300 font-semibold bg-emerald-300/10 px-1 py-0.5 rounded">W</span>',
  )

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />
}

const getTranslations = (language: "pt" | "en") => ({
  backToHome: language === "pt" ? "Voltar ao Início" : "Back to Home",
  downloadLatest: language === "pt" ? "Baixar Última Versão" : "Download Latest",
  releaseNotes: language === "pt" ? "Notas de Lançamento" : "Release Notes",
  subtitle:
    language === "pt"
      ? "Mantenha-se atualizado com as últimas funcionalidades, melhorias e correções de bugs do Stumble League"
      : "Stay up to date with the latest features, improvements, and bug fixes in Stumble League",
  filesChanged: language === "pt" ? "Arquivos Alterados" : "Files Changed",
  linesAdded: language === "pt" ? "Linhas Adicionadas" : "Lines Added",
  linesRemoved: language === "pt" ? "Linhas Removidas" : "Lines Removed",
  contributors: language === "pt" ? "Contribuidores" : "Contributors",
  whatChanged: language === "pt" ? "O que mudou" : "What's Changed",
  viewPrevious: language === "pt" ? "Ver Versões Anteriores" : "View Previous Releases",
  footerText:
    language === "pt"
      ? "Stumble League - Mod não oficial para Stumble Guys"
      : "Stumble League - Unofficial mod for Stumble Guys",
  footerSubtext:
    language === "pt"
      ? "Feito com ❤️ pela comunidade • Código aberto no GitHub"
      : "Built with ❤️ by the community • Open source on GitHub",
})

export default function ChangelogsPage() {
  const { language } = useLanguage()
  const changelogs = getChangelogs(language)
  const t = getTranslations(language)

  const handleDownloadClick = () => {
    window.open(DOWNLOAD_LINK, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 transition-all duration-500">
      <SmoothCursor />
      <ChangelogBackground />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6">
        <Link href="/">
          <InteractiveHoverButton>
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t.backToHome}
          </InteractiveHoverButton>
        </Link>
        <RainbowButton onClick={handleDownloadClick}>
          <Download className="mr-2 h-4 w-4" />
          {t.downloadLatest}
        </RainbowButton>
      </nav>

      {/* Header */}
      <div className="relative z-10 text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
          {t.releaseNotes}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Changelogs */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          {changelogs.map((changelog, index) => (
            <Card
              key={changelog.version}
              className="bg-card/60 border-border/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <CardHeader className="pb-6 border-b border-border/50">
                <div className="flex items-start justify-between flex-wrap gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-3xl font-bold text-foreground">v{changelog.version}</CardTitle>
                      {changelog.codename && (
                        <Badge variant="outline" className="text-sm font-medium">
                          "{changelog.codename}"
                        </Badge>
                      )}
                      {getVersionBadge(changelog.type, language)}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(changelog.date).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>{changelog.downloadCount} downloads</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GitCommit className="h-4 w-4" />
                        <span className="font-mono">{changelog.commitHash}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Release Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-secondary/20 rounded-lg border border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{changelog.stats.filesChanged}</div>
                    <div className="text-xs text-muted-foreground">{t.filesChanged}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      +{changelog.stats.linesAdded.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.linesAdded}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">-{changelog.stats.linesRemoved}</div>
                    <div className="text-xs text-muted-foreground">{t.linesRemoved}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{changelog.stats.contributors}</div>
                    <div className="text-xs text-muted-foreground">{t.contributors}</div>
                  </div>
                </div>

                {/* Changes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t.whatChanged}</h3>
                  {changelog.changes.map((change, changeIndex) => (
                    <div
                      key={changeIndex}
                      className="group p-4 rounded-lg border border-border/30 hover:border-border/50 hover:bg-secondary/10 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getChangeIcon(change.type)}</div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              {getChangeTypeLabel(change.type, language)}
                            </span>
                            {getImpactBadge(change.impact, language)}
                          </div>
                          <p className="text-foreground leading-relaxed">{processChangeText(change.text)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <InteractiveHoverButton>{t.viewPrevious}</InteractiveHoverButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground text-lg">{t.footerText}</p>
          <p className="text-sm text-muted-foreground/70">{t.footerSubtext}</p>
        </div>
      </footer>
    </div>
  )
}
