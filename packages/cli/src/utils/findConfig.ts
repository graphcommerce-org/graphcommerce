/* eslint-disable import/no-extraneous-dependencies */
import type { ConfigProcessOptions } from '@graphql-mesh/config'
import { DefaultLogger, defaultImportFn, loadYaml } from '@graphql-mesh/utils'
import { cosmiconfig, defaultLoaders } from 'cosmiconfig'
import path from 'path'

function customLoader(
  ext: 'json' | 'yaml' | 'js',
  importFn = defaultImportFn,
  initialLoggerPrefix = '🕸️  Mesh',
) {
  const logger = new DefaultLogger(initialLoggerPrefix).child('config')

  // eslint-disable-next-line consistent-return
  function loader(filepath: string, content: string) {
    if (process.env) {
      // eslint-disable-next-line no-param-reassign
      content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
        let varName = variable
        let defaultValue = ''

        if (variable.includes(':')) {
          const spl = variable.split(':')
          varName = spl.shift()
          defaultValue = spl.join(':')
        }

        return process.env[varName] || defaultValue
      })
    }

    if (ext === 'json') {
      return defaultLoaders['.json'](filepath, content)
    }

    if (ext === 'yaml') {
      return loadYaml(filepath, content, logger)
    }

    if (ext === 'js') {
      return importFn(filepath)
    }
  }

  return loader
}

export async function findConfig(
  options?: Pick<ConfigProcessOptions, 'configName' | 'dir' | 'importFn' | 'initialLoggerPrefix'>,
) {
  const { configName = 'mesh', dir: configDir = '', initialLoggerPrefix } = options || {}
  const dir = path.isAbsolute(configDir) ? configDir : path.join(process.cwd(), configDir)
  const explorer = cosmiconfig(configName, {
    searchPlaces: [
      'package.json',
      `.${configName}rc`,
      `.${configName}rc.json`,
      `.${configName}rc.yaml`,
      `.${configName}rc.yml`,
      `.${configName}rc.js`,
      `.${configName}rc.ts`,
      `.${configName}rc.cjs`,
      `${configName}.config.js`,
      `${configName}.config.cjs`,
    ],
    loaders: {
      '.json': customLoader('json', options?.importFn, initialLoggerPrefix),
      '.yaml': customLoader('yaml', options?.importFn, initialLoggerPrefix),
      '.yml': customLoader('yaml', options?.importFn, initialLoggerPrefix),
      '.js': customLoader('js', options?.importFn, initialLoggerPrefix),
      '.ts': customLoader('js', options?.importFn, initialLoggerPrefix),
      noExt: customLoader('yaml', options?.importFn, initialLoggerPrefix),
    },
  })
  const results = await explorer.search(dir)

  if (!results) {
    throw new Error(`No ${configName} config file found in "${dir}"!`)
  }

  const { config } = results
  return config
}
