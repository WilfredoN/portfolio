import { IconVariant } from '@shared/components/Icon'

const GITHUB_ICON_REPO_URL =
  'https://raw.githubusercontent.com/devicons/devicon/0cb57ede339bb83cb2b3f35bec861dd962c01dea/icons'

export const getIconUrl = (iconName: string, variant: IconVariant) =>
  `${GITHUB_ICON_REPO_URL}/${iconName}/${iconName}-${variant}.svg`
