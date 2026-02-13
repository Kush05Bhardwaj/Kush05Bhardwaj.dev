"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Static education data
const education = [
  {
    id: "1",
    company: "KR Mangalam University",
    position: "Student",
    logo: "/kr.png",
    startDate: "2024-08-01",
    endDate: undefined,
    current: true,
    description: "I am a student at KR Mangalam University. I am pursuing B.Tech in Computer Science.",
  },
  {
    id: "2",
    company: "RBSM Public School",
    position: "Student",
    logo: "/rbsm.jpg",
    startDate: "2020-04-01",
    endDate: "2024-04-01",
    current: false,
    description: "I attended my high school at RBSM Public School. I completed my schooling here.",
  }
]

export default function Education() {
  const { ref, isVisible } = useScrollReveal()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="education" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12">
        <GraduationCap className="text-[#ffffff]" />
        <h2 className="text-3xl font-bold">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">Education</span>
        </h2>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card
            key={edu.id}
            className="glass-card rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ffffff]/20"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={edu.logo || "/placeholder.svg"}
                    alt={`${edu.company} logo`}
                    className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="font-medium text-[#e9e9f5] group-hover:text-[#cccccc] transition-colors duration-300">{edu.company}</h3>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">{edu.position}</span>
              </div>
              <p className="mt-4 text-[#e9e9f5]">{edu.description}</p>
              <p className="mt-2 text-sm text-[#a5a5c8]">
                {formatDate(edu.startDate)} - {edu.current ? "Present" : (edu.endDate ? formatDate(edu.endDate) : "N/A")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
