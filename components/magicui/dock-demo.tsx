"use client"

import { HomeIcon, PencilIcon, MessageCircle, Download, Languages } from "lucide-react"
import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/translations"

const DOWNLOAD_LINK = "https://example.com/download-stumble-league"

export function DockDemo() {
  const { language, changeLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === "pt" ? "en" : "pt"
    changeLanguage(newLanguage)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const handleDownloadClick = () => {
    window.open(DOWNLOAD_LINK, "_blank")
  }

  const DATA = {
    navbar: [
      { href: "/", icon: HomeIcon, label: getTranslation(language, "home") },
      { href: "/changelogs", icon: PencilIcon, label: getTranslation(language, "changelogs") },
    ],
    contact: {
      social: {
        Download: {
          name: getTranslation(language, "download"),
          onClick: handleDownloadClick,
          icon: Download,
        },
        Discord: {
          name: getTranslation(language, "discord"),
          url: "#",
          icon: MessageCircle,
        },
      },
    },
  }

  return (
    <div className="fixed top-1 left-1/2 transform -translate-x-1/2 z-[60]">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="bg-card/15 border border-border/15 backdrop-blur-3xl shadow-xl h-12 px-4 rounded-full hover:shadow-primary/10 transition-all duration-500 hover:bg-card/25"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label} size={40} magnification={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center group",
                    )}
                  >
                    <item.icon className="size-4 group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-card/90 backdrop-blur-xl border-border/30">
                  <p className="font-medium text-xs">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-6 mx-1.5 bg-border/20" />

          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name} size={40} magnification={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {social.onClick ? (
                    <button
                      onClick={social.onClick}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center group",
                      )}
                    >
                      <social.icon className="size-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  ) : (
                    <Link
                      href={social.url}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center group",
                      )}
                    >
                      <social.icon className="size-4 group-hover:scale-110 transition-transform duration-200" />
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-card/90 backdrop-blur-xl border-border/30">
                  <p className="font-medium text-xs">{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-6 mx-1.5 bg-border/20" />

          <DockIcon size={40} magnification={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleLanguage}
                  aria-label="Change language"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center group",
                  )}
                >
                  <Languages className="size-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card/90 backdrop-blur-xl border-border/30">
                <p className="font-medium text-xs">{language === "pt" ? "🇺🇸 English" : "🇧🇷 Português"}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" className="h-6 mx-1.5 bg-border/20" />

          <DockIcon size={40} magnification={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 scale-75">
                  <AnimatedThemeToggler />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card/90 backdrop-blur-xl border-border/30">
                <p className="font-medium text-xs">Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  )
}
