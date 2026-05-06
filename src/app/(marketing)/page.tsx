'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PulseLineMascot, type PulseState } from '@/components/ui/pulse-line'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { TypewriterText } from '@/components/ui/typewriter'
import { VideoModal } from '@/components/ui/video-modal'
import { DeliveryFlow } from '@/components/animations/delivery-flow'
import { ChatWidget } from '@/components/chat/chat-widget'
import { LivingFeed } from '@/components/ui/living-feed'


export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [pulseState, setPulseState] = useState<PulseState>('resting')

  useEffect(() => {
    const states: PulseState[] = ['resting', 'blip', 'building', 'milestone', 'return', 'resting']
    let i = 0
    const interval = setInterval(() => {
      setPulseState(states[i % states.length])
      i++
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="bg-bg text-text min-h-screen">
      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 opacity-50">
          <PulseLineMascot state={pulseState} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-3xl"
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <TypewriterText text="A payment. A person. A relationship." className="block" speed={70} />
          </h1>

          <p className="font-mono text-muted text-lg md:text-xl max-w-xl mx-auto mb-8">
            Pulse is the infrastructure of being remembered.
            <br />
            Every transaction becomes a relationship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="px-8 py-4 bg-accent text-bg rounded-full font-heading text-lg hover:bg-accent/90 transition-colors"
            >
              Start free month
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              onClick={() => setVideoOpen(true)}
              className="px-8 py-4 border border-border rounded-full font-mono text-muted hover:text-text hover:border-accent/50 transition-all flex items-center gap-2 justify-center"
            >
              <span className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center">
                ▶
              </span>
              See Pulse in 2 minutes
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── M-PESA TO PULSE FLOW ── */}
      <section className="relative">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">How it works</span>
          </div>
        </ScrollReveal>
        <DeliveryFlow />
      </section>

            {/* ── LIVING CUSTOMER FEED ── */}
      <section className="py-32 px-4">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
              Pulse is running right now.
            </h2>
            <p className="font-mono text-muted text-center mb-12">
              Every moment below is a real customer interaction — automated, personal, happening live.
            </p>
          </ScrollReveal>
          <LivingFeed />
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <ScrollReveal delay={0}>
            <div className="text-5xl md:text-6xl text-accent font-heading font-[700] mb-2">
              <AnimatedCounter to={3000} suffix="+" />
            </div>
            <p className="font-mono text-muted">customers remembered automatically</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="text-5xl md:text-6xl text-accent font-heading font-[700] mb-2">
              <AnimatedCounter to={119} suffix="x" />
            </div>
            <p className="font-mono text-muted">average campaign ROI</p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="text-5xl md:text-6xl text-accent font-heading font-[700] mb-2">
              <AnimatedCounter to={178500} prefix="KES " />
            </div>
            <p className="font-mono text-muted">from one campaign</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PULSE LINE STATES ── */}
      <section className="py-32 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-16">
              The heartbeat never stops.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {([
              { state: 'resting' as PulseState, label: 'Between visits' },
              { state: 'blip' as PulseState, label: 'Visit arrives' },
              { state: 'building' as PulseState, label: 'Building' },
              { state: 'milestone' as PulseState, label: 'Milestone' },
              { state: 'lapse' as PulseState, label: 'Lapse' },
              { state: 'return' as PulseState, label: 'Returns' },
            ]).map(({ state, label }, i) => (
              <ScrollReveal key={state} delay={i * 0.1}>
                <div className="bg-bg rounded-xl p-6 border border-border hover:border-accent/20 transition-colors">
                  <PulseLineMascot state={state} className="w-full h-16 mb-4" animate={true} />
                  <p className="font-mono text-xs text-muted text-center">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-4 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-32 mx-auto mb-8">
              <PulseLineMascot state="milestone" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl mb-6">
              Remember everyone.
            </h2>
            <p className="font-mono text-muted text-lg mb-8">
              First month free. No card required. Your customer data starts building today.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-accent text-bg rounded-full font-heading text-xl"
            >
              Start your free month
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MODALS & WIDGETS ── */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <ChatWidget />
    </main>
  )
}