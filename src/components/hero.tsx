"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin } from "lucide-react"
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
              href="https://leetcode.com/u/Kush05Bhardwaj/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-lg bg-[#1e1b2f] border border-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 hover:bg-[#1e1b2f]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="LeetCode"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div ref={rightRef} className={`relative reveal-right ${rightVisible ? 'is-revealed' : ''}`}>
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] transition-transform duration-500 hover:scale-105 animate-float">
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
