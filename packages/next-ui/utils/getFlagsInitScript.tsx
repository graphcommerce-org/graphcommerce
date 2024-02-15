import * as React from 'react'

export const DEFAULT_MODE_STORAGE_KEY = 'mode'
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'gc-flags'
export const DEFAULT_ATTRIBUTE = 'gc-flag'

export function getFlagsInitScript() {
  return (
    <script
      id='init-gc-flags'
      key='mui-color-scheme-init'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  const flags = JSON.parse(localStorage.getItem('${DEFAULT_COLOR_SCHEME_STORAGE_KEY}') || "'{}'")
  Object.entries(flags).forEach(([key, val]) => {
    document.documentElement.setAttribute('${DEFAULT_ATTRIBUTE}-' +key, val)
  })
} catch(e){}})();`,
      }}
    />
  )
}

function getFlags() {
  const flags = JSON.parse(localStorage.getItem(DEFAULT_COLOR_SCHEME_STORAGE_KEY) || "'{}'")
  return flags as Record<string, true | string>
}

function setFlags(flags: Record<string, true | string>) {
  window.localStorage?.setItem(DEFAULT_COLOR_SCHEME_STORAGE_KEY, JSON.stringify(flags))
}

export function removeFlag(flagName: string) {
  const flags = getFlags()
  delete flags[flagName]
  setFlags(flags)
}

export function setFlag(flagName: string, value: true | string) {
  const flags = getFlags()
  flags[flagName] = value
  setFlags(flags)
}

export function getFlag(flagName: string) {
  return getFlags()[flagName]
}

export function select(flagName) {
  return `[${DEFAULT_ATTRIBUTE}-${flagName}]`
}
