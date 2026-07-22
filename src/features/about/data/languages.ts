import type { IconVariant } from '@shared/components/Icon'

import { SKILL_DEFINITIONS, SKILL_KEYS } from '@shared/constants/skills'

export interface SkillItem {
  icon: string
  text: string
  type?: IconVariant
}

export const programmingLanguages: SkillItem[] = [
  SKILL_DEFINITIONS[SKILL_KEYS.JAVA],
  SKILL_DEFINITIONS[SKILL_KEYS.CSHARP],
  SKILL_DEFINITIONS[SKILL_KEYS.TYPESCRIPT],
  SKILL_DEFINITIONS[SKILL_KEYS.JAVASCRIPT],
  SKILL_DEFINITIONS[SKILL_KEYS.PYTHON],
  SKILL_DEFINITIONS[SKILL_KEYS.C],
  SKILL_DEFINITIONS[SKILL_KEYS.CPLUSPLUS]
].map((s) => ({ text: s.name, icon: s.icon, type: s.type }))

export const frontendAndDesktop: SkillItem[] = [
  SKILL_DEFINITIONS[SKILL_KEYS.REACT],
  SKILL_DEFINITIONS[SKILL_KEYS.ANGULAR],
  SKILL_DEFINITIONS[SKILL_KEYS.AVALONIA],
  SKILL_DEFINITIONS[SKILL_KEYS.HTML5],
  SKILL_DEFINITIONS[SKILL_KEYS.CSS3],
  SKILL_DEFINITIONS[SKILL_KEYS.TAILWINDCSS],
  SKILL_DEFINITIONS[SKILL_KEYS.CHAKRAUI],
  SKILL_DEFINITIONS[SKILL_KEYS.VITE]
].map((s) => ({ text: s.name, icon: s.icon, type: s.type }))

export const backendAndRealtime: SkillItem[] = [
  SKILL_DEFINITIONS[SKILL_KEYS.NODEJS],
  SKILL_DEFINITIONS[SKILL_KEYS.EXPRESS],
  SKILL_DEFINITIONS[SKILL_KEYS.DOTNET],
  SKILL_DEFINITIONS[SKILL_KEYS.SPRING],
  SKILL_DEFINITIONS[SKILL_KEYS.SIGNALR],
  SKILL_DEFINITIONS[SKILL_KEYS.SOCKETIO],
  SKILL_DEFINITIONS[SKILL_KEYS.BUN]
].map((s) => ({ text: s.name, icon: s.icon, type: s.type }))

export const databasesAndTools: SkillItem[] = [
  SKILL_DEFINITIONS[SKILL_KEYS.POSTGRESQL],
  SKILL_DEFINITIONS[SKILL_KEYS.MYSQL],
  SKILL_DEFINITIONS[SKILL_KEYS.SQLITE],
  SKILL_DEFINITIONS[SKILL_KEYS.REDIS],
  SKILL_DEFINITIONS[SKILL_KEYS.DOCKER],
  SKILL_DEFINITIONS[SKILL_KEYS.PLAYWRIGHT],
  SKILL_DEFINITIONS[SKILL_KEYS.JEST]
].map((s) => ({ text: s.name, icon: s.icon, type: s.type }))

export const technologiesAndLibraries: SkillItem[] = [
  ...frontendAndDesktop,
  ...backendAndRealtime,
  ...databasesAndTools
]
