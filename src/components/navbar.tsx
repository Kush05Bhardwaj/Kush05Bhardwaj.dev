"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "backdrop-blur-md bg-[#0a0612]/95 border-b border-[#1e1b2f] shadow-lg py-3" 
        : "backdrop-blur-sm bg-[#0a0612]/80 py-4"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          href="#home" 
          className="font-mono text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]"
        >
          Kush05Bhardwaj
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#e9e9f5] hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                pathname === item.href || (pathname === "/" && item.href === "#home")
                  ? "text-[#7b3fe4] bg-[#7b3fe4]/10"
                  : "text-[#a5a5c8] hover:text-[#e9e9f5] hover:bg-[#1e1b2f]",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0612]/95 backdrop-blur-md border-t border-[#1e1b2f] shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-1 py-3 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                  pathname === item.href || (pathname === "/" && item.href === "#home")
                    ? "text-[#7b3fe4] bg-[#7b3fe4]/10 border-l-2 border-[#7b3fe4]"
                    : "text-[#a5a5c8] hover:text-[#e9e9f5] hover:bg-[#1e1b2f]",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
