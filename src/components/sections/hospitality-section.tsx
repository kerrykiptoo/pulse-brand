'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type SubCategory = 'bar' | 'restaurant' | 'bnb' | 'all'

type StorySlide = {
  src: string
  alt: string
  narration: string
  stat: string
}

const STORIES: Record<Exclude<SubCategory, 'all'>, { character: string; business: string; slides: StorySlide[] }> = {
  bar: {
    character: 'James',
    business: "Paul's Bar, Nairobi",
    slides: [
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059783/pexels-amal-s-a-167688837-30734985_kbed1l.jpg',
        alt: 'Bar counter with warm amber lighting',
        narration: "James walks into Paul's Bar every Friday. He orders the same drink. The staff know his face, but not his name.",
        stat: '60% of first-time visitors never return — not because of the drinks, but because no one followed up.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059797/pexels-gizem-erol-2149449247-36533139_xl666t.jpg',
        alt: 'Bar interior at night',
        narration: "Nine Fridays pass. James is about to hit his 10th visit. The bar has no idea. To them, he's still just a face in the crowd.",
        stat: 'A recognized regular spends 40% more per visit than an anonymous walk-in.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059826/pexels-baris-17903602_q6hiim.jpg',
        alt: 'Bar atmosphere with warm lights',
        narration: "On the 10th Friday, Pulse fires. James gets a message: \"James, it's your 10th visit. Your drink is on us tonight.\" He walks in differently now.",
        stat: '30% of lapsed customers return within a week of receiving a personal message.',
      },
    ],
  },
  restaurant: {
    character: 'Wanjiku',
    business: 'Mama Njeri\u2019s Kitchen, Kilimani',
    slides: [
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059915/haberdoedas--5RPt2CfWZ4-unsplash_aqxznj.jpg',
        alt: 'Restaurant dining room with warm ambiance',
        narration: "Wanjiku booked Mama Njeri's for her anniversary. The meal was perfect. She left a tip. The restaurant never knew she came back.",
        stat: 'A diner who feels recognized returns 3\u00d7 more often. Most restaurants never give them the chance.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059898/pexels-viniciusvieirafotografia-19763218_mvpsfp.jpg',
        alt: 'Restaurant table setting',
        narration: "Three months later, Wanjiku books again. Different occasion. Same restaurant. Still no recognition. Still just a reservation.",
        stat: 'Special occasion diners who receive a follow-up are 4\u00d7 more likely to book again.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778059960/pexels-zisan-ozdemir-53442109-19569909_hecgtd.jpg',
        alt: 'Restaurant evening atmosphere',
        narration: "With Pulse, Wanjiku's second booking triggers a greeting: \"Welcome back, Wanjiku. Happy anniversary.\" She tells five friends.",
        stat: '25% increase in repeat visits within 3 months of using Pulse.',
      },
    ],
  },
  bnb: {
    character: 'Amina',
    business: 'Diani Sunrise BnB, Coast',
    slides: [
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778060148/pexels-kovyrina-14606409_gcfvaq.jpg',
        alt: 'Resort outdoor area at dusk',
        narration: "Amina stayed at Diani Sunrise three times this year. Every check-in, she filled out the same form. Every time, a stranger at the desk.",
        stat: 'Repeat guests spend 40% more than first-timers. Knowing their name is the cheapest upsell in hospitality.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778060133/andres-garcia-zKmL1OeTqyg-unsplash_cgnymm.jpg',
        alt: 'Resort terrace with warm evening light',
        narration: "Her fourth stay is different. Pulse flags her before arrival. The staff greet her by name. \"Welcome back, Amina. Your usual room is ready.\"",
        stat: '50% of guests are more likely to leave a positive review when addressed by name.',
      },
      {
        src: 'https://res.cloudinary.com/don9ua5xz/image/upload/v1778060175/pexels-talharesitoglu-37240059_iq7jlh.jpg',
        alt: 'Resort evening ambiance',
        narration: "Before peak season, Diani Sunrise messages every past guest. Amina books directly. No OTA commission. Just a returning friend.",
        stat: '35% growth in direct bookings year-over-year with guest messaging.',
      },
    ],
  },
}

const ALL_STORY_SLIDES = [
  STORIES.bar.slides[0],
  STORIES.restaurant.slides[0],
  STORIES.bnb.slides[0],
  STORIES.bar.slides[1],
  STORIES.restaurant.slides[1],
  STORIES.bnb.slides[1],
  STORIES.bar.slides[2],
  STORIES.restaurant.slides[2],
  STORIES.bnb.slides[2],
]

const SUB_CATEGORIES: { key: SubCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'bar', label: 'Bars & Lounges' },
  { key: 'restaurant', label: 'Restaurants' },
  { key: 'bnb', label: 'BnBs & Resorts' },
]

export function HospitalitySection() {
  const [activeCategory, setActiveCategory] = useState<SubCategory>('all')
  const [imageIndex, setImageIndex] = useState(0)
  const isExpanded = activeCategory !== 'all'
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const story = isExpanded ? STORIES[activeCategory] : null
  const currentSlides = isExpanded ? story!.slides : ALL_STORY_SLIDES
  const currentSlide = currentSlides[imageIndex]

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % currentSlides.length)
    }, isExpanded ? 8000 : 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeCategory, currentSlides.length, isExpanded])

  const handleCategoryChange = useCallback((key: SubCategory) => {
    setActiveCategory(key)
    setImageIndex(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  return (
    <section className="h-screen bg-[#0a0a08] flex items-center px-4 md:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888880]">
            Who it&apos;s for
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0ede8] mt-1">
            Hospitality
          </h2>
        </motion.div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {SUB_CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeCategory === key
                  ? 'border-[#c8f55a] text-[#c8f55a] bg-[#c8f55a]/5'
                  : 'border-[#2a2a28] text-[#888880] hover:border-[#888880] hover:text-[#f0ede8]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

                {/* Story header — draws when expanded */}
        <AnimatePresence>
          {isExpanded && story && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-px flex-1 bg-[#c8f55a]/30 origin-right"
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="font-mono text-xs text-[#c8f55a] uppercase tracking-wider whitespace-nowrap"
                >
                  The story of {story.character}, {story.business}
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-px flex-1 bg-[#c8f55a]/30 origin-left"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="grid gap-6 lg:gap-8 items-center"
          animate={{
            gridTemplateColumns: isExpanded ? '0.85fr 1.15fr' : '1fr 1fr',
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Text — slides in from left when expanded, sits on left side */}
          <motion.div
            className="flex flex-col justify-center gap-4"
            animate={{
              order: isExpanded ? 0 : 1,
              x: 0,
              opacity: 1,
            }}
            initial={false}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`narration-${activeCategory}-${imageIndex}`}
                initial={{ opacity: 0, x: isExpanded ? -20 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isExpanded ? 20 : 15 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-mono text-sm md:text-base text-[#f0ede8] leading-snug"
              >
                {currentSlide.narration}
              </motion.p>
            </AnimatePresence>

            <div className="w-12 h-px bg-[#2a2a28]" />

            <AnimatePresence mode="wait">
              <motion.p
                key={`stat-${activeCategory}-${imageIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                className="font-heading text-lg md:text-xl font-bold text-[#c8f55a] leading-tight"
              >
                {currentSlide.stat}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Image — slides right and grows when expanded */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-[#111110] border border-[#2a2a28]"
            animate={{
              aspectRatio: isExpanded ? '4/3' : '1/1',
              order: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${imageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {!isExpanded && (
              <div className="absolute top-3 left-3">
                <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0a0a08]/80 text-[#c8f55a] border border-[#c8f55a]/20 backdrop-blur-sm">
                  {currentSlide.narration.includes('James') ? 'Bar' : currentSlide.narration.includes('Wanjiku') ? 'Restaurant' : 'BnB'}
                </span>
              </div>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {currentSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === imageIndex
                      ? 'bg-[#c8f55a] w-5'
                      : 'bg-white/25 hover:bg-white/45'
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}