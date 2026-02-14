"use client"

import { useEffect, useRef } from 'react'

type MovingDot = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create moving dots
    const movingDots: MovingDot[] = []
    const numDots = 100 // More particles for better coverage

    for (let i = 0; i < numDots; i++) {
      movingDots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, // Slower movement
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 0.8 + 0.5, // Much smaller: 0.5-1.3px (tiny dots)
        hue: 0 // White (0 hue with low saturation)
      })
    }

    // Animation
    let animationId: number
    
    function animate() {
      if (!ctx) return // Add null check

      // Dark black background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      // Draw and update moving dots
      movingDots.forEach(dot => {
        // Update position
        dot.x += dot.vx
        dot.y += dot.vy

        // Bounce off edges
        if (dot.x <= 0 || dot.x >= width) dot.vx *= -1
        if (dot.y <= 0 || dot.y >= height) dot.vy *= -1

        // Keep within bounds
        dot.x = Math.max(0, Math.min(width, dot.x))
        dot.y = Math.max(0, Math.min(height, dot.y))

        // Draw glow - small with more brightness
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 4
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, 0.35)`)
        gradient.addColorStop(0.4, `rgba(255, 255, 255, 0.15)`)
        gradient.addColorStop(0.7, `rgba(255, 255, 255, 0.05)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw core dot - tiny and bright
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, 0.6)`
        ctx.shadowBlur = 3
        ctx.shadowColor = `rgba(255, 255, 255, 0.4)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ background: '#000000' }}
    />
  )
} 