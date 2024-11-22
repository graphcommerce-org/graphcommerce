import type { GraphCommerceConfig } from '../../generated/config'
import { toEnvStr } from './mergeEnvIntoConfig'

const fmt = (value: string | number | boolean | object | null) => {
  let formattedValue = value

  if (typeof formattedValue === 'boolean') {
    formattedValue = formattedValue ? '1' : '0'
  }
  if (typeof formattedValue === 'object') {
    formattedValue = JSON.stringify(formattedValue)
  }

  if (typeof formattedValue === 'number') {
    formattedValue = String(formattedValue)
  }

  return formattedValue
}

export function exportConfigToEnv(config: GraphCommerceConfig) {
  let env = ''

  Object.entries(config).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val, idx) => {
        env += `${toEnvStr([key, `${idx}`])}='${fmt(val)}'\n`
      })
    } else {
      env += `${toEnvStr([key])}='${fmt(value)}'\n`
    }
  })

  return env
}
