#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
import { packageRoots, resolveDependenciesSync } from '@graphcommerce/next-config'
import { cliError, loadCodegenConfig, runCli } from '@graphql-codegen/cli'
import type { Types } from '@graphql-codegen/plugin-helpers'
import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'
import { rimraf } from 'rimraf'
import yaml from 'yaml'

const [, , cmd] = process.argv

dotenv.config()

const root = process.cwd()
const configLocation = path.join(root, '._tmp_codegen.yml')

async function cleanup() {
  try {
    await fs.stat(configLocation).then((r) => {
      if (r.isFile()) return fs.unlink(configLocation)
      return undefined
    })
  } catch (e) {
    // ignore
  }
  return undefined
}

function appendDocumentLocations(
  conf: Types.ConfiguredOutput,
  packages: string[],
): Types.ConfiguredOutput {
  const documents = Array.isArray(conf.documents) ? conf.documents : [conf.documents]
  documents.push(...packages.map((p) => `${p}/**/*.graphql`))

  return conf
}

async function main() {
  // Make sure we dont already have a --config or -c cli argument as we're going to override it.
  if (process.argv.includes('--config') || process.argv.includes('-c')) {
    throw Error('--config or -c argument is not supported, modify codegen.yml to make changes')
  }

  const deps = resolveDependenciesSync()
  const packages = [...deps.values()].filter((p) => p !== '.')

  // Load the current codegen.yml
  // Todo: implement loading with a custom --config or -c here.
  const conf = await loadCodegenConfig({ configFilePath: root })

  // Get a a list of all generates configurations.
  const generates = Object.entries(conf.config.generates).map(([generatedPath, value]) => {
    const found = [...deps.entries()].find((dep) =>
      generatedPath.startsWith(`node_modules/${dep[0]}`),
    )

    if (!found) return [generatedPath, value] as const
    const newPath = generatedPath.replace(`node_modules/${found[0]}`, found[1])
    return [newPath, value] as const
  })

  let extension: string | undefined

  // Find the file extension used for the generated graphql files and cleanup if not used anymore.
  generates.forEach(([, gen]) => {
    if (Array.isArray(gen)) return
    if (gen.presetConfig?.extension) extension = gen.presetConfig.extension
  })

  const isWatching = process.argv.includes('--watch') || process.argv.includes('-w')
  if (!isWatching && extension) await rimraf(path.join(root, `**/*${extension}`))

  // - Prepend the all targets with ../../ if we're running in a monorepo setup.
  // - Append all the Graphcommerce packages to the configuration
  conf.config.generates = Object.fromEntries(
    generates.map(([generateTarget, generateConf]) => [
      generateTarget,
      Array.isArray(generateConf) ? generateConf : appendDocumentLocations(generateConf, packages),
    ]),
  )

  packageRoots(packages).forEach((r) => {
    conf.config.generates[r] = conf.config.generates['.']
  })

  // Reexport the mesh to is can be used by codegen
  await fs.writeFile(configLocation, yaml.stringify(conf.config))

  // Append the new cli argument
  process.argv.push('--config')
  process.argv.push(configLocation)

  // Run the cli
  const result = await runCli(cmd)
  await cleanup()
  process.exit(result)
}

main().catch((e) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  cleanup()
  cliError(e)
})
