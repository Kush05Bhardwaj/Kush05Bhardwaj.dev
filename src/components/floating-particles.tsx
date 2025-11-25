"use client"

import type React from "react"
import { useEffect, useState } from "react"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Even fewer particles - ultra minimal
    const initialParticles: Particle[] = Array.from({ length: 6 }).map((_, index) => {
      return {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // Smaller: 1-3px
        duration: Math.random() * 15 + 20, // Slower: 20-35s
        delay: Math.random() * 5,
      }
    })

    setParticles(initialParticles)
  }, [])

  return (
    <div className="w-full h-full">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#7b3fe4]/10 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
