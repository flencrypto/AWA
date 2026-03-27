'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Plus, Search, FileText, Calendar, ChevronRight } from 'lucide-react'
import { DEMO_QUOTES } from '@/lib/demo-data'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import type { Quote, QuoteStatus } from '@/types'

export default function QuotesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [quotes] = useState<Quote[]>(DEMO_QUOTES)

  const filtered = quotes.filter(q => {
    const matchSearch =
      q.quote_number.toLowerCase().includes(search.toLowerCase()) ||
      q.client_name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || q.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AppShell>
      <TopBar title="Quotes" subtitle={`${quotes.length} total quotes`} />
      <div className="p-6 space-y-4">
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
            <Input
              placeholder="Search quotes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full sm:w-44">
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </Select>
          <Button className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            New Quote
          </Button>
        </div>

        <div className="space-y-3">
          {filtered.map(quote => (
            <Card key={quote.id} className="border-[#2a2a2a] hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <span className="font-medium text-[#f5f5f5]">{quote.quote_number}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="text-sm text-[#71717a] mb-2 pl-9">{quote.client_name}</div>
                    <div className="flex items-center gap-1 text-xs text-[#71717a] pl-9">
                      <Calendar className="w-3 h-3" />
                      Valid until: {formatDate(quote.valid_until)}
                    </div>
                    <div className="mt-2 pl-9 space-y-1">
                      {quote.items.slice(0, 2).map(item => (
                        <div key={item.id} className="flex justify-between text-xs text-[#71717a]">
                          <span className="truncate mr-2">{item.description}</span>
                          <span>{formatCurrency(item.total)}</span>
                        </div>
                      ))}
                      {quote.items.length > 2 && (
                        <div className="text-xs text-[#71717a]">+{quote.items.length - 2} more items</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-bold text-[#f5f5f5]">{formatCurrency(quote.total)}</span>
                    <span className="text-xs text-[#71717a]">inc. VAT</span>
                    <ChevronRight className="w-4 h-4 text-[#71717a]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
