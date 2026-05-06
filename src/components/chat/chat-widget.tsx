'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PulseLineMascot } from '@/components/ui/pulse-line'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()

  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    return "Physical Pulse starts at KES 10,000/month. Pulse Online starts at KES 3,500/month. First month is free on everything — no card required. For comparison, Spotify pays 4.52% per transaction just to collect money, with zero CRM. You get the full intelligence layer for a fixed monthly fee."
  }

  if (lower.includes('physical') || lower.includes('online') || lower.includes('difference')) {
    return "Pulse Physical is for businesses with a counter — bars, restaurants, salons. It tracks visits via M-Pesa and sends SMS. Pulse Online is for e-commerce sellers using Paystack. It tracks purchases and sends branded emails. Same dashboard, same brand. You can use both."
  }

  if (lower.includes('mpesa') || lower.includes('m-pesa')) {
    return "When a customer pays via M-Pesa at your till, Pulse catches it automatically. We turn that payment into a customer profile, track their visits, and automate the messages that bring them back. You don't need new hardware — it works with the M-Pesa till you already have."
  }

  if (lower.includes('review') || lower.includes('google')) {
    return "Unlike Google reviews where anyone can post, Pulse reviews are verified — one visit = one review link, single-use, 48-hour expiry. No fake reviews possible. Our integrity statement says it all: 'Nothing is filtered, nothing is paid for, nothing is faked.'"
  }

  if (lower.includes('free') || lower.includes('trial') || lower.includes('start')) {
    return "First month is completely free. No card required. Your customer data starts building from day one. By the time any invoice arrives, you'll have real data showing you exactly who your regulars are. Want me to walk you through the setup?"
  }

  if (lower.includes('campaign') || lower.includes('roi') || lower.includes('return')) {
    return "With 500 opt-in customers, one campaign averages KES 178,500 in return against KES 1,500 in SMS costs. That's 119x ROI. And you can run four campaigns a month. The math works because we're messaging people who already know and trust your business."
  }

  return "That's a great question. Pulse turns every payment into a customer relationship — automatically. No new hardware, no complex setup. First month is free, and your data starts building immediately. Want me to explain how it works with your specific business?"
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "How does Pulse work with M-Pesa?",
    "What's the difference between Physical and Online?",
    "How much does it cost?",
    "Is the first month really free?",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(text),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg shadow-accent/20"
        aria-label="Chat with Pulse"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <PulseLineMascot state="resting" className="w-5 h-5" animate={false} />
              </div>
              <div>
                <p className="font-heading text-sm text-text">Pulse</p>
                <p className="font-mono text-[10px] text-muted">Ask me anything</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-muted text-xs font-mono">Common questions:</p>
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="block w-full text-left px-3 py-2 rounded-lg border border-border hover:border-accent/30 text-sm font-mono text-muted hover:text-text transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                      m.role === 'user'
                        ? 'bg-accent text-bg font-mono'
                        : 'bg-bg border border-border text-text font-mono'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bg border border-border rounded-xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(input)
              }}
              className="p-4 border-t border-border shrink-0"
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Pulse..."
                  className="flex-1 bg-bg border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-text placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2.5 bg-accent text-bg rounded-xl font-mono text-sm disabled:opacity-40 transition-opacity shrink-0"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}