/* eslint-disable no-console */
import { transformFileSync } from '@swc/core'
import { cosmiconfigSync } from 'cosmiconfig'
import { existsSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { GraphCommerceConfig } from '../generated/config'
import { GraphCommerceConfigSchema } from '../generated/config'
import { demoConfig } from './demoConfig'
import { formatAppliedEnv, mergeEnvIntoConfig } from './utils/mergeEnvIntoConfig'

export * from './utils/replaceConfigInString'

const moduleName = 'graphcommerce'
const requireFromHere = createRequire(import.meta.url)
let tmpCounter = 0

// cosmiconfig's built-in sync TypeScript loader transpiles the config to a
// fixed `.cjs` path on disk and removes it again — that races between
// Next.js worker processes (especially under Turbopack), producing
// "Cannot find module" panics. We transpile via SWC and write to a
// per-process unique filename so concurrent loads never collide. The temp
// file lives next to the source so relative `require()` calls in the
// config still resolve.
function loadTsConfig(filepath: string): Record<string, unknown> {
  const { code } = transformFileSync(filepath, {
    jsc: { parser: { syntax: 'typescript' }, target: 'es2022' },
    module: { type: 'commonjs' },
  })

  const tmpFile = join(
    dirname(filepath),
    `.${moduleName}.tmp.${process.pid}-${tmpCounter++}.cjs`,
  )

  try {
    writeFileSync(tmpFile, code)
    delete requireFromHere.cache[tmpFile]
    const mod = requireFromHere(tmpFile) as
      | { default?: Record<string, unknown> }
      | Record<string, unknown>
    return (mod as { default?: Record<string, unknown> }).default ?? mod
  } finally {
    if (existsSync(tmpFile)) rmSync(tmpFile, { force: true })
  }
}

const loader = cosmiconfigSync(moduleName, {
  loaders: { '.ts': loadTsConfig },
})

export function loadConfig(cwd: string): GraphCommerceConfig {
  const isMainProcess = !process.send

  try {
    const result = loader.search(cwd)

    let confFile = result?.config
    if (!confFile) {
      if (isMainProcess)
        console.warn('No graphcommerce.config.ts found in the project, using demo config')
      confFile = demoConfig
    }
    confFile ||= {}

    const schema = GraphCommerceConfigSchema()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [mergedConfig, applyResult] = mergeEnvIntoConfig(schema, confFile, process.env)

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
