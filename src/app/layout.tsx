import type { Metadata } from "next"
import { Syne, DM_Mono } from "next/font/google"
import "./globals.css"
import { PulseBackground } from "@/components/ui/pulse-background"

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pulse — Remember everyone.",
  description: "The infrastructure of being remembered. Every payment becomes a relationship.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} bg-bg text-text antialiased`}>
        <PulseBackground />
        {children}
      </body>
    </html>
  )
}