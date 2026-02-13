"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Static experience data
const experiences = [
  {
    id: "1",
    company: "ELite Coders Winter of Code '26",
    position: "Contributor",
    logo: "/elite.jpg",
    startDate: "2026-01-01",
    endDate: "present",
    current: true,
    description: "I participated as a contributor in ELite Coders Winter of Code '26, contributing to open source projects and collaborating with other developers.",
  },
  {
    id: "2",
    company: "Open Source Community",
    position: "Contributor",
    logo: "/white.jpg",
    startDate: "2025-12-05",
    endDate: "present",
    current: true,
    description: "I am a contributor to various open source projects. I enjoy collaborating with other developers and learning new technologies.",
  },
  {
    id: "2",
    company: "Cognifyz Technologies",
    position: "Web Developer Intern",
    logo: "/cognifyz-1.png",
    startDate: "2025-05-17",
    endDate: "2025-06-17",
    current: true,
    description: "I worked as a Web Dev Intern at Cognifyz Technologies.",
  },
  {
    id: "3",
    company: "Fiverr",
    position: "Freelancer",
    logo: "/fiverr.png",
    startDate: "2024-04-01",
    endDate: undefined,
    current: true,
    description: "I am a freelancer on Fiverr. I provide services like web development and web design.",
  },
]

export default function WorkExperience() {
  const { ref, isVisible } = useScrollReveal()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="experience" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12">
        <Briefcase className="text-[#ffffff]" />
        <h2 className="text-3xl font-bold">
          My prior <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">Work Experience</span>
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card
            key={exp.id}
            className="glass-card rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ffffff]/20"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={exp.logo || "/placeholder.svg"}
                    alt={`${exp.company} logo`}
                    className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="font-medium text-[#e9e9f5] group-hover:text-[#cccccc] transition-colors duration-300">{exp.company}</h3>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">{exp.position}</span>
              </div>
              <p className="mt-4 text-[#e9e9f5]">{exp.description}</p>
              <p className="mt-2 text-sm text-[#a5a5c8]">
                {formatDate(exp.startDate)} - {exp.current ? "Present" : (exp.endDate ? formatDate(exp.endDate) : "N/A")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
