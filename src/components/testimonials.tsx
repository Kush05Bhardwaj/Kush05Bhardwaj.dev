"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarWithRings, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal()
  
  const testimonials = [
    {
      id: 1,
      name: "Ravi Kant",
      role: "COO- ECL Parcel",
      content:
        "Kushagra is a very talented and hardworking individual. He is very passionate about his work and always delivers on time. I highly recommend him.",
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12">
        <MessageSquare className="text-[#ffffff]" />
        <h2 className="text-3xl font-bold">
          Check out these <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">Testimonials</span>
        </h2>
      </div>

      <div className="relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="mx-auto max-w-2xl rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ffffff]/20 bg-transparent border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <AvatarWithRings 
                        showRings={true} 
                        ringColors={["border-[#ffffff]/50", "border-[#cccccc]/30", "border-[#ffffff]/20"]}
                        className="border-2 border-[#ffffff]/50 transition-transform duration-300 group-hover:scale-110"
                      >
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#ffffff] to-[#cccccc] text-white">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </AvatarWithRings>
                      <div>
                        <h3 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#cccccc]">{testimonial.name}</h3>
                        <p className="text-sm text-[#a5a5c8]">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-[#e9e9f5] text-lg">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                index === currentIndex 
                ? "bg-gradient-to-r from-[#ffffff] to-[#cccccc] scale-125" 
                : "bg-[#1a1a1a] hover:bg-[#ffffff]/30"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="glass-card absolute left-0 top-1/2 -translate-y-1/2 text-[#e9e9f5] hover:text-[#ffffff] hover:border-[#ffffff]/50 transition-all duration-300 hover:scale-110"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="glass-card absolute right-0 top-1/2 -translate-y-1/2 text-[#e9e9f5] hover:text-[#ffffff] hover:border-[#ffffff]/50 transition-all duration-300 hover:scale-110"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
