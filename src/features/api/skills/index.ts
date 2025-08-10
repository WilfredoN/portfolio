import type { Skill } from '@features/feedback/types/skill'

import { supabase } from '@service/supabase'

export const fetchSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name')
    .order('name', { ascending: true })

  if (error || !data) {
    console.error('Error fetching skills:', error)

    return []
  }

  return data
}
