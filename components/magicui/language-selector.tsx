"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface LanguageSelectorProps {
  onLanguageSelect: (language: 'pt' | 'en') => void
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se é a primeira visita
    const hasVisited = localStorage.getItem('stumble-league-visited')
    if (!hasVisited) {
      // Delay para aparecer após o startup
      setTimeout(() => {
        setIsVisible(true)
      }, 5500) // Aparece depois do startup
    }
  }, [])

  const handleLanguageSelect = (language: 'pt' | 'en') => {
    localStorage.setItem('stumble-league-visited', 'true')
    localStorage.setItem('stumble-league-language', language)
    setIsVisible(false)
    onLanguageSelect(language)
    // Recarrega a página após selecionar o idioma
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Card className="w-full max-w-lg mx-4 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Globe className="h-12 w-12 text-primary animate-pulse" />
                    <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1 animate-bounce" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome to Stumble League
                </CardTitle>
                <p className="text-muted-foreground text-lg mt-2">
                  Choose your language / Escolha seu idioma
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleLanguageSelect('pt')}
                    className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-2xl mr-3">🇧🇷</span>
                    <div className="text-left">
                      <div className="font-bold">Português</div>
                      <div className="text-sm opacity-90">Brasil</div>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleLanguageSelect('en')}
                    variant="outline"
                    className="w-full h-16 text-lg font-semibold border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <span className="text-2xl mr-3">🇺🇸</span>
                    <div className="text-left">
                      <div className="font-bold">English</div>
                      <div className="text-sm opacity-70">United States</div>
                    </div>
                  </Button>
                </motion.div>
                
                <div className="text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    You can change this later in settings
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
