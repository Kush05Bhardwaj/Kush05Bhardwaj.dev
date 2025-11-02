import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BestWorks() {
  const projects = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "Portfolio Website",
      image: "/cv.png?height=200&width=400",
      link: "#",
      technologies: ["js", "react", "ts", "tailwindcss"],
    },
    
    {
      id: 2,
      title: "ECL Parcel",
      description: "Logistics Website",
      image: "/ecl.png?height=200&width=400",
      link: "https://www.eclparcel.in/",
      target: "_blank",
      rel: "noopener noreferrer",
      technologies: ["js", "react", "nextjs", "tailwindcss"],
    },
    
    {
      id: 3,
      title: "Nexus",
      description: "Nexus - Personal AI Assistant with Local LLM Integration",
      image: "/Nexus.jpg?height=200&width=400",
      link: "https://github.com/Kush05Bhardwaj/Nexus-Personal-AI-Assistant-with-Local-LLM-Integration",
      target: "_blank",
      rel: "noopener noreferrer",
      technologies: ["python", "ai", "ml"],
    },

    {
      id: 4,
      title: "Artistry",
      description: "Artistry AI Redesign",
      image: "/Artistry.jpg?height=200&width=400",
      link: "#",
      technologies: ["js", "react", "ts", "tailwindcss", "python", "LLM"],
    },
  ]

  return (
    <section id="projects" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <Code className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          Some of my <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Best Works</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="glass-card overflow-hidden hover-lift rounded-lg"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <CardContent className="p-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-6">
              <div className="flex justify-between w-full mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">{project.title}</h3>
                <Link href={project.link} className="text-[#a5a5c8] hover:text-[#7b3fe4] transition-colors">
                  {project.description} <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <div 
                    key={tech} 
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#1e1b2f] text-[#b799ff] border border-[#7b3fe4]/20"
                  >
                    {tech === "js" && "JavaScript"}
                    {tech === "react" && "React"}
                    {tech === "ts" && "TypeScript"}
                    {tech === "nextjs" && "Next.js"}
                    {tech === "tailwindcss" && "Tailwind CSS"}
                    {tech === "mongodb" && "MongoDB"}
                    {tech === "git" && "Git & GitHub"}
                    {tech === "ai" && "AI Integration"}
                    {tech === "html5" && "HTML5"}
                    {tech === "css3" && "CSS3"}
                    {tech === "nodejs" && "Node.js"}
                    {tech === "python" && "Python"}
                    {tech === "ml" && "ML"}
                    {tech === "LLM" && "LLM"}
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild className="bg-[#7b3fe4] hover:bg-[#6b2fd4] text-white shadow-lg shadow-[#7b3fe4]/20 hover:shadow-[#7b3fe4]/30">
          <Link href="https://github.com/Kush05Bhardwaj?tab=repositories" target="_blank" rel="noopener noreferrer">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
