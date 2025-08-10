export const translations = {
  pt: {
    // Navigation
    home: "Início",
    changelogs: "Atualizações",
    download: "Download",
    discord: "Discord",
    language: "Idioma",

    // Hero Section
    title: "Stumble League",
    subtitle: "O melhor mod de Stumble Guys. Jogue e se divirta, Jogue nossos torneios.",
    description:
      "Experimente novos modos de jogo, mapas exclusivos e uma comunidade incrível de jogadores apaixonados por diversão e competição.",
    downloadNow: "Download Agora",
    activePlayers: "Jogadores Ativos",
    downloads: "Downloads",

    // Features
    featuresTitle: "Funcionalidades Incríveis",
    featuresSubtitle: "Descubra tudo que o Stumble League tem a oferecer para elevar sua experiência de jogo",

    performanceTitle: "Performance Otimizada",
    performanceDesc:
      "Melhor FPS, menos lag e gameplay mais fluido para uma experiência superior em todos os dispositivos.",

    anticheatTitle: "Anti-Cheat Avançado",
    anticheatDesc: "Sistema robusto de proteção contra trapaças para jogos justos e equilibrados em todos os torneios.",

    newModesTitle: "Novos Modos",
    newModesDesc: "Modos de jogo exclusivos e mapas customizados para diversão infinita e desafios únicos.",

    // Update Section
    latestUpdate: "Última Atualização",
    versionAvailable: "Versão 1.4 Disponível!",
    updateDescription:
      "Nova atualização com correções de bugs, melhorias de performance e novos recursos incríveis para uma experiência ainda melhor.",
    seeAllChanges: "Ver Todas as Mudanças",

    // Footer
    footerText: "Mod não oficial para Stumble Guys. Feito com ❤️ pela comunidade.",

    // Discord Notifications
    discordNotifications: {
      joinDiscord: {
        name: "Entre no Discord",
        description: "Entre no discord para ficar informado sobre as atualizações",
      },
      tournaments: {
        name: "Torneios todo dia",
        description: "Entre no discord para participar dos torneios",
      },
      community: {
        name: "Entre no discord",
        description: "No nosso discord você pode conversar com os membros da comunidade",
      },
      support: {
        name: "Suporte",
        description: "Tire suas duvidas no nosso discord",
      },
    },
  },

  en: {
    // Navigation
    home: "Home",
    changelogs: "Changelogs",
    download: "Download",
    discord: "Discord",
    language: "Language",

    // Hero Section
    title: "Stumble League",
    subtitle: "The best Stumble Guys mod. Play and have fun, Join our tournaments.",
    description:
      "Experience new game modes, exclusive maps and an incredible community of players passionate about fun and competition.",
    downloadNow: "Download Now",
    activePlayers: "Active Players",
    downloads: "Downloads",

    // Features
    featuresTitle: "Amazing Features",
    featuresSubtitle: "Discover everything Stumble League has to offer to elevate your gaming experience",

    performanceTitle: "Optimized Performance",
    performanceDesc: "Better FPS, less lag and smoother gameplay for a superior experience on all devices.",

    anticheatTitle: "Advanced Anti-Cheat",
    anticheatDesc: "Robust protection system against cheats for fair and balanced games in all tournaments.",

    newModesTitle: "New Modes",
    newModesDesc: "Exclusive game modes and custom maps for infinite fun and unique challenges.",

    // Update Section
    latestUpdate: "Latest Update",
    versionAvailable: "Version 1.4 Available!",
    updateDescription:
      "New update with bug fixes, performance improvements and amazing new features for an even better experience.",
    seeAllChanges: "See All Changes",

    // Footer
    footerText: "Unofficial mod for Stumble Guys. Made with ❤️ by the community.",

    // Discord Notifications
    discordNotifications: {
      joinDiscord: {
        name: "Join Discord",
        description: "Join our discord to stay informed about updates",
      },
      tournaments: {
        name: "Daily tournaments",
        description: "Join our discord to participate in tournaments",
      },
      community: {
        name: "Join discord",
        description: "In our discord you can chat with community members",
      },
      support: {
        name: "Support",
        description: "Get help in our discord server",
      },
    },
  },
}

export function getTranslation(language: "pt" | "en", key: string): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
