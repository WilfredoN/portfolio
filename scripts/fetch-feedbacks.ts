import { config } from 'dotenv'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

config()

const OUTPUT_PATH = './public/data/feedbacks.json'

if (!process.env.VITE_SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL environment variable is not set')
}

if (!process.env.VITE_SUPABASE_API_KEY) {
  throw new Error('VITE_SUPABASE_API_KEY environment variable is not set')
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const VITE_SUPABASE_API_KEY = process.env.VITE_SUPABASE_API_KEY
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/export-feedbacks`

async function fetchFeedbacks() {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      headers: {
        'Content-Type': 'application/json',
        apikey: VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${VITE_SUPABASE_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch feedbacks: ${response.statusText}`)
    }

    const data = await response.json()

    await mkdir(dirname(OUTPUT_PATH), { recursive: true })
    await writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2))

    console.warn(
      `Successfully saved ${data.length} feedbacks to ${OUTPUT_PATH}`
    )
  } catch (error) {
    console.error('Error fetching feedbacks:', error)

    await mkdir(dirname(OUTPUT_PATH), { recursive: true })
    await writeFile(OUTPUT_PATH, JSON.stringify([]))

    console.warn('Created empty feedbacks file as fallback')
  }
}

fetchFeedbacks()
