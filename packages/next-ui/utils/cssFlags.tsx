import { FLAGS_STORAGE_KEY } from './getCssFlagInitScript'

function loadFlags() {
  const flags = JSON.parse(localStorage.getItem(FLAGS_STORAGE_KEY) || '{}')
  if (typeof flags !== 'object' && flags !== null) return {}
  return flags as Record<string, true | string>
}

function saveFlags(flags: Record<string, true | string>) {
  window.localStorage?.setItem(FLAGS_STORAGE_KEY, JSON.stringify(flags))
}

export function removeCssFlag(flagName: string) {
  const flags = loadFlags()
  delete flags[flagName]
  document.documentElement.removeAttribute(`data-${flagName}`)
  saveFlags(flags)
}

export function setCssFlag(flagName: string, val: true | string) {
  document.documentElement.setAttribute(`data-${flagName}`, typeof val === 'boolean' ? '' : val)

  const flags = loadFlags()
  flags[flagName] = val
  saveFlags(flags)
}

export function getCssFlag(flagName: string) {
  return loadFlags()[flagName]
}

/**
 * Easily create a CSS selector that only applies when a flag is set.
 *
 * Example:
 *
 * ```tsx
 * <Box sx={{ [cssFlagSelector('dark')]: { color: 'white' } }} />
 * ```
 */
export const cssFlag = <T extends string>(flagName: T) => `html[data-${flagName}] &` as const

/**
 * Easily create a CSS selector that only applies when a flag is not set.
 *
 * Example:
 *
 * ```tsx
 * <Box sx={{ [cssNotFlagSelector('dark')]: { color: 'black' } }} />
 * ```
 */
export const cssNotFlag = <T extends string>(flagName: T) =>
  `html:not([data-${flagName}]) &` as const
