"use client"

import SectionHeader from "@/components/section-header"

const education = [
  {
    id:          "krmu",
    institution: "K.R. Mangalam University",
    degree:      "B.Tech — Computer Science & Engineering",
    logo:        "/kr.png",
    startDate:   "2024-08-01",
    endDate:     undefined as string | undefined,
    current:     true,
    description: "Pursuing a B.Tech in Computer Science with a focus on AI/ML, software engineering, and full-stack development.",
  },
  {
    id:          "rbsm",
    institution: "RBSM Public School",
    degree:      "Senior Secondary — Science (PCM)",
    logo:        "/rbsm.jpg",
    startDate:   "2020-04-01",
    endDate:     "2024-04-01",
    current:     false,
    description: "Completed schooling with a Science stream. Developed a foundational interest in computing and mathematics.",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export default function Education() {
  return (
    <section id="education">
      <SectionHeader
        number="06"
        label="EDUCATION"
        title="Education"
        description="Academic background and areas of study."
      />

      <div className="timeline education-timeline space-y-0">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="timeline-item pl-8 pb-6 sm:pl-10 group hover:translate-x-0.5 transition-transform duration-300"
          >
            {/* Date range */}
            <p className="font-mono text-[.62rem] tracking-[.13em] text-muted-foreground mb-1.5">
              {formatDate(edu.startDate)} — {edu.current ? "PRESENT" : (edu.endDate ? formatDate(edu.endDate) : "")}
            </p>

            {/* Degree + institution */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mb-2">
              <img
                src={edu.logo}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 rounded-sm object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
              />
              <h3 className="font-medium text-foreground group-hover:text-cyan-300 transition-colors duration-200">
                {edu.degree}
              </h3>
              <span className="text-border">·</span>
              <span className="text-sm text-muted-foreground">{edu.institution}</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
