#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import fs from 'fs'
import path from 'path'
import { exit } from 'process'
import { graphqlMesh, DEFAULT_CLI_PARAMS } from '@graphql-mesh/cli'
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

const main = async () => {
  const conf = (await findConfig({})) as YamlConfig.Config

  // Rewrite additionalResolvers so we can use module resolution more easily
  conf.additionalResolvers = conf.additionalResolvers ?? []
  conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
    if (typeof additionalResolver !== 'string') return additionalResolver

    if (additionalResolver.startsWith('@'))
      return path.relative(meshDir, require.resolve(additionalResolver))

    return `${relativePath}${additionalResolver}`
  })

  // Rewrite additionalTypeDefs so we can use module resolution more easily
  if (!conf.additionalTypeDefs) conf.additionalTypeDefs = []
  conf.additionalTypeDefs = (
    Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]
  ).map((additionalTypeDef) => {
    if (additionalTypeDef.startsWith('@'))
      return path.relative(meshDir, require.resolve(additionalTypeDef))

    return additionalTypeDef
  })

  conf.additionalTypeDefs.push('../../**/*.graphqls')
  if (isMonoRepo) {
    conf.additionalTypeDefs.push('../../packages/**/*.graphqls')
    conf.additionalTypeDefs.push('../../packagesDev/**/*.graphqls')
  } else {
    conf.additionalTypeDefs.push('../../@graphcommerce/**/*.graphqls')
  }

  if (isMonoRepo) {
    console.log(yaml.stringify(conf))
  }

  fs.writeFileSync(path.join(meshDir, '.meshrc.yml'), yaml.stringify(conf))

  graphqlMesh(DEFAULT_CLI_PARAMS, undefined, `${meshDir}/`).catch((e) =>
    handleFatalError(e, new DefaultLogger(DEFAULT_CLI_PARAMS.initialLoggerPrefix)),
  )
}

main().catch(console.error)
