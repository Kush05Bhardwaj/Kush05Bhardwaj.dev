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

    // Create minimal grid
    const drawGrid = () => {
      const gridSize = 30 // Smaller spacing between grid lines
      const gridOpacity = 0.03 // Very subtle
      
      ctx.strokeStyle = `rgba(123, 63, 228, ${gridOpacity})`
      ctx.lineWidth = 1
      
      // Draw vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      
      // Draw horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      
      // Draw subtle dots at intersections
      ctx.fillStyle = `rgba(123, 63, 228, ${gridOpacity * 2})`
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Create moving dots
    const movingDots: MovingDot[] = []
    const numDots = 25 // Much fewer dots

    for (let i = 0; i < numDots; i++) {
      movingDots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 3 + 2, // Smaller: 2-5px
        hue: Math.random() * 60 + 240 // Purple to blue range
      })
    }

    // Animation
    let animationId: number
    
    function animate() {
      // Dark background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, height)
      bgGradient.addColorStop(0, '#0a0612')
      bgGradient.addColorStop(1, '#1a0f2e')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      drawGrid()

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

        // Draw glow
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 8
        )
        gradient.addColorStop(0, `hsla(${dot.hue}, 70%, 50%, 0.15)`)
        gradient.addColorStop(0.3, `hsla(${dot.hue}, 70%, 45%, 0.1)`)
        gradient.addColorStop(0.6, `hsla(${dot.hue}, 70%, 40%, 0.05)`)
        gradient.addColorStop(1, `hsla(${dot.hue}, 70%, 35%, 0)`)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw core dot - much dimmer
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${dot.hue}, 75%, 60%, 0.3)`
        ctx.shadowBlur = 6
        ctx.shadowColor = `hsla(${dot.hue}, 70%, 50%, 0.2)`
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
      style={{ background: '#0a0612' }}
    />
  )
} 