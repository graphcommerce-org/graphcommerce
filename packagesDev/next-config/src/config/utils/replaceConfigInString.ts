import { GraphCommerceConfig } from '../../generated/config'
import { configToImportMeta } from './configToImportMeta'

export function replaceConfigInString(str: string, config: Partial<GraphCommerceConfig>) {
  let result = str
  const replacers = configToImportMeta(config, false)

  Object.entries(replacers).forEach(([from, to]) => {
    result = result.replace(new RegExp(`{${from}}`, 'g'), to)
  })

  return result
}
