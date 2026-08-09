"use client"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import TechStack from "@/components/tech-stack"
import GitHubContributions from "@/components/github-contributions"
import BestWorks from "@/components/best-works"
import WorkExperience from "@/components/work-experience"
import Education from "@/components/education"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import About from "@/components/about"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import InteractionLayer from "@/components/interaction-layer"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <InteractionLayer />
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <div className="scroll-section"><About /></div>
          <div className="scroll-section"><BestWorks /></div>
          <div className="scroll-section"><GitHubContributions /></div>
          <div className="scroll-section"><WorkExperience /></div>
          <div className="scroll-section"><TechStack /></div>
          <div className="scroll-section"><Education /></div>
          <div className="scroll-section"><Testimonials /></div>
          <div className="scroll-section"><Contact /></div>
          <Footer />
        </div>
      </div>
      <BackToTop />
    </main>
  )
}
