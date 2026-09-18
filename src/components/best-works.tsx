"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import SectionHeader from "@/components/section-header"
import { featuredProjects, otherProjects, techLabel } from "@/lib/projects-data"

// Map each project to a concise editorial category string
const projectCategory: Record<string, string> = {
  "1": "PYTHON · LLM · OPENCV · SQLITE",
  "2": "PYTHON · FASTAPI · ML · NEXT.JS",
  "3": "NEXT.JS · AI · COMPUTER VISION · UI/UX",
  "4": "NEXT.JS · TYPESCRIPT · API INTEGRATION",
}

export default function BestWorks() {
  return (
    <section id="projects" className="editorial-major" data-num="02">
      <SectionHeader
        number="02"
        label="SELECTED WORK"
        title="Selected Work"
        description="A selection of software and AI projects built to solve practical problems."
        aside={`${featuredProjects.length} PROJECTS`}
      />

      <div className="project-showcase space-y-0">
        {featuredProjects.map((project, index) => {
          const hasImage = Boolean(project.images.length && project.images[0])
          const isFirst  = index === 0
          return (
            <article
              key={project.id}
              className={`showcase-project ${index % 2 ? "md:flex-row-reverse" : ""} ${isFirst ? "is-featured" : ""}`}
            >
              {/* Preview */}
              <div className="project-preview">
                {hasImage ? (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-sm text-muted-foreground">
                    Preview unavailable
                  </div>
                )}
              </div>

              {/* Copy */}
              <div className="project-copy">
                {/* Project identifier */}
                <p className="font-mono text-[.62rem] tracking-[.16em] text-muted-foreground mb-1">
                  {isFirst ? "FEATURED — " : ""}PROJECT {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  {project.title}
                </h3>

                {/* Tech category label */}
                {projectCategory[project.id] && (
                  <p className="mt-2 font-mono text-[.62rem] tracking-[.12em] text-cyan-400/80">
                    {projectCategory[project.id]}
                  </p>
                )}

                <p className="mt-3 max-w-xl leading-7 text-muted-foreground text-sm sm:text-base">
                  {project.shortDescription}
                </p>

                {/* Technology pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map(tech => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary/70 px-2.5 py-0.5 text-xs text-secondary-foreground"
                    >
                      {techLabel[tech] ?? tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
                  {project.githubUrl && (
                    <Link
                      className="inline-link inline-flex items-center gap-1.5 text-foreground"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="h-4 w-4" /> Source <ArrowUpRight className="link-arrow h-4 w-4" />
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      className="inline-link inline-flex items-center gap-1.5 text-cyan-300"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live demo <ArrowUpRight className="link-arrow h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-8">
        <Link
          href="/projects"
          className="inline-link inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Explore all projects <ArrowUpRight className="link-arrow h-4 w-4" />
        </Link>
      </div>

      {/* More Work Section */}
      <div className="mt-16">
        <SectionHeader
          number="03"
          label="MORE WORK"
          title="More Work"
          description="Other projects and experiments."
          aside={`${otherProjects.length} PROJECTS`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <article
              key={project.id}
              className="group rounded-lg border border-border/40 bg-card/50 p-5 hover:border-border/80 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {project.shortDescription}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map(tech => (
                  <span
                    key={tech}
                    className="rounded-full bg-secondary/70 px-2 py-0.5 text-xs text-secondary-foreground"
                  >
                    {techLabel[tech] ?? tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                {project.githubUrl && (
                  <Link
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-cyan-400 transition-colors"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-3.5 w-3.5" /> Source <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-400 transition-colors"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
