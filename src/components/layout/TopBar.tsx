'use client'

import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur border-b border-[#2a2a2a]">
      <div>
        <h1 className="text-lg font-semibold text-[#f5f5f5]">{title}</h1>
        {subtitle && <p className="text-sm text-[#71717a]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-[#71717a] hover:text-[#f5f5f5]">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#71717a] hover:text-[#f5f5f5] relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </div>
    </header>
  )
}
