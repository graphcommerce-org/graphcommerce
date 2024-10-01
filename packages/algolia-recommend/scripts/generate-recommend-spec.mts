import yaml from 'js-yaml'
import { writeFile, readFile } from 'node:fs/promises'
import { OpenAPIV3 } from 'openapi-types'
import prettier from 'prettier'
import conf from '@graphcommerce/prettier-config-pwa'
import { algoliaSchemaBaseFilter } from '@graphcommerce/algolia-mesh/scripts/base-schema-filter.mjs'

const response = await fetch(
  'https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/bundled/recommend.yml',
)

const openApiSchema = yaml.load(await response.text()) as OpenAPIV3.Document

const allMethods = [
  OpenAPIV3.HttpMethods.TRACE,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.DELETE,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.OPTIONS,
  OpenAPIV3.HttpMethods.HEAD,
]

const { info, openapi, components, tags, ...rest } = openApiSchema

function filterPaths(
  paths: OpenAPIV3.PathsObject,
  allow: Record<string, OpenAPIV3.HttpMethods[]>,
): OpenAPIV3.PathsObject {
  const allowedEntries = Object.entries(allow)

  return Object.fromEntries(
    Object.entries(paths)
      .map(([path, pathItem]) => {
        if (!pathItem) return [path, pathItem]
        const newValue = pathItem

        const [allowedPath, allowedMethods] =
          allowedEntries.find(([allowedPath]) => allowedPath === path) ?? []

        if (!allowedPath || !allowedMethods) return [path, undefined]

        allMethods
          .filter((method) => !allowedMethods.includes(method))
          .forEach((method) => {
            newValue[method] = undefined
          })

        return [path, newValue]
      })
      .filter(([path, pathItem]) => {
        if (!pathItem) return false
        if (allMethods.every((key) => !pathItem[key])) return false
        return true
      }),
  )
}

function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  return typeof value === 'object' && '$ref' in value
}

const newSchema: OpenAPIV3.Document = {
  openapi,
  info,
  paths: filterPaths(openApiSchema.paths, {
    '/1/indexes/*/recommendations': [OpenAPIV3.HttpMethods.POST],
  }),
  components: {
    ...openApiSchema.components,
    schemas: Object.fromEntries(
      Object.entries(openApiSchema.components?.schemas ?? {}).map(
        ([incomingKey, incomingSchema]) => {
          const [schemaKey, schema] = algoliaSchemaBaseFilter(incomingKey, incomingSchema)
          if (isRef(schema)) return [schemaKey, schema]

          // Some object have an addition type 'object' which removes all types of the object, we only add known properties here.
          const ref = schema.allOf?.find((item) => isRef(item))
          const obj = schema.allOf?.find((item) => !isRef(item) && item.type === 'object')
          if (ref && obj) {
            return [schemaKey, { ...schema, allOf: [ref satisfies OpenAPIV3.ReferenceObject] }]
          }

          if (schemaKey === 'recommendedForYouQuery') {
            return [
              schemaKey,
              {
                ...schema,
                oneOf: schema.oneOf?.filter(
                  (item) =>
                    !isRef(item) || item.$ref !== '#/components/schemas/recommendedForYouQuery',
                ),
              },
            ]
          }

          if (schemaKey === 'fallbackParams') {
            return [schemaKey, undefined]
          }

          return [
            schemaKey,
            {
              ...schema,
              properties: schema.properties
                ? {
                    ...schema.properties,
                    ...(schema?.properties?.fallbackParameters
                      ? { fallbackParameters: { $ref: '#/components/schemas/searchParamsObject' } }
                      : {}),
                    ...(schema?.properties?.queryParameters
                      ? { queryParameters: { $ref: '#/components/schemas/searchParamsObject' } }
                      : {}),
                  }
                : undefined,
            },
          ]
        },
      ),
    ),
  },
}

await writeFile(
  './algolia-recommend-spec.yaml',
  await prettier.format(yaml.dump(newSchema), {
    parser: 'yaml',
    ...conf,
  }),
)
