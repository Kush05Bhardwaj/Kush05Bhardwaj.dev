"use client"

import SectionHeader from "@/components/section-header"
import {
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiLinux,
} from "react-icons/si"
import { JavaLogo } from "./icons/JavaLogo"

const toolkitCategories = [
  { label: "LANGUAGES",  items: "Python · JavaScript · TypeScript · Java" },
  { label: "FRONTEND",   items: "React · Next.js · Tailwind CSS · HTML / CSS" },
  { label: "BACKEND",    items: "Node.js · Express · FastAPI" },
  { label: "AI / ML",   items: "LLMs · OpenCV · ML Models · HuggingFace" },
  { label: "DB & INFRA", items: "MongoDB · SQLite · Docker · Git · Linux" },
]

const technologies = [
  { name: "Python",     Icon: SiPython,        color: "#3776AB" },
  { name: "TypeScript", Icon: SiTypescript,    color: "#3178C6" },
  { name: "React",      Icon: SiReact,         color: "#61DAFB" },
  { name: "Next.js",    Icon: SiNextdotjs,     color: "#FFFFFF" },
  { name: "Node.js",    Icon: SiNodedotjs,     color: "#339933" },
  { name: "MongoDB",    Icon: SiMongodb,       color: "#47A248" },
  { name: "Tailwind",   Icon: SiTailwindcss,   color: "#06B6D4" },
  { name: "Git",        Icon: SiGit,           color: "#F05032" },
  { name: "Java",       Icon: JavaLogo as any, color: "#007396" },
  { name: "Linux",      Icon: SiLinux,         color: "#FCC624" },
]

export default function TechStack() {
  return (
    <section id="skills" className="editorial-major" data-num="05">
      {/*
        Desktop: two-column grid — left ~58% (header + text categories), right ~42% (icon cluster)
        Mobile:  single column, stacked naturally
      */}
      <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-x-10 gap-y-8 items-start">

        {/* ── LEFT: Section header + text toolkit ───────────────────── */}
        <div className="min-w-0">
          <SectionHeader
            number="05"
            label="TOOLKIT"
            title="Technical Toolkit"
            description="Languages, frameworks, infrastructure, and AI tooling used to ship products."
            aside="BUILDING SYSTEMS"
          />

          {/* Text-based toolkit grid */}
          <div className="toolkit-grid">
            {toolkitCategories.map(cat => (
              <div key={cat.label} className="contents">
                <span className="toolkit-grid-label">{cat.label}</span>
                <span className="toolkit-grid-items">{cat.items}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Icon cluster ────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 pt-0 md:pt-12 min-w-0">
          {technologies.map(tech => {
            const { Icon } = tech
            return (
              <div
                key={tech.name}
                className="tech-node group cursor-pointer flex flex-col items-center"
              >
                <div className="relative flex items-center justify-center rounded-full border border-border bg-card/70 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 w-14 h-14">
                  <Icon className="w-7 h-7" style={{ color: tech.color }} />
                </div>
                <span className="text-[.65rem] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center mt-1.5">
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
