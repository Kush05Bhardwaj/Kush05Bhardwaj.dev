"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Twitter } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal()
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal()

  const roles = [
    "Aspiring AI-Software Developer",
    "MERN Stack Developer",
    "Tech Enthusiast"
  ]

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % roles.length
      const fullText = roles[currentIndex]

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      )

      setTypingSpeed(isDeleting ? 80 : 150)

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(500)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, roles, typingSpeed])

  return (
    <section id="home" className="py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div ref={leftRef} className={`flex-1 max-w-2xl reveal-left ${leftVisible ? 'is-revealed' : ''}`}>
        <div className="space-y-6">
          {/* Greeting */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">👋</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#e9e9f5]">
              Hi, I'm Kushagra Bhardwaj
            </h1>
          </div>

          {/* Typing animation */}
          <div className="min-h-[80px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] via-[#a855f7] to-[#b799ff]">
                {displayText}
              </span>
              <span className="animate-cursor text-[#7b3fe4]">|</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-[#a5a5c8] max-w-xl leading-relaxed">
            Building cool stuff with AI, Python, and Web Tech.
            Always learning, always experimenting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              asChild 
              size="lg"
              className="bg-[#7b3fe4] hover:bg-[#6b2fd4] text-white shadow-lg shadow-[#7b3fe4]/20 hover:shadow-[#7b3fe4]/30 transition-all duration-300 hover:scale-105"
            >
              <Link href="#contact">Get in Touch →</Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#1e1b2f] text-[#e9e9f5] hover:bg-[#1e1b2f] hover:text-white hover:border-[#7b3fe4]/30 transition-all duration-300 hover:scale-105"
            >
              <Link href="/Kush_Bhardwaj_CV.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 pt-6">
            <a 
              href="https://www.linkedin.com/in/kush2012bhardwaj/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg bg-[#1e1b2f] border border-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 hover:bg-[#1e1b2f]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            
            <a 
              href="https://github.com/Kush05Bhardwaj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg bg-[#1e1b2f] border border-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 hover:bg-[#1e1b2f]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            
            <a 
              href="https://x.com/Kush05Bhardwaj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg bg-[#1e1b2f] border border-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 hover:bg-[#1e1b2f]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div ref={rightRef} className={`relative reveal-right ${rightVisible ? 'is-revealed' : ''}`}>
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] transition-transform duration-500 hover:scale-105">
          {/* Subtle purple glow */}
          <div className="absolute inset-0 rounded-full bg-[#7b3fe4]/10 blur-2xl"></div>
          
          {/* Image container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#1e1b2f] bg-[#0a0612]/50 shadow-xl hover:border-[#7b3fe4]/50 transition-all duration-500">
            <Image
              src="/KB.jpg?height=320&width=320"
              alt="Kushagra Bhardwaj"
              width={320}
              height={320}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
