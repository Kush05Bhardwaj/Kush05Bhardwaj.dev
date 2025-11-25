import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Portfolio | Kushagra Bhardwaj",
  icons: {
    icon: "/KB.jpg",
  },
  description: "Professional portfolio showcasing my work and experience as a developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-300`}>
        {children}
      </body>
    </html>
  )
}
