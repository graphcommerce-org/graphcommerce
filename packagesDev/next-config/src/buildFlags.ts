import type { Simplify, CamelCase } from 'type-fest'

// Get the defined env variables and filter out the ones that are not build flags
export type BuildFlags = Simplify<{
  [K in keyof NodeJS.ProcessEnv as K extends `BUILD_FLAG_${string}`
    ? K extends `BUILD_FLAG_${infer Rest}`
      ? CamelCase<Rest>
      : never
    : never]: boolean
}>

const envToConf = (str: string) =>
  str
    .replace('BUILD_FLAG_', '')
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

// convert to screamingSnakeCase and prefix with BUILD_FLAG_
const confToEnv = (str: string): keyof NodeJS.ProcessEnv => {
  const envVar = str
    .replace(/([A-Z])/g, (group) => `_${group}`)
    .toUpperCase()
    .replace(/^_/, '')
  return `BUILD_FLAG_${envVar}`
}

export function buildFlags(incoming?: BuildFlags) {
  const flags: Record<string, boolean> = incoming ?? {}

  // Find all process.env build flag
  Object.entries(process.env)
    .filter(([envVar]) => envVar.startsWith('BUILD_FLAG_'))
    .forEach(([envVar, stringValue]) => {
      if (stringValue !== '1' && stringValue !== '0' && stringValue !== undefined) {
        throw new Error(`Build flag ${envVar} must be a '1' or '0'`)
      }

      const buildFlagValue = stringValue === '1'
      const buildFlag = envToConf(envVar)

      if (typeof flags[buildFlag] !== 'undefined' && flags[buildFlag] !== buildFlagValue) {
        console.warn(`${envVar}=${stringValue} overrides buildFlag ${buildFlag}`)
      } else {
        console.info(`${envVar}=${stringValue} sets buildFlag ${buildFlag}`)
      }

      flags[buildFlag] = buildFlagValue
    })

  return Object.fromEntries(
    Object.entries(flags).map(([buildFlag, value]) => [confToEnv(buildFlag), value ? '1' : '']),
  )
}
