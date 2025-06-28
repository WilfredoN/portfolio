import { BASE_URL } from '../constants/icon'
import { IconVariant } from '../types/icon'

export const getIconUrl = (iconName: string, variant: IconVariant) =>
	`${BASE_URL}/${iconName}/${iconName}-${variant}.svg`
