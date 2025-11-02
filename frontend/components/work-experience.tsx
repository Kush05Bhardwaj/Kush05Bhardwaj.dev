import { Card, CardContent } from "@/components/ui/card"
import { log } from "console"
import { Briefcase } from "lucide-react"

export default function WorkExperience() {
  const experiences = [
    {
      id: 1,
      company: "KR Mangalam University",
      role: "Student",
      logo: "/kr.png",
      period: "Aug 2024 - Present",
      description: "I am a student at KR Mangalam University. I am pursuing B.Tech in Computer Science.",
    },
    {
      id: 2,
      company: "Cognifyz Technologies",
      role: "Web Developer Intern",
      logo: "/cognifyz-1.png",
      period: "May 2025 - Present",
      description: "I worked as a Web Dev Intern at Cognifyz Technologies.",
    },
    {
      id: 3,
      company: "Fiverr",
      role: "Freelancer",
      logo: "/fiverr.png",
      period: "Apr 2024 - Present",
      description: "I am a freelancer on Fiverr. I provide services like web development and web design.",
    },
    
  ]

  return (
    <section id="experience" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <Briefcase className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          My prior <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Work Experience</span>
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card
            key={exp.id}
            className="glass-card hover-lift rounded-lg"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-8 h-8 rounded-full"
                  />
                  <h3 className="font-medium text-[#e9e9f5]">{exp.company}</h3>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">{exp.role}</span>
              </div>
              <p className="mt-4 text-[#e9e9f5]">{exp.description}</p>
              <p className="mt-2 text-sm text-[#a5a5c8]">{exp.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
