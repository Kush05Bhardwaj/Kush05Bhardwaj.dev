"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Static projects data
const projects = [ 
  {
    id: "1",
    title: "Personal Portfolio",
    shortDescription: "Portfolio Website",
    images: ["/cv.png"],
    liveUrl: "https://kush05bhardwaj.vercel.app/",
    technologies: ["js", "react", "ts", "tailwindcss"],
  },
  {
    id: "2",
    title: "Alisa-AI-Assistant",
    shortDescription: "AI companion (local)",
    images: ["/Kush05BhardwajAlisa.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/Nexus-Alisa-AI-Assistant",
    technologies: ["python", "LLM", "opencv", "AI", "ml"],
  },
    {
    id: "3",
    title: "Goonify",
    shortDescription: "A Spotify-Style Music App with Personal Touches",
    images: ["/goonify.png"],
    liveUrl: "https://goonify-kindoff-spotify-clone.vercel.app",
    technologies: ["js", "react", "ts", "tailwindcss", "nextjs", "nodejs"],
  },
  {
    id: "4",
    title: "ECL Parcel",
    shortDescription: "Logistics Website",
    images: ["/ecl.png"],
    liveUrl: "https://www.eclparcel.in",
    technologies: ["js", "react", "nextjs", "tailwindcss"],
  },
  {
    id: "4",
    title: "Artistry",
    shortDescription: "Artistry AI Redesign",
    images: ["/Artistry.jpg"],
    liveUrl: "https://artistry-six.vercel.app",
    technologies: ["js", "react", "ts", "tailwindcss", "python", "LLM"],
  },
  {
    id: "6",
    title: "Python Scripts Collection",
    shortDescription: "A bunch of random Python stuff that somehow works.",
    images: ["/Kush05Bhardwajpython-scripts1.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/python-scripts",
    technologies: ["python"],
  },
]

export default function BestWorks() {
  const [currentIndex, setCurrentIndex] = useState(projects.length) // Start at middle set
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Triple the projects for infinite loop
  const tripleProjects = [...projects, ...projects, ...projects]

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 3000) // Change slide every 3 seconds
      
      return () => clearInterval(interval)
    }
  }, [isPaused])

  // Reset position when reaching the end of second set for seamless loop
  useEffect(() => {
    if (currentIndex >= projects.length * 2) {
      // When we reach the end of the second copy, jump back to the middle copy
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(projects.length)
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsTransitioning(true)
          }, 50)
        })
      }, 500)
      return () => clearTimeout(timeout)
    } else if (currentIndex < projects.length && currentIndex > 0) {
      // When scrolling backwards past the middle copy, jump to end of middle copy
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(projects.length + currentIndex)
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsTransitioning(true)
          }, 50)
        })
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => prev - 1)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <section id="projects" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12">
        <Code className="text-[#ffffff]" />
        <h2 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">
            Projects
          </span>
        </h2>
      </div>

      {/* Continuous Scrolling Container */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/10 rounded-full p-3 transition-all duration-300 border border-white/20 hover:border-white/40"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/10 rounded-full p-3 transition-all duration-300 border border-white/20 hover:border-white/40"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Add gradient overlays on edges - stronger and wider */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling wrapper - offset to show partial cards on sides */}
        <div 
          className={`flex gap-6 will-change-transform ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{ 
            paddingLeft: 'calc(50vw - 280px)',
            transform: `translateX(-${currentIndex * 584}px)` // card width (560px) + gap (24px)
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Render triple projects for infinite loop */}
          {tripleProjects.map((project, index) => {
            const projectLink = project.liveUrl || project.githubUrl || "#"
            const isExternal = projectLink.startsWith("http")

            return (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-[560px] bg-zinc-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-300 group"
              >
                {/* Image */}
                <div className="relative h-[220px] w-full overflow-hidden bg-black">
                  <Image
                    src={project.images?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`
                      ${project.id === '6' ? 'object-contain p-6' : 'object-cover'}
                      transition-transform duration-500 group-hover:scale-110
                    `}
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-white line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
                        <div
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-gray-300 border border-white/10"
                        >
                          {tech === "js" && "JavaScript"}
                          {tech === "react" && "React"}
                          {tech === "ts" && "TypeScript"}
                          {tech === "nextjs" && "Next.js"}
                          {tech === "tailwindcss" && "Tailwind"}
                          {tech === "mongodb" && "MongoDB"}
                          {tech === "nodejs" && "Node.js"}
                          {tech === "python" && "Python"}
                          {tech === "ml" && "ML"}
                          {tech === "LLM" && "LLM"}
                          {tech === "opencv" && "OpenCV"}
                          {tech === "AI" && "AI"}
                          {![
                            "js",
                            "react",
                            "ts",
                            "nextjs",
                            "tailwindcss",
                            "mongodb",
                            "nodejs",
                            "python",
                            "ml",
                            "LLM",
                            "opencv",
                            "AI"
                          ].includes(tech) && tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
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
      </div>

      <div className="flex justify-center mt-16">
        <Button
          asChild
          className="bg-[#ffffff] hover:bg-[#e5e5e5] text-black shadow-lg shadow-[#ffffff]/20 hover:shadow-[#ffffff]/30 transition-all duration-300 hover:scale-105"
        >
          <Link
            href="https://github.com/Kush05Bhardwaj?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
