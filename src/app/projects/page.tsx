"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { otherProjects, techLabel } from "@/lib/projects-data"
import AnimatedBackground from "@/components/animated-background"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white relative overflow-hidden">
      {/* Same animated starry background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">

        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[#a5a5c8] hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Heading */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-white">Other Projects</h1>
        </div>
        <p className="text-[#a5a5c8] mb-12">More things I've built and experimented with.</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherProjects.map((project) => {
            const hasImage = project.images.length > 0 && project.images[0]

            return (
              <div
                key={project.id}
                className="flex flex-col bg-zinc-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image / Placeholder */}
                <div className="relative h-[180px] w-full overflow-hidden bg-zinc-950">
                  {hasImage ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Github className="w-10 h-10 text-white/10" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.shortDescription}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-gray-300 border border-white/10"
                      >
                        {techLabel[tech] ?? tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-1">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 text-center text-sm flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 text-white font-medium border border-white/20 hover:border-white/40 hover:bg-zinc-700 transition-all duration-300 text-center text-sm flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        Repo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View all on GitHub */}
        <div className="flex justify-center mt-14">
          <Button
            asChild
            className="bg-white hover:bg-gray-200 text-black shadow-lg shadow-white/20 hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            <Link
              href="https://github.com/Kush05Bhardwaj?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All on GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </main>
  )
}
