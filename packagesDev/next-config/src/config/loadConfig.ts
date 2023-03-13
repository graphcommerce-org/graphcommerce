// eslint-disable-next-line import/no-extraneous-dependencies
import { cosmiconfigSync } from 'cosmiconfig'
import type { GraphCommerceConfig } from '../generated/config'
import { GraphCommerceConfigSchema } from '../generated/config'
import { demoConfig } from './demoConfig'
import { filterEnv, formatAppliedEnv } from './utils/mergeEnvIntoConfig'
import { rewriteLegacyEnv } from './utils/rewriteLegacyEnv'

export * from './utils/configToImportMeta'
export * from './utils/replaceConfigInString'

const moduleName = 'graphcommerce'
const loader = cosmiconfigSync(moduleName)

export function loadConfig(cwd: string): GraphCommerceConfig {
  const isMainProcess = !process.send

  try {
    const result = loader.search(cwd)

    let confFile = result?.config
    const hasEnv = Object.keys(filterEnv(process.env)).length > 0
    if (!confFile) {
      if (isMainProcess)
        console.warn('No graphcommerce.config.js found in the project, using demo config')
      confFile = demoConfig
    }
    confFile ||= {}

    const schema = GraphCommerceConfigSchema()
    const parsed = schema.safeParse(confFile)

    const [mergedConfig, applyResult] = rewriteLegacyEnv(
      GraphCommerceConfigSchema(),
      parsed.success ? parsed.data : {},
      process.env,
    )

    if (applyResult.length > 0 && isMainProcess) console.log(formatAppliedEnv(applyResult))

    const finalParse = schema.parse(mergedConfig)
    if (process.env.DEBUG && isMainProcess) {
      console.log('Parsed configuration')
      console.log(finalParse)
    }
    return finalParse
  } catch (error) {
    if (error instanceof Error) {
      if (isMainProcess) {
        console.log(error.message)
        process.exit(1)
      }
    }
    throw error
  }
}
