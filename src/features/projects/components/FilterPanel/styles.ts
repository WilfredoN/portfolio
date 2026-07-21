import clsx from 'clsx'

export const BUTTON_BASE = {
  category:
    'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-5 py-2 text-lg font-extrabold tracking-wide uppercase transition-all duration-150',
  tagToggle:
    'flex items-center gap-2 rounded-full border px-4 py-1.5 text-xl transition-all duration-200',
  reset:
    'flex h-[42px] w-[42px] items-center justify-center rounded-full border transition-all duration-200',
  tagItem:
    'cursor-pointer rounded-full border px-4 py-1.5 text-xl transition-all duration-200 select-none'
}

export const getCategoryStyles = (
  color: 'blue' | 'purple' | 'emerald',
  isActive: boolean,
  isDarkTheme: boolean
) => {
  if (isDarkTheme) {
    if (isActive) {
      if (color === 'blue') {
        return 'border-blue-500/80 bg-blue-500/25 text-blue-400 translate-y-1 shadow-none'
      }
      if (color === 'purple') {
        return 'border-purple-500/80 bg-purple-500/25 text-purple-400 translate-y-1 shadow-none'
      }
      return 'border-emerald-500/80 bg-emerald-500/25 text-emerald-400 translate-y-1 shadow-none'
    }
    return 'border-zinc-700 bg-zinc-800/40 text-zinc-400 translate-y-0 shadow-[0_4px_0_#3f3f46] hover:bg-zinc-700/40 hover:text-zinc-300 hover:translate-y-0.5 hover:shadow-[0_2px_0_#3f3f46]'
  } else {
    if (isActive) {
      if (color === 'blue') {
        return 'border-blue-600 bg-blue-50/90 text-blue-800 translate-y-1 shadow-none'
      }
      if (color === 'purple') {
        return 'border-purple-600 bg-purple-50/90 text-purple-800 translate-y-1 shadow-none'
      }
      return 'border-emerald-600 bg-emerald-50/90 text-emerald-800 translate-y-1 shadow-none'
    }
    return 'border-zinc-300 bg-white/70 text-zinc-600 translate-y-0 shadow-[0_4px_0_#b3d9ff] hover:bg-white hover:text-zinc-800 hover:translate-y-0.5 hover:shadow-[0_2px_0_#b3d9ff]'
  }
}

export const getTagToggleStyles = (
  isOpen: boolean,
  hasFilters: boolean,
  isFilterDisabled: boolean,
  isDarkTheme: boolean
) => {
  return clsx(
    BUTTON_BASE.tagToggle,
    isFilterDisabled
      ? isDarkTheme
        ? 'cursor-not-allowed border-zinc-800 bg-zinc-800/10 text-zinc-600 opacity-50'
        : 'cursor-not-allowed border-zinc-200 bg-zinc-100/50 text-zinc-400 opacity-50'
      : 'cursor-pointer',
    !isFilterDisabled && (isOpen || hasFilters)
      ? isDarkTheme
        ? 'border-blue-500/80 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
        : 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-[0_0_10px_rgba(37,99,235,0.1)]'
      : !isFilterDisabled &&
          (isDarkTheme
            ? 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
            : 'border-zinc-300 bg-white/70 text-zinc-600 hover:bg-white hover:text-zinc-800')
  )
}

export const getResetStyles = (canReset: boolean, isDarkTheme: boolean) => {
  return clsx(
    BUTTON_BASE.reset,
    !canReset
      ? isDarkTheme
        ? 'border-zinc-800 bg-zinc-800/10 text-zinc-600 cursor-not-allowed opacity-40'
        : 'border-zinc-200 bg-zinc-100/50 text-zinc-400 cursor-not-allowed opacity-40'
      : isDarkTheme
        ? 'cursor-pointer border-red-500/40 bg-red-500/10 text-red-400 hover:border-red-500/60 hover:bg-red-500/20 hover:text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.15)]'
        : 'cursor-pointer border-red-600 bg-red-50/80 text-red-700 hover:border-red-600 hover:bg-red-100/80 hover:text-red-800 shadow-[0_0_10px_rgba(220,38,38,0.1)]'
  )
}

export const getTagItemStyles = (isActive: boolean, isDarkTheme: boolean) => {
  return clsx(
    BUTTON_BASE.tagItem,
    isActive
      ? isDarkTheme
        ? 'border-blue-500/80 bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
        : 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-[0_0_12px_rgba(37,99,235,0.15)]'
      : isDarkTheme
        ? 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
        : 'border-zinc-300 bg-white/70 text-zinc-600 hover:bg-white hover:text-zinc-800'
  )
}
