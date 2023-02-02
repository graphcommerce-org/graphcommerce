import type { GraphCommerceConfig } from '@graphcommerce/graphql-mesh'
import { cosmiconfigSync } from 'cosmiconfig'
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader'
import { GraphCommerceConfigSchema } from '../generated/config'
import { mergeEnvIntoConfig, formatAppliedEnv } from './utils/mergeEnvIntoConfig'

export function loadConfig(cwd: string): GraphCommerceConfig {
  const moduleName = 'graphcommerce'

  try {
    const result = cosmiconfigSync('config', {
      loaders: { '.ts': TypeScriptLoader({ transpileOnly: true }) },
      searchPlaces: [
        'package.json',
        `${moduleName}.config.js`,
        `${moduleName}.config.ts`,
        `${moduleName}.config.cjs`,
      ],
    }).search(cwd)

    if (!result) throw Error("Couldn't find a graphcommerce.config.ts in the project.")

    const schema = GraphCommerceConfigSchema()
    const config = schema.optional().parse(result.config)

    if (!config) throw Error("Couldn't find a graphcommerce.config.ts in the project.")

    const [mergedConfig, applyResult] = mergeEnvIntoConfig(
      GraphCommerceConfigSchema(),
      config,
      process.env,
    )
    if (applyResult.length > 0) console.log(formatAppliedEnv(applyResult))

    return schema.parse(mergedConfig)
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message)
      process.exit(1)
    }
    throw error
  }
}
