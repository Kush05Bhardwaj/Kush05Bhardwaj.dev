import { Laptop } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TechStack() {
  const technologies = [
    { name: "HTML", percentage: 90 },
    { name: "CSS", percentage: 75 },
    { name: "JavaScript", percentage: 75 },
    { name: "React", percentage: 70 },
    { name: "Node.js", percentage: 50 },
    { name: "TypeScript", percentage: 75 },
    { name: "Next.js", percentage: 50 },
    { name: "Python", percentage: 60 },
    { name: "Tailwind CSS", percentage: 70 },
    { name: "MongoDB", percentage: 40 },
    { name: "Git & GitHub", percentage: 70 },
    { name: "AI Integration (LLMs, APIs)", percentage: 50 },
  ]

  return (
    <section id="skills" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <Laptop className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          This is my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Tech Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="glass-card p-6 hover-lift rounded-lg"
            style={{ animationDelay: `${0.15 + index * 0.05}s` }}
          >
            <div className="flex justify-between mb-3">
              <span className="font-medium text-[#e9e9f5]">{tech.name}</span>
              <span className="text-sm text-[#a5a5c8]">{tech.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#1e1b2f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] rounded-full transition-all duration-500"
                style={{ width: `${tech.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
