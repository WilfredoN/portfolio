import type { IconVariant } from '@shared/components/Icon'

import { useTheme } from '@app/hooks/useTheme'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { useAppConfig } from '@features/shared/config/useAppConfig'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'
import { useState } from 'react'

interface ItemProps {
  icon: string
  text: string
  type?: IconVariant
}

const API_URL = import.meta.env?.VITE_API_URL

export const Item = ({ text, icon, type }: ItemProps) => {
  const { isDarkTheme } = useTheme()
  const { config } = useAppConfig()
  const [endorseCount, setEndorseCount] = useState(0)

  const handleEndorse = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!config.enableSkillEndorsements) {
      return
    }
    setEndorseCount((prev) => prev + 1)
    sendGAEvent({
      action: 'skill_endorse',
      category: 'Engagement',
      label: text
    })
    fetch(`${API_URL}/api/skills/endorse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill_name: text })
    }).catch(() => {})
  }

  return (
    <li
      className={clsx(
        'group flex flex-auto cursor-pointer items-center justify-between gap-3 rounded-md border px-3.5 py-2 transition-all duration-200 select-none',
        isDarkTheme
          ? 'border-zinc-700/50 bg-zinc-800/40 text-zinc-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:bg-zinc-700/80 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]'
          : 'border-blue-200/80 bg-white/70 text-zinc-800 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:text-blue-900 hover:shadow-[0_4px_12px_rgba(0,86,179,0.12)]'
      )}
      onClick={handleEndorse}
    >
      <div className='flex items-center gap-2'>
        <span className='font-medium whitespace-nowrap'>{text}</span>
        {endorseCount > 0 && (
          <span className='animate-bounce rounded-full bg-blue-500/20 px-2 py-0.5 font-mono text-xs font-bold text-blue-400'>
            +{endorseCount}
          </span>
        )}
      </div>
      <Icon alt={`${text} icon`} iconName={icon} type={type} />
    </li>
  )
}
