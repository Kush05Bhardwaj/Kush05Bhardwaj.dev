"use client"

import { Laptop } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Image from "next/image"

// Tech stack data with icons
const technologies = [
  { name: "Python", icon: "🐍", color: "#3776AB", delay: 0 },
  { name: "JavaScript", icon: "🟨", color: "#F7DF1E", delay: 0.1 },
  { name: "TypeScript", icon: "📘", color: "#3178C6", delay: 0.2 },
  { name: "React", icon: "⚛️", color: "#61DAFB", delay: 0.3 },
  { name: "Next.js", icon: "▲", color: "#000000", delay: 0.4 },
  { name: "Node.js", icon: "🟢", color: "#339933", delay: 0.5 },
  { name: "MongoDB", icon: "🍃", color: "#47A248", delay: 0.6 },
  { name: "HTML", icon: "🌐", color: "#E34F26", delay: 0.7 },
  { name: "CSS", icon: "🎨", color: "#1572B6", delay: 0.8 },
  { name: "Tailwind CSS", icon: "💨", color: "#06B6D4", delay: 0.9 },
  { name: "Git", icon: "🔀", color: "#F05032", delay: 1.0 },
  { name: "AWS", icon: "☁️", color: "#FF9900", delay: 1.1 },
  { name: "Docker", icon: "🐳", color: "#2496ED", delay: 1.2 },
  { name: "Java", icon: "☕", color: "#007396", delay: 1.3 },
  { name: "Machine Learning", icon: "🤖", color: "#FF6F00", delay: 1.4 },
]

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="skills" className="py-16 overflow-hidden">
      <div ref={ref} className={`flex items-center justify-center gap-2 mb-12 reveal-on-scroll ${isVisible ? 'is-revealed' : ''}`}>
        <Laptop className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          This is my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Tech Stack</span>
        </h2>
      </div>

      {/* Floating Icons Grid */}
      <div className="relative min-h-[500px] flex flex-wrap items-center justify-center gap-8 p-8">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="group relative"
            style={{
              animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
              animationDelay: `${tech.delay}s`
            }}
          >
            {/* Icon Container */}
            <div className="relative flex flex-col items-center gap-3">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle, ${tech.color}40, transparent)`,
                  transform: 'scale(1.5)'
                }}
              />
              
              {/* Icon Circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full glass-card border-2 border-[#1e1b2f] group-hover:border-[#7b3fe4]/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#7b3fe4]/20">
                <span className="text-4xl sm:text-5xl">{tech.icon}</span>
              </div>
              
              {/* Tech Name */}
              <span className="text-sm font-medium text-[#a5a5c8] group-hover:text-[#b799ff] transition-colors duration-300 text-center whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
