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
    if (!confFile) {
      if (isMainProcess)
        console.warn('No graphcommerce.config.js found in the project, using demo config')
      confFile = demoConfig
    }
    confFile ||= {}

    const schema = GraphCommerceConfigSchema()
    const [mergedConfig, applyResult] = rewriteLegacyEnv(
      schema,
      process.env,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      confFile,
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
        console.log('Error while parsing graphcommerce.config.js', error.message)
        process.exit(1)
      }
    }
    throw error
  }
}
