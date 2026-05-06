'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PulseLineMascot } from '@/components/ui/pulse-line'

type CustomerMoment = {
  id: number
  name: string
  business: string
  visit: number
  action: string
  time: string
}

const MOMENTS: CustomerMoment[] = [
  { id: 1, name: 'James', business: 'Pokot Boma', visit: 10, action: 'just unlocked a free drink 🎉', time: '2 min ago' },
  { id: 2, name: 'Wanjiku', business: 'Sally Salon', visit: 5, action: 'earned her 5th visit discount', time: '8 min ago' },
  { id: 3, name: 'Brian', business: 'Quick Mart', visit: 3, action: 'received an end-month offer', time: '12 min ago' },
  { id: 4, name: 'Amina', business: 'Coastal Clinic', visit: 8, action: 'got a follow-up reminder', time: '18 min ago' },
  { id: 5, name: 'David', business: 'Pokot Boma', visit: 12, action: 'is now a Gold regular ⭐', time: '25 min ago' },
  { id: 6, name: 'Faith', business: 'Nail Studio', visit: 4, action: 'received a lapse recovery message', time: '31 min ago' },
  { id: 7, name: 'Peter', business: 'Sally Salon', visit: 15, action: 'just left a 5-star review', time: '40 min ago' },
  { id: 8, name: 'Grace', business: 'Coastal Clinic', visit: 2, action: 'confirmed appointment via SMS', time: '45 min ago' },
]

function CustomerCard({ moment, index }: { moment: CustomerMoment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, borderColor: 'rgba(200, 245, 90, 0.3)' }}
      className="bg-bg border border-border rounded-xl p-4 flex items-center gap-4 group cursor-default transition-colors"
    >
      {/* Avatar + pulse mini */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center font-heading text-accent text-sm">
          {moment.name[0]}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5">
          <PulseLineMascot state="blip" animate={true} className="w-full h-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm text-text truncate">
          <span className="text-accent font-heading">{moment.name}</span>
          <span className="text-muted"> at </span>
          <span className="text-text">{moment.business}</span>
        </p>
        <p className="font-mono text-xs text-muted mt-0.5">{moment.action}</p>
      </div>

      {/* Visit count + time */}
      <div className="text-right shrink-0">
        <div className="font-heading text-lg text-accent tabular-nums">#{moment.visit}</div>
        <div className="font-mono text-[10px] text-muted">{moment.time}</div>
      </div>
    </motion.div>
  )
}

export function LivingFeed() {
  const [visibleMoments, setVisibleMoments] = useState<CustomerMoment[]>([])
  const [nextIndex, setNextIndex] = useState(0)

  // Simulate live feed — new moments appear one by one
  useEffect(() => {
    if (nextIndex >= MOMENTS.length) return

    const timer = setTimeout(() => {
      setVisibleMoments((prev) => [...prev, MOMENTS[nextIndex]])
      setNextIndex((prev) => prev + 1)
    }, nextIndex === 0 ? 300 : 800)

    return () => clearTimeout(timer)
  }, [nextIndex, visibleMoments])

  return (
    <div className="space-y-3">
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex items-center justify-center w-3 h-3">
          <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping opacity-40" />
          <div className="w-2 h-2 bg-accent rounded-full" />
        </div>
        <span className="font-mono text-xs text-accent uppercase tracking-widest">Live</span>
        <span className="font-mono text-xs text-muted">
          {visibleMoments.length} moments today
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {visibleMoments.map((moment, i) => (
            <CustomerCard key={moment.id} moment={moment} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state placeholders */}
      {visibleMoments.length < MOMENTS.length && (
        <div className="space-y-3 opacity-30">
          {Array.from({ length: MOMENTS.length - visibleMoments.length }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="bg-surface-2 border border-border rounded-xl p-4 h-[72px] animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  )
}