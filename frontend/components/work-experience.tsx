"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { experienceAPI } from "@/lib/api"

export default function WorkExperience() {
  const { ref, isVisible } = useScrollReveal()
  const [experiences, setExperiences] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const data = await experienceAPI.getAll()
      setExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
      // Fallback data in case API fails
      setExperiences([
        {
          _id: "1",
          company: "KR Mangalam University",
          position: "Student",
          logo: "/kr.png",
          startDate: "2024-08-01",
          current: true,
          description: "I am a student at KR Mangalam University. I am pursuing B.Tech in Computer Science.",
        },
        {
          _id: "2",
          company: "Cognifyz Technologies",
          position: "Web Developer Intern",
          logo: "/cognifyz-1.png",
          startDate: "2025-05-01",
          current: true,
          description: "I worked as a Web Dev Intern at Cognifyz Technologies.",
        },
        {
          _id: "3",
          company: "Fiverr",
          position: "Freelancer",
          logo: "/fiverr.png",
          startDate: "2024-04-01",
          current: true,
          description: "I am a freelancer on Fiverr. I provide services like web development and web design.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  if (isLoading) {
    return (
      <section id="experience" className="py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7b3fe4]"></div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-16">
      <div ref={ref} className={`flex items-center justify-center gap-2 mb-12 reveal-on-scroll ${isVisible ? 'is-revealed' : ''}`}>
        <Briefcase className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          My prior <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Work Experience</span>
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card
            key={exp._id}
            className="glass-card rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20"
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
                  <h3 className="font-medium text-[#e9e9f5] group-hover:text-[#b799ff] transition-colors duration-300">{exp.company}</h3>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">{exp.position}</span>
              </div>
              <p className="mt-4 text-[#e9e9f5]">{exp.description}</p>
              <p className="mt-2 text-sm text-[#a5a5c8]">
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
