import type React from "react"
import type { Metadata } from "next"
import { Lilita_One } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stumble League - Mod para Stumble Guys",
  description: "O mod definitivo para Stumble Guys com novas funcionalidades e melhor gameplay",
  keywords: ["stumble guys", "mod", "game", "stumble league", "gaming"],
  authors: [{ name: "Stumble League Team" }],
  creator: "Stumble League",
  publisher: "Stumble League",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://stumbleleague.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stumble League - Mod para Stumble Guys",
    description: "O mod definitivo para Stumble Guys com novas funcionalidades e melhor gameplay",
    url: "https://stumbleleague.vercel.app",
    siteName: "Stumble League",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stumble League",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stumble League - Mod para Stumble Guys",
    description: "O mod definitivo para Stumble Guys com novas funcionalidades e melhor gameplay",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-theme="cyan">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={lilitaOne.className}>
        <ThemeProvider attribute="class" defaultTheme="cyan" enableSystem={false} themes={["cyan", "red"]}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
