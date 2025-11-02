"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarWithRings, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ravi Kant",
      role: "COO",
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
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <MessageSquare className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          Check out these <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Testimonials</span>
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
                <Card className="glass-card mx-auto max-w-2xl hover-lift rounded-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <AvatarWithRings 
                        showRings={true} 
                        ringColors={["border-[#7b3fe4]/50", "border-[#b799ff]/30", "border-[#7b3fe4]/20"]}
                        className="border-2 border-[#7b3fe4]/50"
                      >
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] text-white">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </AvatarWithRings>
                      <div>
                        <h3 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">{testimonial.name}</h3>
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                ? "bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] scale-125" 
                : "bg-[#1e1b2f] hover:bg-[#7b3fe4]/30"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="glass-card absolute left-0 top-1/2 -translate-y-1/2 text-[#e9e9f5] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 transition-all duration-300"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="glass-card absolute right-0 top-1/2 -translate-y-1/2 text-[#e9e9f5] hover:text-[#7b3fe4] hover:border-[#7b3fe4]/50 transition-all duration-300"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
