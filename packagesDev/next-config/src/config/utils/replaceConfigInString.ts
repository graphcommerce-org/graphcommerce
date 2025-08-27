import type { GraphCommerceConfig } from '../../generated/config'

/** Flattens config object into dot notation */
function flattenConfig(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenConfig(value as Record<string, unknown>, newKey))
    } else {
      result[newKey] = String(value)
    }
  }

  return result
}

export function replaceConfigInString(str: string, config: Partial<GraphCommerceConfig>) {
  let result = str
  const replacers = flattenConfig(config as Record<string, unknown>, 'graphCommerce')

  Object.entries(replacers).forEach(([from, to]) => {
    result = result.replace(new RegExp(`{${from}}`, 'g'), to)
  })

  return result
}
