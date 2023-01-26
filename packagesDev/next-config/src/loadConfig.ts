import { cosmiconfigSync } from 'cosmiconfig'
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader'
import { GraphCommerceConfig } from './configuration'

export function loadConfig(): GraphCommerceConfig {
  const moduleName = 'graphcommerce'

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  const result = cosmiconfigSync('config', {
    loaders: { '.ts': TypeScriptLoader() },
    searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.ts`,
      `.${moduleName}rc.cjs`,
      `${moduleName}.config.js`,
      `${moduleName}.config.ts`,
      `${moduleName}.config.cjs`,
    ],
  }).search()

  if (!result) throw Error("Couldn't find a graphcommerce.config.ts file")
  return result.config as GraphCommerceConfig
}
