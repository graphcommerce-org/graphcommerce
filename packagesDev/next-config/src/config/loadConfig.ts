// eslint-disable-next-line import/no-extraneous-dependencies
import { cosmiconfigSync } from 'cosmiconfig'
import type { GraphCommerceConfig } from '../generated/config'
import { GraphCommerceConfigSchema } from '../generated/config'
import { formatAppliedEnv } from './utils/mergeEnvIntoConfig'
import { rewriteLegacyEnv } from './utils/rewriteLegacyEnv'

export * from './utils/configToImportMeta'

const moduleName = 'graphcommerce'
const loader = cosmiconfigSync(moduleName)

export function loadConfig(cwd: string): GraphCommerceConfig {
  try {
    const result = loader.search(cwd)

    if (!result) throw Error("Couldn't find a graphcommerce.config.(m)js in the project.")

    const schema = GraphCommerceConfigSchema()
    const config = schema.parse(result.config)

    if (!config) throw Error("Couldn't find a graphcommerce.config.(m)js in the project.")

    const [mergedConfig, applyResult] = rewriteLegacyEnv(
      GraphCommerceConfigSchema(),
      config,
      process.env,
    )

    if (applyResult.length > 0) console.log(formatAppliedEnv(applyResult))

    return schema.parse(mergedConfig)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      process.exit(1)
    }
    throw error
  }
}
