'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const PULSE_PATHS: Record<string, string> = {
  resting:    'M 10 30 L 90 30',
  blip:       'M 10 30 L 40 30 L 45 8 L 50 30 L 90 30',
  building:   'M 10 30 L 30 30 L 35 18 L 40 30 L 55 30 L 60 15 L 65 30 L 90 30',
  milestone:  'M 10 30 L 25 30 L 30 5 L 38 35 L 45 10 L 52 30 L 65 30 L 72 8 L 80 30 L 90 30',
  lapse:      'M 10 30 Q 50 45 90 30',
  return:     'M 10 30 Q 30 40 50 30 L 55 10 L 60 30 L 90 30',
  newCustomer:'M 10 30 L 50 30 L 53 15 L 56 30 L 90 30',
}

export type PulseState = keyof typeof PULSE_PATHS

export function PulseLineMascot({
  state = 'resting',
  className = '',
  animate = true,
}: {
  state?: PulseState
  className?: string
  animate?: boolean
}) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!animate || !pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    const animation = path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      {
        duration: state === 'milestone' ? 2000 : state === 'building' ? 1500 : 1000,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards',
      }
    )
    return () => animation.cancel()
  }, [state, animate])

  return (
    <div className={className}>
      <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          ref={pathRef}
          d={PULSE_PATHS[state]}
          stroke="#c8f55a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{
            duration: state === 'milestone' ? 2 : state === 'building' ? 1.5 : 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </svg>
    </div>
  )
}