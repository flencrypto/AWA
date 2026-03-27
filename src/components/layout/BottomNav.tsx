'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Receipt,
  Heart,
  Bot,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const bottomNavItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/invoices', label: 'Finance', icon: Receipt },
  { href: '/ai', label: 'AI', icon: Bot },
  { href: '/therapy', label: 'Mind', icon: Heart },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t border-[#2a2a2a]">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const isTherapy = item.href === '/therapy'

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors',
                isActive
                  ? isTherapy
                    ? 'text-[#0ea5e9]'
                    : 'text-primary'
                  : 'text-[#71717a]'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
