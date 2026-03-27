'use client'

import { useState, useRef, useEffect } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Heart, User, Shield, Lock } from 'lucide-react'
import { sendTherapyMessage } from '@/lib/ai'
import type { TherapyMessage } from '@/types'

export default function TherapyPage() {
  const [messages, setMessages] = useState<TherapyMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome. This is your safe space.\n\nI'm here to listen, without judgment. Everything you share here stays here — this session is completely separate from your work data and is never stored with your business records.\n\nHow are you feeling today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: TherapyMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await sendTherapyMessage(userMsg.content, messages)
      const aiMsg: TherapyMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setLoading(false)
    }
  }

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊']
  const moodLabels = ['Very low', 'Low', 'Okay', 'Good', 'Great']

  return (
    <AppShell>
      {/* Custom therapy header */}
      <header className="sticky top-0 z-30 px-6 py-4 border-b border-[#1e3a5f] bg-[#060d14]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#0ea5e9]" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-[#e2f4ff]">Mind Space</h1>
              <p className="text-xs text-[#4a7fa5]">Your private wellbeing space</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#4a7fa5]">
            <Lock className="w-3 h-3" />
            <span>Private</span>
          </div>
        </div>
      </header>

      {/* Therapy UI uses blue theme */}
      <div className="flex flex-col bg-[#060d14]" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        {/* Mood check-in */}
        {mood === null && (
          <div className="px-4 py-4 border-b border-[#1e3a5f] bg-[#0d1b2a]">
            <div className="text-sm text-[#e2f4ff] mb-3 font-medium">How are you feeling right now?</div>
            <div className="flex gap-2 justify-center">
              {moodEmojis.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setMood(i + 1)}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-[#112236] border border-[#1e3a5f] hover:border-[#0ea5e9]/50 transition-colors"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[10px] text-[#4a7fa5]">{moodLabels[i]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mood !== null && (
          <div className="px-4 py-2 border-b border-[#1e3a5f] bg-[#0d1b2a]">
            <div className="flex items-center gap-2 text-xs text-[#4a7fa5]">
              <span>Today&apos;s mood: {moodEmojis[mood - 1]} {moodLabels[mood - 1]}</span>
              <button onClick={() => setMood(null)} className="text-[#0ea5e9] hover:underline">Change</button>
            </div>
          </div>
        )}

        {/* Privacy notice */}
        <div className="px-4 py-2 bg-[#112236]/50">
          <div className="flex items-center gap-1.5 text-xs text-[#4a7fa5]">
            <Shield className="w-3 h-3 shrink-0" />
            Session data is completely separate from your work records and never shared
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-[#0ea5e9]" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#0ea5e9] text-white rounded-tr-sm'
                    : 'bg-[#112236] text-[#e2f4ff] rounded-tl-sm border border-[#1e3a5f]'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#112236] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#4a7fa5]" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#0ea5e9]" />
              </div>
              <div className="bg-[#112236] border border-[#1e3a5f] rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#4a7fa5] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Crisis line */}
        <div className="px-4 py-2 bg-[#0d1b2a] border-t border-[#1e3a5f]">
          <div className="text-xs text-[#4a7fa5] text-center">
            In crisis? Call{' '}
            <span className="text-[#0ea5e9] font-medium">Samaritans: 116 123</span>
            {' '}or{' '}
            <span className="text-[#0ea5e9] font-medium">CALM: 0800 58 58 58</span>
          </div>
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-[#0d1b2a] border-t border-[#1e3a5f]">
          <div className="flex gap-2">
            <Textarea
              placeholder="Share what's on your mind..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="min-h-[44px] max-h-32 resize-none flex-1 bg-[#112236] border-[#1e3a5f] text-[#e2f4ff] placeholder:text-[#4a7fa5] focus-visible:ring-[#0ea5e9]"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              size="icon"
              className="h-11 w-11 shrink-0 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
