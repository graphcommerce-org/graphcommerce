#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { promises as fs } from 'fs'
import path from 'path'
import { exit } from 'process'
import { graphqlMesh, DEFAULT_CLI_PARAMS, GraphQLMeshCLIParams } from '@graphql-mesh/cli'
import { Logger, YamlConfig } from '@graphql-mesh/types'
import { DefaultLogger } from '@graphql-mesh/utils'
import dotenv from 'dotenv'
import yaml from 'yaml'
import { findConfig } from '../mesh/findConfig'

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

const isMonoRepo = relativePath.startsWith('../../examples')

const artifactsDir = path.join(path.relative(root, meshDir), '/.mesh')

const cliParams: GraphQLMeshCLIParams = {
  ...DEFAULT_CLI_PARAMS,
  artifactsDir,
  playgroundTitle: 'GraphCommerce® Mesh',
}

const tmpMesh = `_tmp_mesh_${Math.random().toString(36).substring(2, 15)}`
const tmpMeshLocation = path.join(root, `.${tmpMesh}rc.yml`)

function cleanup() {
  try {
    return fs.unlink(tmpMeshLocation)
  } catch (e) {
    // ignore
  }
  return undefined
}

const main = async () => {
  const conf = (await findConfig({})) as YamlConfig.Config

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
    if (additionalTypeDef.startsWith('@'))
      return path.relative(root, require.resolve(additionalTypeDef))

    return additionalTypeDef
  })

  // Scan the current working directory to also read all graphqls files.
  conf.additionalTypeDefs.push('**/*.graphqls')
  if (isMonoRepo) {
    conf.additionalTypeDefs.push('../../packages/**/*.graphqls')
    conf.additionalTypeDefs.push('../../packagesDev/**/*.graphqls')
  } else {
    conf.additionalTypeDefs.push('node_modules/@graphcommerce/**/*.graphqls')
  }

  if (!conf.serve) conf.serve = {}
  if (!conf.serve.playgroundTitle) conf.serve.playgroundTitle = 'GraphCommerce® Mesh'

  await fs.writeFile(tmpMeshLocation, yaml.stringify(conf))

  await graphqlMesh({ ...cliParams, configName: tmpMesh })

  await cleanup()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

main().catch((e) => handleFatalError(e, new DefaultLogger(DEFAULT_CLI_PARAMS.initialLoggerPrefix)))
