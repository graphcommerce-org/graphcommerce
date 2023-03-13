#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'
import { isMonorepo, loadConfig, replaceConfigInString } from '@graphcommerce/next-config'
import { graphqlMesh, DEFAULT_CLI_PARAMS, GraphQLMeshCLIParams } from '@graphql-mesh/cli'
import { Logger, YamlConfig } from '@graphql-mesh/types'
import { DefaultLogger } from '@graphql-mesh/utils'
import dotenv from 'dotenv'
import yaml from 'yaml'
import { findConfig } from '../utils/findConfig'

dotenv.config()

export function handleFatalError(e: Error, logger: Logger = new DefaultLogger('◈')) {
  logger.error(e.stack || e.message)
  // eslint-disable-next-line no-console
  console.log(e)
  if (process.env.JEST == null) exit(1)
}

const root = process.cwd()
const meshDir = path.dirname(require.resolve('@graphcommerce/graphql-mesh'))
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
    })
  } catch (e) {
    // ignore
  }
  return undefined
}

const main = async () => {
  const conf = (await findConfig({})) as YamlConfig.Config

  // We're configuring a custom fetch function
  conf.customFetch = '@graphcommerce/graphql-mesh/customFetch'
  conf.serve = { ...conf.serve, endpoint: '/api/graphql' }

  // Rewrite additionalResolvers so we can use module resolution more easily
  conf.additionalResolvers = conf.additionalResolvers ?? []
  conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
    if (typeof additionalResolver !== 'string') return additionalResolver
    if (additionalResolver.startsWith('@'))
      return path.relative(root, require.resolve(additionalResolver))

    return additionalResolver
  })

  // Rewrite additionalTypeDefs so we can use module resolution more easily
  if (!conf.additionalTypeDefs) conf.additionalTypeDefs = []
  conf.additionalTypeDefs = (
    Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]
  ).map((additionalTypeDef) => {
    if (typeof additionalTypeDef === 'string' && additionalTypeDef.startsWith('@'))
      return path.relative(root, require.resolve(additionalTypeDef))

    return additionalTypeDef
  })

  // Scan the current working directory to also read all graphqls files.
  conf.additionalTypeDefs.push('**/*.graphqls')
  if (isMonorepo()) {
    conf.additionalTypeDefs.push('../../packages/**/*.graphqls')
    conf.additionalTypeDefs.push('../../packagesDev/**/*.graphqls')
  } else {
    conf.additionalTypeDefs.push('node_modules/@graphcommerce/**/*.graphqls')
  }

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

  const yamlString = replaceConfigInString(yaml.stringify(conf), loadConfig(root))
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
