"use client"

import { Laptop } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Static tech stack data
const technologies = [
  
  { name: "Python", level: 80 },
  { name: "Machine Learning", level: 55 },
  { name: "Java", level: 40 },
  { name: "HTML", level: 90 },
  { name: "CSS", level: 60 },
  { name: "JavaScript", level: 70 },
  { name: "React", level: 65 },
  { name: "Node.js", level: 60 },
  { name: "TypeScript", level: 60 },
  { name: "Next.js", level: 50 },
  { name: "Tailwind CSS", level: 50 },
  { name: "MongoDB", level: 75 },
  { name: "Git & GitHub", level: 80 },
  { name: "AI Integration (LLMs, APIs)", level: 60 },
  { name: "AWS", level: 50 },  
]

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="skills" className="py-16">
      <div ref={ref} className={`flex items-center justify-center gap-2 mb-12 reveal-on-scroll ${isVisible ? 'is-revealed' : ''}`}>
        <Laptop className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          This is my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Tech Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="glass-card p-6 rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20"
            style={{ animationDelay: `${0.15 + index * 0.05}s` }}
          >
            <div className="flex justify-between mb-3">
              <span className="font-medium text-[#e9e9f5] group-hover:text-[#b799ff] transition-colors duration-300">{tech.name}</span>
              <span className="text-sm text-[#a5a5c8]">{tech.level}%</span>
            </div>
            <div className="w-full h-2 bg-[#1e1b2f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] rounded-full transition-all duration-700 group-hover:shadow-lg group-hover:shadow-[#7b3fe4]/50"
                style={{ width: `${tech.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
