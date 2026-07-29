import { getDb } from './db.js'

const DEFAULT_CONFIG = {
  isRecruiterModeEnabled: true,
  enableLivePreview: true,
  enableSkillEndorsements: true,
  availabilityStatus: 'Available for Software Engineer & Full-Stack Developer roles',
  availabilityStatusColor: 'green',
  bannerAnnouncement: ''
}

export async function getAppConfig() {
  const db = await getDb()
  const rows = await db.all('SELECT config_key, config_value FROM app_config')
  const config = { ...DEFAULT_CONFIG }
  for (const row of rows) {
    try {
      config[row.config_key] = JSON.parse(row.config_value)
    } catch {
      config[row.config_key] = row.config_value
    }
  }
  return config
}

export async function setAppConfig(key, value) {
  const db = await getDb()
  const stringVal = JSON.stringify(value)
  const updatedAt = new Date().toISOString()
  await db.run(
    'INSERT INTO app_config (config_key, config_value, updated_at) VALUES (?, ?, ?) ON CONFLICT(config_key) DO UPDATE SET config_value=excluded.config_value, updated_at=excluded.updated_at',
    [key, stringVal, updatedAt]
  )
  return getAppConfig()
}
