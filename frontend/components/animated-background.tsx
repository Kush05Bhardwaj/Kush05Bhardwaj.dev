"use client"

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const context = ctx as CanvasRenderingContext2D

    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Very minimal grid - larger spacing
    const dotSize = 1
    const spacing = 60 // Increased spacing for less clutter
    const dots: { x: number; y: number; offset: number }[] = []

    // Create minimal grid dots
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({
          x,
          y,
          offset: Math.random() * Math.PI * 2
        })
      }
    }

    // Animation loop
    let time = 0
    function animate() {
      // Deep violet-black background
      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#0a0612')  // Deep violet-black
      gradient.addColorStop(1, '#1e1b2f')  // Slightly lighter violet
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      // Draw ultra-subtle dots with purple glow
      dots.forEach(dot => {
        const pulse = Math.sin(time * 0.0008 + dot.offset) * 0.5 + 0.5
        const opacity = 0.03 + pulse * 0.02
        
        context.beginPath()
        context.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        context.fillStyle = `rgba(123, 63, 228, ${opacity})` // Purple accent
        context.fill()
      })

      time++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ 
        background: '#0a0612',
      }}
    />
  )
} 