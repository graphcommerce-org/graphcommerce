import type { OpenAPIV3 } from 'openapi-types'

function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  return typeof value === 'object' && '$ref' in value
}

export function algoliaSchemaBaseFilter(
  schemaKey: string,
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): [string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject] {
  if (isRef(schema)) return [schemaKey, schema]

  if (
    schema.oneOf &&
    schema.oneOf[0]?.['$ref'] === '#/components/schemas/searchParamsString' &&
    schema.oneOf[1]?.['$ref'] === '#/components/schemas/searchParamsObject'
  ) {
    return [schemaKey, { $ref: '#/components/schemas/searchParamsObject' }]
  }

  if (schemaKey === 'searchParamsObject') {
    return [
      schemaKey,
      {
        ...schema,
        allOf: schema.allOf?.filter(
          (item) =>
            !isRef(item) || item.$ref !== '#/components/schemas/indexSettingsAsSearchParams',
        ),
      },
    ]
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
}
