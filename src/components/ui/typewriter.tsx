'use client'

import { useEffect, useState } from 'react'

export function TypewriterText({
  text,
  className = '',
  speed = 50,
}: {
  text: string
  className?: string
  speed?: number
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), 500)
    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 animate-pulse align-middle" />
      )}
    </span>
  )
}