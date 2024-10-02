import yaml from 'js-yaml'
import { writeFile } from 'node:fs/promises'
import type { OpenAPIV3 } from 'openapi-types'
import prettier from 'prettier'
import conf from '@graphcommerce/prettier-config-pwa'
import { algoliaSchemaBaseFilter } from './base-schema-filter.mjs'

const response = await fetch(
  'https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/bundled/search.yml',
)

const openApiSchema = yaml.load(await response.text()) as OpenAPIV3.Document

const acl = ['search']

const newSchema: OpenAPIV3.Document = {
  ...openApiSchema,
  components: {
    ...openApiSchema.components,
    schemas: Object.fromEntries(
      Object.entries(openApiSchema.components?.schemas ?? {}).map(([schemaKey, schema]) => {
        return algoliaSchemaBaseFilter(schemaKey, schema)
      }),
    ),
  },
  paths: {
    ...Object.fromEntries(
      Object.entries(openApiSchema.paths)
        .map(([path, pathItem]) => {
          if (!pathItem) return [path, pathItem]
          const newValue = pathItem

          const keys = ['post', 'get', 'put', 'delete', 'patch', 'options'] as const

          keys.forEach((method) => {
            if (!newValue[method]?.['x-acl']?.some((value: string) => acl.includes(value))) {
              newValue[method] = undefined
            }
          })

          return [path, pathItem]
        })
        .filter(([path, pathItem]) => {
          if (!pathItem) return

          // Remove the search endpoint + remove the getObjects endpoint.
          if (
            path === '/1/indexes/*/queries' ||
            path === '/1/indexes/*/objects' ||
            path === '/1/indexes/{indexName}/{objectID}'
          )
            return false

          const keys = ['post', 'get', 'put', 'delete', 'patch', 'options'] as const
          if (keys.every((key) => !pathItem[key])) return false

          return true
        }),
    ),
  },
}

await writeFile(
  './algolia-spec.yaml',
  await prettier.format(yaml.dump(newSchema), {
    parser: 'yaml',
    ...conf,
  }),
)
