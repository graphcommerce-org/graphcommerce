import { readFileSync, writeFileSync } from 'fs'
import oxfmtConfig from '@graphcommerce/oxfmt-config-pwa'
import { generate } from '@graphql-codegen/cli'
import { transformFileSync } from '@swc/core'
import dotenv from 'dotenv'
import { format } from 'oxfmt'
import { findParentPath } from '../utils/findParentPath'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { resolveDependency } from '../utils/resolveDependency'

const packages = [...resolveDependenciesSync().values()].filter((p) => p !== '.')

// Use specific patterns instead of ** to avoid expensive directory traversal
export const configSchemaLocations = [
  'graphql/Config.graphqls',
  ...packages.flatMap((p) => [`${p}/Config.graphqls`, `${p}/graphql/Config.graphqls`]),
]
const resolve = resolveDependency()

dotenv.config({ quiet: true })

export async function generateConfig() {
  const resolved = resolve('@graphcommerce/next-config')
  if (!resolved) throw Error('Could not resolve @graphcommerce/next-config')

  const targetTs = `${resolved.root}/src/generated/config.ts`
  const targetJs = `${resolved.root}/dist/generated/config.js`

  await generate({
    silent: true,
    schema: configSchemaLocations,
    generates: {
      [targetTs]: {
        plugins: ['typescript', 'typescript-validation-schema'],
        config: {
          schema: 'zodv4',
          notAllowEmptyString: true,
          strictScalars: true,
          enumsAsTypes: true,
          scalarSchemas: {
            Domain: 'z.string()',
            DateTime: 'z.date()',
            RichTextAST: 'z.object.json()',
          },
        },
      },
      ...(findParentPath(process.cwd()) && {
        '../../docs/framework/config.md': {
          plugins: ['@graphcommerce/graphql-codegen-markdown-docs'],
        },
      }),
    },
  })

  // typescript-validation-schema writes `.default(x).nullish()`: `.nullish()` returns undefined
  // before `.default()` runs. The zodv4 return types `z.ZodObject<Properties<T>>` make each
  // optional key required in the inferred output.
  const schemaTs = readFileSync(targetTs, 'utf-8')
    .replace(/\.default\(([^()]+)\)\.nullish\(\)/g, '.nullish().default($1)')
    .replace(/\):\s*z\.Zod(?:Object|Type)<\s*(?:Properties<)?\w+>?\s*>\s*\{/g, ') {')
    .replace(/type Properties<T> = \{[^}]*\};?\n/, '')

  const { code, errors } = await format(targetTs, schemaTs, { ...oxfmtConfig, sortImports: false })
  if (errors.length) throw Error(`Could not format ${targetTs}: ${errors[0].message}`)
  writeFileSync(targetTs, code)

  const result = transformFileSync(targetTs, {
    module: { type: 'nodenext' },
    env: { targets: { node: '20' } },
  })

  writeFileSync(targetJs, result.code)
}
