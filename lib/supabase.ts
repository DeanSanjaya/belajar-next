import { createClient } from '@supabase/supabase-js'

// These environment variables should be defined in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

/**
 * Supabase Client for use in Client Components
 * For Server Components, use @supabase/ssr or appropriate server-side patterns
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Helper to check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
  )
}
