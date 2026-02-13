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
    // More particles for better coverage
    const initialParticles: Particle[] = Array.from({ length: 12 }).map((_, index) => {
      return {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.3, // Tiny: 0.3-0.8px (like reference image)
        duration: Math.random() * 20 + 30, // Much slower: 30-50s
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
          className="absolute rounded-full bg-white/30 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5), 0 0 4px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  )
}
