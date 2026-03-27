import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="lg:pl-60 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
