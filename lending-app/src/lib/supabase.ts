import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  amazon_seller_id: string | null
  gmv_range: string | null
  credit_limit: number | null
  available_credit: number | null
  current_balance: number | null
  created_at: string
}
