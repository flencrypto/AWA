'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Receipt,
  Award,
  Bot,
  Heart,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: Receipt },
  { href: '/certificates', label: 'Certs', icon: Award },
  { href: '/ai', label: 'Trade AI', icon: Bot },
  { href: '/therapy', label: 'Therapy', icon: Heart },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-[#111111] border-r border-[#2a2a2a] fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[#2a2a2a]">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-[#f5f5f5] text-sm leading-none">TWATS</div>
          <div className="text-[10px] text-[#71717a] leading-none mt-0.5">Trade & Therapy System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const isTherapy = item.href === '/therapy'

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? isTherapy
                    ? 'bg-[#0ea5e9]/20 text-[#0ea5e9]'
                    : 'bg-primary/20 text-primary'
                  : 'text-[#71717a] hover:text-[#f5f5f5] hover:bg-[#1e1e1e]'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {isTherapy && (
                <span className="ml-auto text-[10px] bg-[#0ea5e9]/20 text-[#0ea5e9] px-1.5 py-0.5 rounded-full">
                  Safe
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">JD</span>
          </div>
          <div>
            <div className="text-xs font-medium text-[#f5f5f5]">John Davies</div>
            <div className="text-[11px] text-[#71717a]">Electrician · England</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
