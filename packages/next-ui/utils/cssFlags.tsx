export const FLAGS_STORAGE_KEY = 'gc-flags'
export const FLAG_PREFIX = 'data'

export function getCssFlagsInitScript() {
  return (
    <script
      id='init-gc-flags'
      key='mui-color-scheme-init'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  const flags = JSON.parse(localStorage.getItem('${FLAGS_STORAGE_KEY}') || '{}')
  Object.entries(flags).forEach(([key, val]) => {
    document.documentElement.setAttribute('data-' +key, typeof val === 'boolean' ? '' : val)
  })
} catch(e){}})();`,
      }}
    />
  )
}

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

/**
 * @deprecated flags are not intendend to be used in JS, so this should only be used for debugging purposes.
 */
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
