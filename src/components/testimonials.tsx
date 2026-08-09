"use client"

import SectionHeader from "@/components/section-header"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"


const testimonials = [
  {
    id:      1,
    name:    "Ravi Kant",
    role:    "COO — ECL Parcel",
    content: "Kushagra is a very talented and hardworking individual. He is very passionate about his work and always delivers on time. I highly recommend him.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => setCurrentIndex(i => (i + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex(i => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (testimonials.length < 2) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentIndex]

  return (
    <section id="testimonials">
      <SectionHeader
        number="07"
        label="TESTIMONIALS"
        title="Testimonials"
        description="Words from people I have had the opportunity to work with."
      />

      <div className="relative max-w-2xl">
        {/* Quote */}
        <div aria-hidden="true" className="testimonial-quote-mark">&ldquo;</div>

        <blockquote className="testimonial-blockquote">
          {testimonial.content}
        </blockquote>

        {/* Attribution */}
        <footer className="testimonial-attribution">
          <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-border/50 bg-card text-foreground text-sm font-medium">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
          </div>
        </footer>

        {/* Navigation — only shown when multiple testimonials exist */}
        {testimonials.length > 1 && (
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="p-1.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-cyan-400 scale-125" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="p-1.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
