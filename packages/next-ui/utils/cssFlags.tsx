import { cookie } from './cookie'
import { FLAGS_COOKIE_KEY } from './getCssFlagInitScript'

function loadFlags(): Record<string, true | string> {
  try {
    const raw = cookie(FLAGS_COOKIE_KEY)
    if (!raw) return {}
    const flags = JSON.parse(raw)
    if (typeof flags !== 'object' || flags === null) return {}
    return flags as Record<string, true | string>
  } catch {
    return {}
  }
}

function saveFlags(flags: Record<string, true | string>) {
  const json = JSON.stringify(flags)
  if (json === '{}') cookie(FLAGS_COOKIE_KEY, null)
  else cookie(FLAGS_COOKIE_KEY, json)
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
 * ;<Box sx={{ [cssFlag('mode', 'dark')]: { color: 'white' } }} />
 * ```
 */
export const cssFlag = <T extends string>(flagName: T, val?: string) =>
  `html[data-${flagName}${val ? `=${val}` : ''}] &` as const

/**
 * Easily create a CSS selector that only applies when a flag is not set.
 *
 * Example:
 *
 * ```tsx
 * ;<Box sx={{ [cssNotFlag('mode', 'dark')]: { color: 'black' } }} />
 * ```
 */
export const cssNotFlag = <T extends string>(flagName: T, val?: string) =>
  `html:not([data-${flagName}${val ? `=${val}` : ''}]) &` as const
