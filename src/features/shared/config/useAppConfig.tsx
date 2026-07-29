import { createContext, useContext, useEffect, useState } from 'react'

export interface AppConfig {
  availabilityStatus: string
  availabilityStatusColor: 'green' | 'orange' | 'red'
  bannerAnnouncement: string
  enableLivePreview: boolean
  enableSkillEndorsements: boolean
  isRecruiterModeEnabled: boolean
}

const DEFAULT_CONFIG: AppConfig = {
  isRecruiterModeEnabled: true,
  enableLivePreview: true,
  enableSkillEndorsements: true,
  availabilityStatus:
    'Available for Software Engineer & Full-Stack Developer roles',
  availabilityStatusColor: 'green',
  bannerAnnouncement: ''
}

const API_URL = import.meta.env?.VITE_API_URL

interface AppConfigContextValue {
  config: AppConfig
  refreshConfig: () => Promise<void>
  updateConfigKey: (key: keyof AppConfig, value: unknown) => Promise<void>
}

const AppConfigContext = createContext<AppConfigContextValue>({
  config: DEFAULT_CONFIG,
  refreshConfig: async () => {},
  updateConfigKey: async () => {}
})

export const AppConfigProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG)

  const refreshConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/api/config`)
      if (res.ok) {
        const data = await res.json()
        setConfig((prev) => ({ ...prev, ...data }))
      }
    } catch {}
  }

  const updateConfigKey = async (key: keyof AppConfig, value: unknown) => {
    const adminToken = localStorage.getItem('admin_token') || ''
    try {
      const res = await fetch(`${API_URL}/api/admin/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken
        },
        body: JSON.stringify({ key, value })
      })
      if (res.ok) {
        const data = await res.json()
        setConfig((prev) => ({ ...prev, ...data }))
      }
    } catch {}
  }

  useEffect(() => {
    refreshConfig()
  }, [])

  return (
    <AppConfigContext.Provider
      value={{ config, refreshConfig, updateConfigKey }}
    >
      {children}
    </AppConfigContext.Provider>
  )
}

export const useAppConfig = () => useContext(AppConfigContext)
