/* eslint-disable import/no-extraneous-dependencies */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'
import type { meshConfig as meshConfigBase } from '@graphcommerce/graphql-mesh/meshConfig'
import {
  loadConfig,
  packageRoots,
  replaceConfigInString,
  resolveDependenciesSync,
} from '@graphcommerce/next-config'
import { graphqlMesh, DEFAULT_CLI_PARAMS, GraphQLMeshCLIParams } from '@graphql-mesh/cli'
import { Logger, YamlConfig } from '@graphql-mesh/types'
import { DefaultLogger, fileURLToPath } from '@graphql-mesh/utils'
import dotenv from 'dotenv'
import type { OmitIndexSignature, Entries } from 'type-fest'
import yaml from 'yaml'
import { findConfig } from '../utils/findConfig'
import 'tsx/cjs'
import 'tsx/esm'

dotenv.config()

function resolvePath(pathStr: string) {
  return fileURLToPath(import.meta.resolve(pathStr))
}

export function handleFatalError(e: Error, logger: Logger = new DefaultLogger('◈')) {
  logger.error(e.stack || e.message)
  // eslint-disable-next-line no-console
  console.log(e)
  if (process.env.JEST == null) exit(1)
}

const root = process.cwd()
const meshDir = path.dirname(resolvePath('@graphcommerce/graphql-mesh'))
const relativePath = path.join(path.relative(meshDir, root), '/')

const cliParams: GraphQLMeshCLIParams = {
  ...DEFAULT_CLI_PARAMS,
  playgroundTitle: 'GraphCommerce® Mesh',
}

const tmpMesh = `_tmp_mesh`
const tmpMeshLocation = path.join(root, `.${tmpMesh}rc.yml`)

async function cleanup() {
  try {
    await fs.stat(tmpMeshLocation).then((r) => {
      if (r.isFile()) return fs.unlink(tmpMeshLocation)
      return undefined
    })
  } catch (e) {
    // ignore
  }
  return undefined
}

const main = async () => {
  const baseConf = (await findConfig({})) as YamlConfig.Config
  const graphCommerce = loadConfig(root)

  const meshConfigf = (await import(
    '@graphcommerce/graphql-mesh/meshConfig.interceptor'
  )) as unknown as {
    default: {
      meshConfig: typeof meshConfigBase
    }
  }
  const conf = meshConfigf.default.meshConfig(baseConf, graphCommerce)

  // We're configuring a custom fetch function
  conf.customFetch = '@graphcommerce/graphql-mesh/customFetch'
  conf.serve = { ...conf.serve, endpoint: '/api/graphql' }

  // Rewrite additionalResolvers so we can use module resolution more easily
  conf.additionalResolvers = conf.additionalResolvers ?? []
  conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
    if (typeof additionalResolver !== 'string') return additionalResolver
    if (additionalResolver.startsWith('@'))
      return path.relative(root, resolvePath(additionalResolver))

    return additionalResolver
  })

  type DefinedHandler = OmitIndexSignature<YamlConfig.Handler>

  conf.sources = conf.sources.map((source) => {
    const definedHandlers = Object.entries(source.handler) as Entries<DefinedHandler>
    return {
      ...source,
      handler: Object.fromEntries(
        definedHandlers.map(([key, value]) => {
          if (key === 'openapi' && value) {
            const openapi = value as NonNullable<DefinedHandler['openapi']>
            if (openapi.source.startsWith('@')) {
              return [key, { ...openapi, source: path.relative(root, resolvePath(openapi.source)) }]
            }
          }

          return [key, value]
        }),
      ),
    }
  })

  // Rewrite additionalTypeDefs so we can use module resolution more easily
  if (!conf.additionalTypeDefs) conf.additionalTypeDefs = []
  conf.additionalTypeDefs = (
    Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]
  ).map((additionalTypeDef) => {
    if (typeof additionalTypeDef === 'string' && additionalTypeDef.startsWith('@'))
      return path.relative(root, resolvePath(additionalTypeDef))

    return additionalTypeDef
  })

  // Scan the current working directory to also read all graphqls files.
  conf.additionalTypeDefs.push('graphql/**/*.graphqls')
  conf.additionalTypeDefs.push('components/**/*.graphqls')
  conf.additionalTypeDefs.push('lib/**/*.graphqls')
  conf.additionalTypeDefs.push('app/**/*.graphqls')

  const deps = resolveDependenciesSync()
  const packages = [...deps.values()].filter((p) => p !== '.')

  const mV = graphCommerce.magentoVersion ?? 246
  packageRoots(packages).forEach((r) => {
    const alsoScan = [245, 246, 247, 248, 249, 250, 251, 252, 253, 254]
      .filter((v) => v > mV)
      .map((v) => `${r}/*/schema-${v}/**/*.graphqls`)

    conf.additionalTypeDefs.push(`${r}/*/schema/**/*.graphqls`)
    conf.additionalTypeDefs.push(...alsoScan)
  })

  if (!conf.serve) conf.serve = {}
  if (!conf.serve.playgroundTitle) conf.serve.playgroundTitle = 'GraphCommerce® Mesh'

  conf.plugins = [
    ...(conf.plugins ?? []),
    {
      httpDetailsExtensions: {
        if: "env.NODE_ENV === 'development'",
      },
    },
  ]

  const yamlString = replaceConfigInString(yaml.stringify(conf), graphCommerce)
  await fs.writeFile(tmpMeshLocation, yamlString)

  // Reexport the mesh to is can be used by packages
  await fs.writeFile(
    `${meshDir}/.mesh.ts`,
    `export * from '${relativePath.split(path.sep).join('/')}.mesh'`,
    { encoding: 'utf8' },
  )

  await graphqlMesh({ ...cliParams, configName: tmpMesh })

  await cleanup()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

main().catch((e) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  cleanup()
  if (e instanceof Error) {
    handleFatalError(e, new DefaultLogger(DEFAULT_CLI_PARAMS.initialLoggerPrefix))
  }
})
