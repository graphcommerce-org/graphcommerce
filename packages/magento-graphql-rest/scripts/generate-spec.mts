import yaml from 'js-yaml'
import { writeFile, readFile } from 'node:fs/promises'
import type { OpenAPIV3 } from 'openapi-types'
import prettier from 'prettier'
import conf from '@graphcommerce/prettier-config-pwa'

function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  return typeof value === 'object' && '$ref' in value
}

const response = await readFile('./scripts/m2rest-admin.json')

const openApiSchema = JSON.parse(response.toString()) as OpenAPIV3.Document

const newSchema: OpenAPIV3.Document = {
  ...openApiSchema,
  components: {
    ...openApiSchema.components,
    schemas: Object.fromEntries(
      Object.entries(openApiSchema.components?.schemas ?? {}).map(([schemaKey, schema]) => {
        if (isRef(schema)) return [schemaKey, schema]

        return [
          schemaKey,
          {
            ...schema,
            default: undefined,
            properties: schema.properties
              ? Object.fromEntries(
                  Object.entries(schema.properties).map(([propertyKey, property]) => {
                    if (isRef(property)) return [propertyKey, property]
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
        .filter(([path, pathItem]) => {
          if (!pathItem) return
          if (path === '/V1/customers/me') return true
          return false
        })
        .map(([path, pathItem]) => {
          if (!pathItem) return [path, pathItem]
          const newValue = pathItem

          const removeMethod = [
            'post',
            // 'get',
            'put',
            'delete',
            'patch',
            'options',
          ] as const

          removeMethod.forEach((method) => {
            newValue[method] = undefined
          })

          return [path, newValue]
        }),
    ),
  },
}

await writeFile(
  './m2-filtered-spec.json',
  await prettier.format(JSON.stringify(newSchema), {
    parser: 'json',
    ...conf,
  }),
)
