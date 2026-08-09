"use client"

import SectionHeader from "@/components/section-header"

const experiences = [
  {
    id:          "projexa",
    company:     "Projexa AI",
    position:    "Full Stack Developer",
    logo:        "/projexa.jpeg",
    startDate:   "2026-06-01",
    endDate:     undefined as string | undefined,
    current:     true,
    description: "Developing and managing software solutions, including a project management platform and an internship management system, serving 5,000+ users. Working across frontend, backend, database integration, and feature development to streamline project and internship workflows.",
  },
  {
    id: "eozka",
    company: "eOzka",
    position: "Software Engineer",
    logo: "/eOzka.png",
    startDate: "2026-06-01",
    endDate: undefined as string | undefined,
    current: true,
    description: "Engineering scalable web applications and software infrastructure at eOzka, contributing to full-stack development, backend systems, database architecture, and production-ready solutions across the company's technology ecosystem."
  },

  {
    id:          "osc",
    company:     "Open Source Community",
    position:    "Open Source Contributor",
    logo:        "/white.jpg",
    startDate:   "2025-12-05",
    endDate:     undefined as string | undefined,
    current:     true,
    description: "Contributing to open-source projects — collaborating with developers, reviewing code, and building utilities that ship to real users.",
  },
  {
    id:          "ecwoc",
    company:     "ELite Coders Winter of Code '26",
    position:    "Open Source Contributor",
    logo:        "/elite.jpg",
    startDate:   "2026-01-01",
    endDate:     "2026-02-15",
    current:     false,
    description: "Participated as a contributor in the programme, shipping features and bug fixes across the project roster.",
  },
  {
    id:          "cognifyz",
    company:     "Cognifyz Technologies",
    position:    "Web Developer Intern",
    logo:        "/cognifyz-1.png",
    startDate:   "2025-05-17",
    endDate:     "2025-06-17",
    current:     false,
    description: "Built and maintained web interfaces using React and Node.js. Worked with the product team on client-facing features during a one-month internship.",
  },
  {
    id:          "fiverr",
    company:     "Fiverr",
    position:    "Freelance Web Developer",
    logo:        "/fiverr.png",
    startDate:   "2024-04-01",
    endDate:     undefined as string | undefined,
    current:     true,
    description: "Delivering web development services for clients — landing pages, full-stack applications, and UI work on a project basis.",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export default function WorkExperience() {
  return (
    <section id="experience" className="editorial-major" data-num="04">
      <SectionHeader
        number="04"
        label="EXPERIENCE"
        title="Work Experience"
        description="Internship, freelance, and open-source contributions."
        aside="SELECTED ROLES"
      />

      <div className="timeline space-y-0">
        {experiences.map((exp, index) => (
          <div
            key={`${exp.id}-${index}`}
            className="timeline-item pl-8 pb-6 sm:pl-10 group hover:translate-x-0.5 transition-transform duration-300"
          >
            {/* Date range */}
            <p className="font-mono text-[.62rem] tracking-[.13em] text-muted-foreground mb-1.5">
              {formatDate(exp.startDate)} — {exp.current ? "PRESENT" : (exp.endDate ? formatDate(exp.endDate) : "")}
            </p>

            {/* Role + company */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mb-2">
              <img
                src={exp.logo}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 rounded-sm object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
              />
              <h3 className="font-medium text-foreground group-hover:text-cyan-300 transition-colors duration-200">
                {exp.position}
              </h3>
              <span className="text-border">·</span>
              <span className="text-sm text-muted-foreground">{exp.company}</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
