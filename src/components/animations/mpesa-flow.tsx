'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function MpesaFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const phase1 = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const phase2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const phase3 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const phase4 = useTransform(scrollYProgress, [0.75, 1], [0, 1])

  // GSAP: animate dot along the path and pulse glow
  useEffect(() => {
    if (!dotRef.current || !glowRef.current) return

    const path = document.querySelector('#mpesa-path') as SVGPathElement
    if (!path) return

    const pathLength = path.getTotalLength()

    // Set up the dot and glow at start of path
    gsap.set(dotRef.current, { opacity: 1 })
    gsap.set(glowRef.current, { opacity: 0.6, scale: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2,
      },
    })

    // Move dot along the curved path
    tl.to(dotRef.current, {
      motionPath: {
        path: '#mpesa-path',
        align: '#mpesa-path',
        alignOrigin: [0.5, 0.5],
      },
      ease: 'none',
    })

    // Glow pulses as it travels
    tl.to(
      glowRef.current,
      {
        scale: 2.5,
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: 'sine.inOut',
      },
      0
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // Pulsing ring behind the traveling dot
  const pulseRings = [0, 1, 2].map((i) => (
    <circle
      key={i}
      r={8 + i * 6}
      fill="none"
      stroke="#43b02a"
      strokeWidth="1"
      opacity={0.3 - i * 0.1}
      className="traveling-ring"
    />
  ))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <svg viewBox="0 0 800 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="mpesa-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dot-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pulse-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="dotGradient">
                <stop offset="0%" stopColor="#43b02a" stopOpacity="1" />
                <stop offset="50%" stopColor="#c8f55a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#43b02a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* The curved path — invisible, used as track */}
            <path
              id="mpesa-path"
              d="M 130 220 C 250 150, 350 280, 450 200 C 480 185, 500 200, 550 200"
              fill="none"
              stroke="transparent"
              strokeWidth="0"
            />

            {/* Phone 1 — M-Pesa */}
            <g transform="translate(50, 150)">
              <rect x="0" y="0" width="80" height="140" rx="10" fill="none" stroke="#2a2a28" strokeWidth="1.5" />
              <rect x="10" y="20" width="60" height="90" rx="4" fill="#111110" />
              <motion.g style={{ opacity: phase1 }}>
                <rect x="15" y="35" width="50" height="8" rx="2" fill="#43b02a" opacity="0.3" />
                <rect x="15" y="50" width="50" height="6" rx="2" fill="#43b02a" opacity="0.2" />
                <rect x="15" y="62" width="35" height="6" rx="2" fill="#43b02a" opacity="0.4" />
                <text x="18" y="38" fill="#43b02a" fontFamily="monospace" fontSize="5">M-PESA</text>
                <text x="18" y="55" fill="#f0ede8" fontFamily="monospace" fontSize="4">Payment sent</text>
                <text x="18" y="68" fill="#888880" fontFamily="monospace" fontSize="4">KES ***</text>
              </motion.g>
            </g>

            {/* The drawn line with glow */}
            <motion.path
              d="M 130 220 C 250 150, 350 280, 450 200 C 480 185, 500 200, 550 200"
              stroke="#43b02a"
              strokeWidth="2"
              fill="none"
              filter="url(#mpesa-glow)"
              style={{ pathLength: phase1 }}
            />

            {/* Traveling dot + glow rings */}
            <g filter="url(#dot-glow)">
              {pulseRings}
              <circle ref={glowRef} r="12" fill="url(#dotGradient)" />
              <circle ref={dotRef} r="5" fill="#43b02a" />
            </g>

            {/* Pulse System */}
            <g transform="translate(550, 170)">
              <motion.g style={{ scale: phase3, opacity: phase3 }}>
                <circle cx="0" cy="30" r="40" fill="none" stroke="#c8f55a" strokeWidth="1" opacity="0.3" />
                <circle cx="0" cy="30" r="35" fill="#0a0a08" stroke="#2a2a28" strokeWidth="1" />
                <path
                  d="M -20 30 L -5 30 L -2 15 L 2 35 L 6 20 L 9 30 L 20 30"
                  stroke="#c8f55a"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#pulse-glow)"
                />
              </motion.g>
            </g>

            {/* Customer Profile */}
            <motion.g transform="translate(620, 180)" style={{ opacity: phase3, scale: phase3 }}>
              <rect x="0" y="0" width="100" height="50" rx="8" fill="#111110" stroke="#2a2a28" strokeWidth="1" />
              <circle cx="25" cy="15" r="10" fill="#1a1a18" stroke="#2a2a28" strokeWidth="1" />
              <text x="40" y="18" fill="#f0ede8" fontFamily="monospace" fontSize="6">James</text>
              <text x="40" y="28" fill="#888880" fontFamily="monospace" fontSize="4">Visit #10</text>
              <rect x="10" y="35" width="80" height="3" rx="1.5" fill="#c8f55a" opacity="0.3" />
              <rect x="10" y="35" width="60" height="3" rx="1.5" fill="#c8f55a" />
            </motion.g>

            {/* SMS Notification */}
            <motion.g
              transform="translate(670, 100)"
              style={{ opacity: phase4, y: useTransform(phase4, [0, 1], [20, 0]) }}
            >
              <rect x="0" y="0" width="80" height="140" rx="10" fill="none" stroke="#2a2a28" strokeWidth="1.5" />
              <rect x="10" y="20" width="60" height="90" rx="4" fill="#111110" />
              <motion.g style={{ opacity: phase4 }}>
                <rect x="13" y="25" width="54" height="35" rx="4" fill="#1a1a18" stroke="#2a2a28" strokeWidth="0.5" />
                <text x="16" y="36" fill="#c8f55a" fontFamily="monospace" fontSize="4">Pulse</text>
                <text x="16" y="43" fill="#888880" fontFamily="monospace" fontSize="3">Now</text>
                <text x="16" y="52" fill="#f0ede8" fontFamily="monospace" fontSize="3.5">
                  James, it's your 10th visit 🎉
                </text>
              </motion.g>
            </motion.g>

            {/* Labels */}
            <motion.text x="75" y="310" fill="#f0ede8" fontFamily="monospace" fontSize="10" opacity={phase1}>
              A payment.
            </motion.text>
            <motion.text x="350" y="310" fill="#c8f55a" fontFamily="monospace" fontSize="10" opacity={phase3}>
              A person.
            </motion.text>
            <motion.text x="620" y="310" fill="#f0ede8" fontFamily="monospace" fontSize="10" opacity={phase4}>
              A relationship.
            </motion.text>
          </svg>
        </div>
      </div>
    </div>
  )
}