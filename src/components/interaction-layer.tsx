"use client"

import { useEffect, useRef } from "react"

export default function InteractionLayer() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const sections = Array.from(document.querySelectorAll(".scroll-section"))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-inview"); observer.unobserve(entry.target) } }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (reduceMotion.matches || !finePointer.matches) return

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    const dot = dotRef.current
    const ring = ringRef.current
    const interactiveSelector = "a, button, input, textarea, [role='button']"

    const update = () => {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      if (dot) dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(update)
    }
    const move = (event: MouseEvent) => { targetX = event.clientX; targetY = event.clientY; document.documentElement.classList.add("has-custom-cursor") }
    const over = (event: MouseEvent) => ring?.classList.toggle("is-active", Boolean((event.target as Element | null)?.closest(interactiveSelector)))
    window.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseover", over, { passive: true })
    frame = requestAnimationFrame(update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.documentElement.classList.remove("has-custom-cursor") }
  }, [])

  return <><div ref={dotRef} className="cursor-dot" aria-hidden="true" /><div ref={ringRef} className="cursor-ring" aria-hidden="true" /></>
}

