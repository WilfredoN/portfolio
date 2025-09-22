// Lazy-loaded Supabase client to reduce initial bundle size
let supabaseClient: any = null

export const getSupabase = async () => {
  if (!supabaseClient) {
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
    const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY as string
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient
}