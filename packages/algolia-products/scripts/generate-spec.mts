import yaml from 'js-yaml'
import { writeFile } from 'node:fs/promises'
import type { OpenAPIV3 } from 'openapi-types'
import prettier from 'prettier'
import conf from '@graphcommerce/prettier-config-pwa'

function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  return typeof value === 'object' && '$ref' in value
}

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
        if (isRef(schema)) return [schemaKey, schema]

        if (
          schema.oneOf &&
          schema.oneOf[0]?.['$ref'] === '#/components/schemas/searchParamsString' &&
          schema.oneOf[1]?.['$ref'] === '#/components/schemas/searchParamsObject'
        ) {
          return [schemaKey, { $ref: '#/components/schemas/searchParamsObject' }]
        }

        if (schemaKey === 'facetFilters') {
          return [schemaKey, { ...schema, example: undefined, oneOf: undefined, type: 'object' }]
        }

        return [
          schemaKey,
          {
            ...schema,
            default: undefined,
            properties: schema.properties
              ? Object.fromEntries(
                  Object.entries(schema.properties).map(([propertyKey, property]) => {
                    if (isRef(property)) return [propertyKey, property]

                    if (propertyKey === 'customNormalization' || propertyKey === 'facets') {
                      return [propertyKey, { ...property, example: undefined }]
                    }

                    return [propertyKey, { ...property, default: undefined }]
                  }),
                )
              : undefined,
          },
        ]
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
