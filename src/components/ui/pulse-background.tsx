'use client'

import { useEffect, useRef } from 'react'

type DriftLine = {
  id: number
  pathEl: SVGPathElement
  glowEl: SVGCircleElement
  segments: { x: number; y: number }[]
  scrollFactor: number
  nextPulseTime: number
  pulsed: boolean
  opacity: number
}

function wavyPath(
  segments: { x: number; y: number }[],
  time: number,
  scrollOffset: number,
  factor: number
): string {
  if (segments.length < 2) return ''
  let d = `M ${segments[0].x} ${segments[0].y}`

  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1]
    const curr = segments[i]
    const t = time * 0.3 + scrollOffset * factor + i * 0.8
    const waveAmp = 4 + Math.sin(t) * 3

    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2
    const dx = curr.x - prev.x
    const dy = curr.y - prev.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const nx = len > 0 ? -dy / len : 0
    const ny = len > 0 ? dx / len : 0

    const cp1x = midX + nx * waveAmp + (Math.random() - 0.5) * 2
    const cp1y = midY + ny * waveAmp + (Math.random() - 0.5) * 2
    const cp2x = midX - nx * waveAmp * 0.7 + (Math.random() - 0.5) * 2
    const cp2y = midY - ny * waveAmp * 0.7 + (Math.random() - 0.5) * 2

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
  }
  return d
}

export function PulseBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<DriftLine[]>([])
  const frameRef = useRef<number>(0)
  const scrollYRef = useRef<number>(0)
  const syncTimerRef = useRef<number>(0)
  const syncActiveRef = useRef<boolean>(false)

  useEffect(() => {
    if (!containerRef.current) return

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0.38'

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', 'drift-glow')
    filter.innerHTML = `
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    `
    svg.appendChild(filter)

    // 5 lines spanning edge to edge
    const lineDefs = [
      // Top-left to bottom-right, weaving across
      { startX: -10, startY: -10, endX: 110, endY: 110, midShift: 15, scrollFactor: 0.4 },
      // Bottom-left to top-right
      { startX: -10, startY: 110, endX: 110, endY: -10, midShift: -12, scrollFactor: 0.55 },
      // Top edge meandering down center
      { startX: 50, startY: -10, endX: 50, endY: 110, midShift: 20, scrollFactor: 0.35 },
      // Left edge across horizontally with vertical wave
      { startX: -10, startY: 30, endX: 110, endY: 30, midShift: 10, scrollFactor: 0.5 },
      // Right edge to bottom-left, longest diagonal
      { startX: 110, startY: -10, endX: -10, endY: 110, midShift: -18, scrollFactor: 0.45 },
    ]

    const driftLines: DriftLine[] = lineDefs.map((def, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathEl.setAttribute('stroke', '#c8f55a')
      pathEl.setAttribute('stroke-width', '0.35')
      pathEl.setAttribute('fill', 'none')
      pathEl.setAttribute('stroke-linecap', 'round')
      pathEl.setAttribute('filter', 'url(#drift-glow)')
      pathEl.style.opacity = '0.35'

      const glowEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      glowEl.setAttribute('r', '2.5')
      glowEl.setAttribute('fill', '#c8f55a')
      glowEl.setAttribute('filter', 'url(#drift-glow)')
      glowEl.style.opacity = '0'

      g.appendChild(pathEl)
      g.appendChild(glowEl)
      svg.appendChild(g)

      // Generate 10 segments from start to end with a midpoint shift for curvature
      const numSegments = 10
      const segments: { x: number; y: number }[] = []
      for (let s = 0; s < numSegments; s++) {
        const t = s / (numSegments - 1)
        const baseX = def.startX + (def.endX - def.startX) * t
        const baseY = def.startY + (def.endY - def.startY) * t
        // Shift midpoint perpendicular to create natural curve
        const midCurve = Math.sin(t * Math.PI) * def.midShift
        const dx = def.endX - def.startX
        const dy = def.endY - def.startY
        const len = Math.sqrt(dx * dx + dy * dy)
        const nx = len > 0 ? -dy / len : 0
        const ny = len > 0 ? dx / len : 0
        segments.push({
          x: baseX + nx * midCurve,
          y: baseY + ny * midCurve,
        })
      }

      return {
        id: i,
        pathEl,
        glowEl,
        segments,
        scrollFactor: def.scrollFactor,
        nextPulseTime: performance.now() + 3000 + Math.random() * 5000,
        pulsed: false,
        opacity: 0.35,
      }
    })

    containerRef.current.appendChild(svg)
    linesRef.current = driftLines

    // Track scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Sync timer — every 18-25 seconds, all lines pulse together
    const scheduleSync = () => {
      syncTimerRef.current = window.setTimeout(
        () => {
          syncActiveRef.current = true
          setTimeout(() => {
            syncActiveRef.current = false
            scheduleSync()
          }, 3000)
        },
        18000 + Math.random() * 7000
      )
    }
    scheduleSync()

    let lastTime = performance.now()

    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50)
      lastTime = time
      const t = time * 0.001
      const scrollOffset = scrollYRef.current * 0.001

      driftLines.forEach((line) => {
        // Update wavy path
        line.pathEl.setAttribute(
          'd',
          wavyPath(line.segments, t, scrollOffset, line.scrollFactor)
        )

        // Sync active: all lines pulse together with elevated opacity
        if (syncActiveRef.current) {
          const syncElapsed = time % 3000
          const syncProgress = syncElapsed / 2500
          if (syncProgress < 1) {
            line.pathEl.style.opacity = `${0.35 + Math.sin(syncProgress * Math.PI) * 0.5}`
            const pathLength = line.pathEl.getTotalLength()
            if (pathLength > 0) {
              const point = line.pathEl.getPointAtLength(pathLength * syncProgress)
              line.glowEl.setAttribute('cx', `${point.x}`)
              line.glowEl.setAttribute('cy', `${point.y}`)
              line.glowEl.style.opacity = `${Math.sin(syncProgress * Math.PI) * 0.9}`
            }
          } else {
            line.pathEl.style.opacity = '0.35'
            line.glowEl.style.opacity = '0'
          }
          return
        }

        // Independent pulse logic
        if (time >= line.nextPulseTime) {
          // Start pulse
          line.nextPulseTime = time + 2500 + Math.random() * 6000 // Pulse duration + random gap
          line.pulsed = true
        }

        if (line.pulsed) {
          const elapsed = time - (line.nextPulseTime - (2500 + Math.random() * 6000)) + 2500
          const progress = Math.min(elapsed / 2200, 1)

          if (progress < 1) {
            line.pathEl.style.opacity = `${0.35 + Math.sin(progress * Math.PI) * 0.35}`
            const pathLength = line.pathEl.getTotalLength()
            if (pathLength > 0) {
              const point = line.pathEl.getPointAtLength(pathLength * progress)
              line.glowEl.setAttribute('cx', `${point.x}`)
              line.glowEl.setAttribute('cy', `${point.y}`)
              line.glowEl.style.opacity = `${Math.sin(progress * Math.PI) * 0.8}`
            }
          } else {
            line.pulsed = false
            line.pathEl.style.opacity = '0.35'
            line.glowEl.style.opacity = '0'
          }
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      clearTimeout(syncTimerRef.current)
      window.removeEventListener('scroll', handleScroll)
      if (svg.parentNode) svg.parentNode.removeChild(svg)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    />
  )
}