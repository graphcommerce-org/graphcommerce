import { generate } from '@graphql-codegen/cli'
import { writeFileSync } from 'fs'
import { transformFileSync } from '@swc/core'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { resolveDependency } from '../utils/resolveDependency'

const packages = [...resolveDependenciesSync().values()].filter((p) => p !== '.')

const resolve = resolveDependency()

const schemaLocations = packages.map((p) => `${p}/**/Config.graphqls`)

export async function generateConfig() {
  const targetTs = `${resolve('@graphcommerce/next-config').root}/src/generated/config.ts`
  const targetJs = `${resolve('@graphcommerce/next-config').root}/dist/generated/config.js`
  await generate({
    silent: true,
    schema: ['graphql/**/Config.graphqls', ...schemaLocations],
    generates: {
      [targetTs]: {
        plugins: ['typescript', 'typescript-validation-schema', 'add'],
        config: {
          // enumsAsTypes: true,
          content: '/* eslint-disable */',
          schema: 'zod',
          notAllowEmptyString: true,
          scalarSchemas: {
            Domain: 'z.string()',
            DateTime: 'z.date()',
            RichTextAST: 'z.object.json()',
          },
        },
      },
    },
  })

  const result = transformFileSync(targetTs, {
    module: { type: 'commonjs' },
    env: { targets: { node: '16' } },
  })

  writeFileSync(targetJs, result.code)
}
