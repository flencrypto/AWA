'use client'

import { useState, useRef, useEffect } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Bot, User, ChevronDown, AlertCircle } from 'lucide-react'
import { AI_MODES, sendTradeAIMessage } from '@/lib/ai'
import type { AIMessage } from '@/types'

export default function AIPage() {
  const [selectedMode, setSelectedMode] = useState(AI_MODES[0].id)
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your Trade AI assistant. I can help with technical explanations, fault-finding, certificate wording, materials lists, customer messages, quoting, and UK compliance questions. Select a mode above and ask me anything.",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      mode: selectedMode,
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await sendTradeAIMessage(userMsg.content, selectedMode, messages)
      const aiMsg: AIMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        mode: selectedMode,
      }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setLoading(false)
    }
  }

  const currentMode = AI_MODES.find(m => m.id === selectedMode)

  return (
    <AppShell>
      <TopBar title="Trade AI" subtitle="Your trade knowledge assistant" />
      <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
        {/* Mode selector */}
        <div className="px-4 py-3 border-b border-[#2a2a2a] bg-[#111111]">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {AI_MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedMode === mode.id
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : 'bg-[#1e1e1e] text-[#71717a] border-[#2a2a2a] hover:text-[#f5f5f5]'
                }`}
              >
                <span>{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>
          {currentMode && (
            <div className="text-xs text-[#71717a] mt-2">{currentMode.description}</div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-[#1e1e1e] text-[#f5f5f5] rounded-tl-sm border border-[#2a2a2a]'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#71717a]" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#71717a] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-[#111111] border-t border-[#2a2a2a]">
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <AlertCircle className="w-3 h-3 shrink-0" />
            AI guidance only — always verify with applicable standards and your registration body
          </div>
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-[#111111] border-t border-[#2a2a2a]">
          <div className="flex gap-2">
            <Textarea
              placeholder={`Ask about ${currentMode?.label.toLowerCase() || 'trade topics'}...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="min-h-[44px] max-h-32 resize-none flex-1"
              rows={1}
            />
            <Button onClick={handleSend} disabled={!input.trim() || loading} size="icon" className="h-11 w-11 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
