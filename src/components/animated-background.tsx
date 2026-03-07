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
    const numDots = 120

    for (let i = 0; i < numDots; i++) {
      movingDots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 0.6 + 0.3, // tiny: 0.3–0.9px
        hue: 0
      })
    }

    // Animation
    let animationId: number
    
    function animate() {
      if (!ctx) return

      // Hard clear each frame — no trails, clean stars
      ctx.clearRect(0, 0, width, height)

      movingDots.forEach(dot => {
        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x <= 0 || dot.x >= width) dot.vx *= -1
        if (dot.y <= 0 || dot.y >= height) dot.vy *= -1
        dot.x = Math.max(0, Math.min(width, dot.x))
        dot.y = Math.max(0, Math.min(height, dot.y))

        // Soft glow halo — small radius
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 4
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, 0.5)`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, 0.1)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Crisp core dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, 0.85)`
        ctx.shadowBlur = 3
        ctx.shadowColor = `rgba(255, 255, 255, 0.6)`
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
      style={{ background: 'transparent', opacity: 0.9 }}
    />
  )
} 