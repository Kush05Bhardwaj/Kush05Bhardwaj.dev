"use client"

import { Laptop } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { 
  SiPython, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiAmazon,
  SiDocker,
  SiTensorflow,
  SiPostman,
  SiLinux
} from "react-icons/si"
import { IconType } from "react-icons"
import { JavaLogo } from "./icons/JavaLogo"

const technologies = [
  { name: "Python", Icon: SiPython, color: "#3776AB", delay: 0, duration: 3 },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", delay: 0.2, duration: 4 },
  { name: "React", Icon: SiReact, color: "#61DAFB", delay: 0.3, duration: 3.2 },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", delay: 0.4, duration: 3.8 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 0.5, duration: 3.6 },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0.6, duration: 4.2 },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", delay: 0.9, duration: 3.3 },
  { name: "Git", Icon: SiGit, color: "#F05032", delay: 1.0, duration: 3.9 },
  { name: "Java", Icon: JavaLogo as any, color: "#007396", delay: 1.3, duration: 3.6 },
  { name: "Linux", Icon: SiLinux, color: "#FCC624", delay: 1.6, duration: 3.7 },
]

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="skills" className="py-16 overflow-hidden">
      <div className="flex items-center justify-center gap-2 mb-12">
        <Laptop className="text-[#ffffff]" />
        <h2 className="text-3xl font-bold">
          This is my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">Tech Stack</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-8 max-w-4xl justify-items-center">
        {technologies.map((tech, index) => {
          const { Icon } = tech
          return (
            <div
              key={tech.name}
              className="group cursor-pointer flex flex-col items-center"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div 
                className="relative flex items-center justify-center rounded-full glass-card border border-[#1a1a1a]/50 group-hover:border-[#ffffff] transition-all duration-300 group-hover:scale-110 w-16 h-16 sm:w-20 sm:h-20"
              >
                <Icon 
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  style={{ 
                    color: tech.color,
                  }} 
                />
              </div>
              
              <span className="text-xs sm:text-sm font-medium text-[#a5a5c8] group-hover:text-[#cccccc] transition-colors duration-300 text-center mt-2">
                {tech.name}
              </span>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
