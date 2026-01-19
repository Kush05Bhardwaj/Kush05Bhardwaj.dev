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
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", delay: 0.1, duration: 3.5 },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", delay: 0.2, duration: 4 },
  { name: "React", Icon: SiReact, color: "#61DAFB", delay: 0.3, duration: 3.2 },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", delay: 0.4, duration: 3.8 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", delay: 0.5, duration: 3.6 },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", delay: 0.6, duration: 4.2 },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26", delay: 0.7, duration: 3.4 },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6", delay: 0.8, duration: 3.7 },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", delay: 0.9, duration: 3.3 },
  { name: "Git", Icon: SiGit, color: "#F05032", delay: 1.0, duration: 3.9 },
  { name: "AWS", Icon: SiAmazon, color: "#FF9900", delay: 1.1, duration: 3.5 },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", delay: 1.2, duration: 4.1 },
  { name: "Java", Icon: JavaLogo as any, color: "#007396", delay: 1.3, duration: 3.6 },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00", delay: 1.4, duration: 3.8 },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", delay: 1.5, duration: 3.4 },
  { name: "Linux", Icon: SiLinux, color: "#FCC624", delay: 1.6, duration: 3.7 },
]

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="skills" className="py-16 overflow-hidden">
      <div className="flex items-center justify-center gap-2 mb-12">
        <Laptop className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          This is my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Tech Stack</span>
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
                className="relative flex items-center justify-center rounded-full glass-card border border-[#1e1b2f]/50 group-hover:border-[#7b3fe4] transition-all duration-300 group-hover:scale-110 w-16 h-16 sm:w-20 sm:h-20"
              >
                <Icon 
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  style={{ 
                    color: tech.color,
                  }} 
                />
              </div>
              
              <span className="text-xs sm:text-sm font-medium text-[#a5a5c8] group-hover:text-[#b799ff] transition-colors duration-300 text-center mt-2">
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
