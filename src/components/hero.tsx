"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const metrics = [
  { value: "10+",  label: "PROJECTS" },
  { value: "2+",   label: "YEARS BUILDING" },
  { value: "3+",   label: "ENGAGEMENTS" },
  { value: "10+",  label: "TECHNOLOGIES" },
  { value: "50+",  label: "DSA SOLVED" },
]

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal()
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal()
  const roles = ["AI/ML Engineer", "Software Engineer", "MERN Stack Developer", "AI/ML Enthusiast"]

  useEffect(() => {
    const full = roles[loopNum % roles.length]
    const timer = setTimeout(() => {
      setDisplayText(current =>
        isDeleting ? full.substring(0, current.length - 1) : full.substring(0, current.length + 1)
      )
      if (!isDeleting && displayText === full) setTimeout(() => setIsDeleting(true), 1400)
      else if (isDeleting && !displayText) { setIsDeleting(false); setLoopNum(n => n + 1) }
    }, isDeleting ? 55 : 95)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum])

  const handlePortraitMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - .5) * 6
      const y = ((event.clientY - rect.top) / rect.height - .5) * 6
      event.currentTarget.style.setProperty("--portrait-x", `${x}px`)
      event.currentTarget.style.setProperty("--portrait-y", `${y}px`)
    }
  }

  return (
    <section id="home">
      {/* Technical metadata strip */}
      <p className="mb-6 font-mono text-[.65rem] font-medium tracking-[.18em] text-muted-foreground select-none">
        AI/ML · SOFTWARE ENGINEERING · INDIA · OPEN TO AI/ML · BACKEND · FULL-STACK
      </p>

      {/* Hero body: name/content left, portrait right */}
      <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] items-center gap-10 md:gap-8">
        <div ref={leftRef} className={`min-w-0 reveal-left ${leftVisible ? "is-revealed" : ""}`}>
          <h1 className="text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            Kushagra<br/><span className="text-gradient">Bhardwaj</span>
          </h1>
          <div className="mt-5 min-h-7 font-mono text-sm text-cyan-300 sm:text-base">
            {displayText}<span className="animate-cursor">_</span>
          </div>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            B.Tech Computer Science student focused on AI/ML, software engineering, and building practical applications.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400"/>
            Open to AI/ML · Backend · Full-Stack opportunities
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-cyan-400 text-[#050507] hover:bg-cyan-300">
              <Link href="#contact">Let&apos;s work together</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-card/50 text-foreground hover:bg-secondary">
              <Link href="/Kush_Bhardwaj_CV.pdf" target="_blank">
                <Download className="h-4 w-4"/>Resume
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex gap-2">
            <a
              className="rounded-md border border-border bg-card/70 p-2.5 text-muted-foreground transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
              href="https://www.linkedin.com/in/kush2012bhardwaj/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4"/>
            </a>
            <a
              className="rounded-md border border-border bg-card/70 p-2.5 text-muted-foreground transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
              href="https://github.com/Kush05Bhardwaj" target="_blank" rel="noreferrer" aria-label="GitHub"
            >
              <Github className="h-4 w-4"/>
            </a>
          </div>
        </div>

        {/* Portrait — right column, anchored to right edge */}
        <div className="flex justify-center md:justify-end">
        <div
          ref={rightRef}
          onMouseMove={handlePortraitMove}
          onMouseLeave={e => {
            e.currentTarget.style.setProperty("--portrait-x", "0px")
            e.currentTarget.style.setProperty("--portrait-y", "0px")
          }}
          className={`portrait-wrap relative reveal-right ${rightVisible ? "is-revealed" : ""}`}
        >
          {/* Ambient glow layer behind */}
          <div className="absolute -inset-6 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
          <div className="absolute -inset-3 rounded-2xl bg-cyan-400/5 blur-2xl pointer-events-none" />

          {/* Portrait frame */}
          <div className="portrait-frame relative overflow-hidden rounded-2xl border border-cyan-300/15 shadow-2xl"
            style={{ width: "clamp(185px, 24vw, 260px)", height: "clamp(224px, 30vw, 318px)" }}
          >
            {/* Dark base so white bg blends away */}
            <div className="absolute inset-0 bg-[#08090f] z-0" />
            {/* The photo — mix-blend-mode darkens the white BG into the dark base */}
            <div className="absolute inset-0 z-10" style={{ mixBlendMode: "luminosity", opacity: 0.92 }}>
              <Image
                src="/KB.jpg"
                alt="Kushagra Bhardwaj"
                fill
                priority
                className="object-cover object-top"
                style={{ filter: "contrast(1.05) brightness(0.92)" }}
              />
            </div>
            {/* Overlay: fade bottom into dark + subtle cyan tint at top */}
            <div className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgb(0 229 255 / .04) 0%, transparent 35%, transparent 55%, rgb(8 9 15 / .55) 100%)",
              }}
            />
            {/* Subtle inner border glow */}
            <div className="absolute inset-0 z-30 rounded-2xl ring-1 ring-inset ring-cyan-400/10 pointer-events-none" />
          </div>
        </div>
        </div>
      </div>

      {/* Editorial metrics strip */}
      <div className="hero-metrics" role="list" aria-label="Key metrics">
        {metrics.map((m, i) => (
          <div key={i} className="hero-metric-item" role="listitem">
            <span className="hero-metric-value">{m.value}</span>
            <span className="hero-metric-label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
