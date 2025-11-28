import type { Feedback } from '@features/feedback/types/feedback'

import { supabase } from '@service/supabase'

import type { FeedbackDTO, FeedbackResponse } from './types'

import { fetchFeedbacksFromJson } from './fetchJson'
import { mapFeedback } from './mapper'

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  if (!supabase) {
    console.warn('Supabase not configured, using static JSON')
    const jsonData = await fetchFeedbacksFromJson()
    return mapFeedback(jsonData)
  }

  try {
    const { data, error } = await supabase
      .from('feedback')
      .select(
        'id, author, company, text, created_at, feedback_skills(skill_id, skills(name, id))'
      )
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.warn('Supabase fetch failed, falling back to static JSON:', error)
      const jsonData = await fetchFeedbacksFromJson()
      return mapFeedback(jsonData)
    }

    return mapFeedback(data as FeedbackResponse[])
  } catch (error) {
    console.warn('Error fetching from Supabase, using static fallback:', error)
    const jsonData = await fetchFeedbacksFromJson()
    return mapFeedback(jsonData)
  }
}

export const submitFeedback = async (
  feedbackData: FeedbackDTO
): Promise<{ error?: string; success: boolean }> => {
  if (!supabase) {
    return {
      success: false,
      error: 'Feedback submission is currently unavailable'
    }
  }

  try {
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedback')
      .insert({
        author: feedbackData.author,
        company: feedbackData.company || null,
        text: feedbackData.text
      })
      .select('id')
      .single()

    if (feedbackError || !feedback) {
      console.error('Error creating feedback:', feedbackError)

      return { success: false, error: 'Failed to create feedback' }
    }

    if (feedbackData.skills.length > 0) {
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('id')
        .in('id', feedbackData.skills)

      if (skillsError || !skillsData) {
        console.error('Error fetching skills:', skillsError)

        return { success: false, error: 'Failed to link skills' }
      }

      const skillRelations = skillsData.map((skill: { id: number }) => ({
        feedback_id: feedback.id,
        skill_id: skill.id
      }))

      const { error: relationError } = await supabase
        .from('feedback_skills')
        .insert(skillRelations)

      if (relationError) {
        console.error('Error creating skill relations:', relationError)

        return { success: false, error: 'Failed to link skills to feedback' }
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error submitting feedback:', error)

    return { success: false, error: 'An unexpected error occurred' }
  }
}
