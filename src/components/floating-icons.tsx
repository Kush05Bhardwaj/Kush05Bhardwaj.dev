"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"

type Particle = {
  id: number
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  opacity: number
  speed: number
  angle: number
  color: string
  glowIntensity: number
}

export default function FloatingIcons() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      })
    }
  }, [])

  useEffect(() => {
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove)
    
    // Available colors - subtle gradients (white/grey tones)
    const colors = [
      'rgba(255, 255, 255, 0.6)',  // white
      'rgba(229, 229, 229, 0.6)',  // light grey
      'rgba(204, 204, 204, 0.6)',  // medium light grey
      'rgba(245, 245, 245, 0.6)',  // very light grey
      'rgba(250, 250, 250, 0.6)',  // off-white
      'rgba(220, 220, 220, 0.6)',  // medium grey
    ]

    // Create initial particles
    const initialParticles: Particle[] = Array.from({ length: 50 }).map((_, index) => {
      const baseX = Math.random() * 100
      const baseY = Math.random() * 100
      
      return {
        id: index,
        x: baseX,
        y: baseY,
        baseX: baseX,
        baseY: baseY,
        size: Math.random() * 3 + 1, // 1-4px
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
        speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowIntensity: Math.random() * 0.3 + 0.1
      }
    })

    setParticles(initialParticles)
    
    // Animation function
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from mouse
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Cursor interaction radius (in percentage)
          const interactionRadius = 15
          let newX = particle.x
          let newY = particle.y
          let newOpacity = particle.opacity
          let newGlow = particle.glowIntensity
          
          if (distance < interactionRadius) {
            // Repel from cursor
            const force = (interactionRadius - distance) / interactionRadius
            const repelX = (particle.x - mousePos.x) * force * 0.5
            const repelY = (particle.y - mousePos.y) * force * 0.5
            
            newX = particle.x + repelX
            newY = particle.y + repelY
            
            // Increase opacity and glow when near cursor
            newOpacity = Math.min(particle.opacity + force * 0.3, 0.8)
            newGlow = Math.min(particle.glowIntensity + force * 0.4, 0.6)
          } else {
            // Slowly drift back to base position
            const returnForce = 0.02
            newX = particle.x + (particle.baseX - particle.x) * returnForce
            newY = particle.y + (particle.baseY - particle.y) * returnForce
            
            // Normal floating animation
            newX += Math.sin(Date.now() * 0.001 + particle.angle) * 0.1
            newY += Math.cos(Date.now() * 0.001 + particle.angle) * 0.1
            
            // Reset opacity and glow
            newOpacity = particle.opacity * 0.99 + 0.1 * 0.01
            newGlow = particle.glowIntensity * 0.99 + 0.1 * 0.01
          }
          
          // Keep particles within bounds
          newX = Math.max(0, Math.min(100, newX))
          newY = Math.max(0, Math.min(100, newY))
          
          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: newOpacity,
            glowIntensity: newGlow
          }
        })
      )
      
      animationRef.current = requestAnimationFrame(animateParticles)
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animateParticles)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, handleMouseMove])

  return (
    <div ref={containerRef} className="w-full h-full">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-100 ease-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            filter: `blur(${particle.glowIntensity}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
