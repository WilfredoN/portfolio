let _client: import('@supabase/supabase-js').SupabaseClient | undefined

export async function getSupabase() {
  if (_client) return _client
  const { createClient } = await import('@supabase/supabase-js')
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY as string
  _client = createClient(supabaseUrl, supabaseKey)
  return _client
}
