"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [{ name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Stack", href: "#skills" }, { name: "Projects", href: "#projects" }, { name: "Experience", href: "#experience" }, { name: "Contact", href: "#contact" }]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const [active, setActive] = useState("#home"); const [progress, setProgress] = useState(0)
  useEffect(() => {
    const updateScroll = () => { setScrolled(window.scrollY > 24); const height = document.documentElement.scrollHeight - window.innerHeight; setProgress(height > 0 ? (window.scrollY / height) * 100 : 0) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`) }), { rootMargin: "-35% 0px -55% 0px", threshold: 0 })
    navItems.forEach(item => document.querySelector(item.href)?.id && observer.observe(document.querySelector(item.href)!)); updateScroll(); window.addEventListener("scroll", updateScroll, { passive: true }); return () => { observer.disconnect(); window.removeEventListener("scroll", updateScroll) }
  }, [])
  return <nav className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-300", scrolled ? "border-border bg-[#050507]/90 py-2.5 backdrop-blur-lg" : "border-transparent bg-[#050507]/60 py-4 backdrop-blur-sm")}><div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} /><div className="container mx-auto flex items-center justify-between px-4"><Link href="#home" className="font-mono text-sm font-semibold tracking-tight text-foreground">kush05bhardwaj<span className="text-cyan-400">.dev</span></Link><button className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button><div className="hidden items-center gap-1 md:flex">{navItems.map(item => <Link key={item.name} href={item.href} className={cn("nav-link rounded-md px-3 py-2 text-sm transition-colors", active === item.href ? "is-active text-cyan-300" : "text-muted-foreground hover:text-foreground")}>{item.name}</Link>)}</div></div>{isMenuOpen && <div className="border-t border-border bg-[#080a10]/95 px-4 py-3 backdrop-blur-lg md:hidden"><div className="container mx-auto flex flex-col gap-1">{navItems.map(item => <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className={cn("rounded-md px-3 py-2.5 text-sm", active === item.href ? "text-cyan-300" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>{item.name}</Link>)}</div></div>}</nav>
}
