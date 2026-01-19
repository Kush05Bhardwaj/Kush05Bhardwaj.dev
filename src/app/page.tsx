"use client"

import { useEffect, useState, useRef } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import TechStack from "@/components/tech-stack"
import BestWorks from "@/components/best-works"
import WorkExperience from "@/components/work-experience"
import Education from "@/components/education"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import FloatingParticles from "@/components/floating-particles"
import About from "@/components/about"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Enhanced scroll animation observer with better threshold
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '-50px', // Trigger slightly before element enters viewport
        threshold: 0.15, // Trigger when 15% of element is visible
      }
    );
    
    // Target all elements with the reveal-on-scroll class
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    scrollElements.forEach((el) => scrollObserver.observe(el));
    
    return () => {
      if (scrollElements) {
        scrollElements.forEach((el) => scrollObserver.unobserve(el));
      }
    };
  }, []);

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#0a0612] relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>
      
      {/* Very subtle floating particles */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <FloatingParticles />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-24 py-6 md:py-8">
          {/* Hero section */}
          <Hero />

          {/* Content sections with subtle reveal animation */}
          {[
            { Component: About, delay: 0.1 },
            { Component: TechStack, delay: 0.15 },
            { Component: BestWorks, delay: 0.2 },
            { Component: Testimonials, delay: 0.25 },
            { Component: WorkExperience, delay: 0.3 },
            { Component: Education, delay: 0.35 },
          ].map(({ Component, delay }, index) => (
            <div
              key={index}
              className="animate-fade-in-up reveal-on-scroll glass-card p-6 sm:p-8 hover-lift rounded-lg"
              style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
            >
              <Component />
            </div>
          ))}
          
          {/* Contact section */}
          <div 
            className="animate-fade-in-up reveal-on-scroll glass-card hover-lift rounded-lg"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <Contact />
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  )
}
