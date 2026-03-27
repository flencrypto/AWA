export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled'
export type JobPriority = 'low' | 'medium' | 'high' | 'urgent'
export type JobType = 'electrical' | 'carpentry' | 'building' | 'plumbing' | 'gas' | 'other'
export type Jurisdiction = 'england' | 'wales' | 'scotland' | 'northern_ireland'
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'expired'
export type InvoiceStatus = 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'cancelled'
export type CertificateType = 'EIC' | 'MEIWC' | 'EICR' | 'risk_assessment' | 'method_statement' | 'job_completion'
export type CertificateStatus = 'draft' | 'reviewed' | 'issued'
export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface User {
  id: string
  email: string
  full_name: string
  trade: JobType
  jurisdiction: Jurisdiction
  avatar_url?: string
  created_at: string
}

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  postcode?: string
  notes?: string
  created_at: string
  job_count?: number
  total_billed?: number
}

export interface Job {
  id: string
  title: string
  client_id: string
  client_name: string
  client_address: string
  status: JobStatus
  priority: JobPriority
  job_type: JobType
  jurisdiction: Jurisdiction
  description?: string
  scheduled_date?: string
  start_time?: string
  end_time?: string
  estimated_hours?: number
  actual_hours?: number
  hourly_rate?: number
  materials_cost?: number
  total_cost?: number
  notes?: string
  created_at: string
  updated_at: string
  tags?: string[]
}

export interface DiaryEntry {
  id: string
  job_id: string
  content: string
  photos?: string[]
  voice_note_url?: string
  created_at: string
}

export interface QuoteItem {
  id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Quote {
  id: string
  quote_number: string
  client_id: string
  client_name: string
  status: QuoteStatus
  items: QuoteItem[]
  subtotal: number
  vat_rate: number
  vat_amount: number
  total: number
  valid_until: string
  notes?: string
  created_at: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Invoice {
  id: string
  invoice_number: string
  client_id: string
  client_name: string
  job_id?: string
  status: InvoiceStatus
  items: InvoiceItem[]
  subtotal: number
  vat_rate: number
  vat_amount: number
  total: number
  amount_paid: number
  due_date: string
  notes?: string
  created_at: string
}

export interface Certificate {
  id: string
  cert_type: CertificateType
  status: CertificateStatus
  client_id: string
  client_name: string
  job_id?: string
  property_address: string
  jurisdiction: Jurisdiction
  issued_date?: string
  expiry_date?: string
  cert_number?: string
  ai_assisted: boolean
  notes?: string
  created_at: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  mode?: string
}

export interface TherapyMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface WellbeingLog {
  id: string
  mood: MoodLevel
  notes?: string
  created_at: string
}

export interface DashboardStats {
  todaysJobs: number
  overdueInvoices: number
  pendingQuotes: number
  expiringCerts: number
  totalRevenue: number
  outstandingAmount: number
}

export interface Activity {
  id: string
  type: 'job' | 'invoice' | 'quote' | 'certificate' | 'client'
  title: string
  description: string
  timestamp: string
  icon: string
}
