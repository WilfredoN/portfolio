import type { IconVariant } from '../types/icon'

import { BASE_URL } from '../constants/icon'

export const getIconUrl = (iconName: string, variant: IconVariant) =>
  `${BASE_URL}/${iconName}/${iconName}-${variant}.svg`
