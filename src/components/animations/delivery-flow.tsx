'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function DeliveryFlow() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Scroll drives everything
  const bikeProgress = useTransform(scrollYProgress, [0.08, 0.72], [0, 1])
  const roadDraw = useTransform(scrollYProgress, [0, 0.75], [0, 1])
  const orderedOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const emailOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1])
  const deliveredOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1])
  const reviewOpacity = useTransform(scrollYProgress, [0.75, 0.92], [0, 1])
  const scooterOpacity = useTransform(scrollYProgress, [0.04, 0.12], [0, 1])

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-5xl">
          <svg viewBox="0 0 900 500" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="doodle-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="notif-pop">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── THE ROAD ── */}
            <motion.path
              d="M 80 380 C 250 420, 350 300, 500 340 C 600 370, 700 280, 830 320"
              stroke="#2a2a28"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              style={{ pathLength: roadDraw }}
            />
            {/* Road glow */}
            <motion.path
              d="M 80 380 C 250 420, 350 300, 500 340 C 600 370, 700 280, 830 320"
              stroke="#c8f55a"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 6"
              opacity="0.3"
              filter="url(#doodle-glow)"
              style={{ pathLength: roadDraw }}
            />

            {/* ── START: Order Confirmed card ── */}
            <motion.g
              transform="translate(30, 280)"
              style={{ opacity: orderedOpacity, y: useTransform(orderedOpacity, [0, 1], [15, 0]) }}
            >
              <rect x="0" y="0" width="140" height="60" rx="10" fill="#111110" stroke="#c8f55a" strokeWidth="1" filter="url(#notif-pop)" />
              <circle cx="16" cy="30" r="9" fill="#c8f55a" opacity="0.15" />
              <text x="10" y="34" fill="#c8f55a" fontFamily="monospace" fontSize="11">✓</text>
              <text x="32" y="22" fill="#f0ede8" fontFamily="monospace" fontSize="8" fontWeight="bold">Order confirmed</text>
              <text x="32" y="36" fill="#888880" fontFamily="monospace" fontSize="7">Paystack webhook received</text>
              <text x="32" y="50" fill="#c8f55a" fontFamily="monospace" fontSize="7">Profile updated →</text>
            </motion.g>

            {/* ── EMAIL NOTIFICATION ── */}
            <motion.g
              transform="translate(200, 140)"
              style={{ opacity: emailOpacity, y: useTransform(emailOpacity, [0, 1], [20, 0]) }}
            >
              <rect x="0" y="0" width="200" height="72" rx="12" fill="#111110" stroke="#2a2a28" strokeWidth="1" filter="url(#notif-pop)" />
              {/* Email header */}
              <rect x="0" y="0" width="200" height="20" rx="12" fill="#1a1a18" />
              <rect x="0" y="10" width="200" height="10" fill="#1a1a18" />
              <text x="12" y="14" fill="#c8f55a" fontFamily="monospace" fontSize="7" fontWeight="bold">PULSE</text>
              <text x="160" y="14" fill="#888880" fontFamily="monospace" fontSize="6">Now</text>
              {/* Email body */}
              <text x="12" y="34" fill="#f0ede8" fontFamily="monospace" fontSize="8">Your order is on the way</text>
              <text x="12" y="48" fill="#888880" fontFamily="monospace" fontSize="7">Rider: Brian Kamau</text>
              <text x="12" y="60" fill="#888880" fontFamily="monospace" fontSize="7">📞 0712 345 678</text>
            </motion.g>

                       {/* ── THE SCOOTER ── */}
            <motion.g
              style={{
                opacity: scooterOpacity as any,
                offsetPath: "path('M 80 380 C 250 420, 350 300, 500 340 C 600 370, 700 280, 830 320')",
                offsetDistance: useTransform(bikeProgress, [0, 1], ['0%', '100%']) as any,
              }}
            >
              {/* Scooter body — doodle style */}
              <g transform="translate(0, 0)" filter="url(#doodle-glow)">
                {/* Wheels */}
                <circle cx="-14" cy="12" r="7" fill="none" stroke="#c8f55a" strokeWidth="1.5" />
                <circle cx="-14" cy="12" r="2" fill="#c8f55a" opacity="0.6" />
                <circle cx="14" cy="12" r="7" fill="none" stroke="#c8f55a" strokeWidth="1.5" />
                <circle cx="14" cy="12" r="2" fill="#c8f55a" opacity="0.6" />
                {/* Wheel spokes */}
                <line x1="-14" y1="5" x2="-14" y2="19" stroke="#c8f55a" strokeWidth="0.5" opacity="0.3" />
                <line x1="-21" y1="12" x2="-7" y2="12" stroke="#c8f55a" strokeWidth="0.5" opacity="0.3" />
                <line x1="7" y1="12" x2="21" y2="12" stroke="#c8f55a" strokeWidth="0.5" opacity="0.3" />
                <line x1="14" y1="5" x2="14" y2="19" stroke="#c8f55a" strokeWidth="0.5" opacity="0.3" />
                {/* Base platform */}
                <rect x="-18" y="2" width="36" height="8" rx="3" fill="#1a1a18" stroke="#c8f55a" strokeWidth="1" />
                {/* Seat */}
                <rect x="-8" y="-10" width="14" height="12" rx="4" fill="#1a1a18" stroke="#c8f55a" strokeWidth="1" />
                {/* Handlebar post */}
                <line x1="10" y1="-5" x2="16" y2="-16" stroke="#c8f55a" strokeWidth="1.2" />
                {/* Handlebars */}
                <line x1="8" y1="-16" x2="22" y2="-16" stroke="#c8f55a" strokeWidth="1.5" strokeLinecap="round" />
                {/* Headlight */}
                <circle cx="18" cy="-14" r="2.5" fill="#c8f55a" opacity="0.8" />
                <circle cx="18" cy="-14" r="5" fill="#c8f55a" opacity="0.15">
                  <animate attributeName="r" values="5;7;5" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.15;0.05;0.15" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {/* Rider silhouette */}
                <circle cx="-4" cy="-20" r="5" fill="#c8f55a" opacity="0.25" />
                <line x1="-4" y1="-15" x2="-4" y2="-6" stroke="#c8f55a" strokeWidth="2" opacity="0.3" />
                {/* Package on back */}
                <rect x="-12" y="-24" width="10" height="8" rx="2" fill="#1a1a18" stroke="#c8f55a" strokeWidth="0.8" opacity="0.5" />
              </g>
            </motion.g>

            {/* ── DESTINATION: Delivered ── */}
            <motion.g
              transform="translate(760, 230)"
              style={{ opacity: deliveredOpacity, y: useTransform(deliveredOpacity, [0, 1], [20, 0]) }}
            >
              <rect x="0" y="0" width="130" height="65" rx="12" fill="#111110" stroke="#c8f55a" strokeWidth="1.5" filter="url(#notif-pop)" />
              <circle cx="18" cy="32" r="11" fill="#c8f55a" opacity="0.15" />
              <circle cx="18" cy="32" r="7" fill="#c8f55a" opacity="0.3" />
              <text x="12" y="36" fill="#0a0a08" fontFamily="monospace" fontSize="10" fontWeight="bold">✓</text>
              <text x="36" y="22" fill="#c8f55a" fontFamily="monospace" fontSize="9" fontWeight="bold">DELIVERED</text>
              <text x="36" y="36" fill="#f0ede8" fontFamily="monospace" fontSize="7">Order #PULSE-2847</text>
              <text x="36" y="50" fill="#888880" fontFamily="monospace" fontSize="7">Arrived at doorstep</text>
            </motion.g>

            {/* ── REVIEW REQUEST ── */}
            <motion.g
              transform="translate(670, 120)"
              style={{ opacity: reviewOpacity, y: useTransform(reviewOpacity, [0, 1], [25, 0]) }}
            >
              <rect x="0" y="0" width="180" height="55" rx="12" fill="#111110" stroke="#2a2a28" strokeWidth="1" filter="url(#notif-pop)" />
              {/* Stars */}
              <text x="14" y="18" fill="#c8f55a" fontFamily="monospace" fontSize="9">
                ★★★★★
              </text>
              <text x="14" y="34" fill="#f0ede8" fontFamily="monospace" fontSize="7">How was your experience?</text>
              <text x="14" y="48" fill="#c8f55a" fontFamily="monospace" fontSize="7">Leave a review →</text>
            </motion.g>

            {/* ── PHASE LABELS ── */}
            <motion.text x="50" y="470" fill="#f0ede8" fontFamily="monospace" fontSize="12" opacity={orderedOpacity}>
              A payment.
            </motion.text>
            <motion.text x="350" y="470" fill="#c8f55a" fontFamily="monospace" fontSize="12" opacity={emailOpacity}>
              A person.
            </motion.text>
            <motion.text x="700" y="470" fill="#f0ede8" fontFamily="monospace" fontSize="12" opacity={deliveredOpacity}>
              A relationship.
            </motion.text>
          </svg>
        </div>
      </div>
    </div>
  )
}