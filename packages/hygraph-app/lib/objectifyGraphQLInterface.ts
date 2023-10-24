import { InterfaceObject } from '../types'

const objectifyGraphQLInterfaceLayer = (fields: InterfaceObject) => {
  let layer
  const numberTypes = ['Float', 'Int']

  for (const [, value] of Object.entries(fields)) {
    const layeredFields = value?.type?.ofType?.fields
    const typeValue = numberTypes.includes(value?.type?.name as string) ? 'number' : 'string'

    layer = {
      ...layer,
      [value?.name]: layeredFields
        ? objectifyGraphQLInterfaceLayer(layeredFields as InterfaceObject)
        : typeValue,
    }
  }

  return layer
}

/**
 * In this function we create an object from the GraphQL interface.
 * We need this so we can map out the properties of an interface that is needed
 * for the Dynamic Rows Autocomplete.
 * @param obj - The GraphQL interface object that is read from the schema.
 * @returns
 */
export const objectifyGraphQLInterface = (obj: InterfaceObject) => {
  let objectifiedInterface: { [s: string]: unknown } = {}
  const numberTypes = ['Float', 'Int']

  for (const [, value] of Object.entries(obj)) {
    const fields = value?.type?.ofType?.fields
    const typeValue = numberTypes.includes(value?.type?.name as string) ? 'number' : 'string'

    objectifiedInterface = {
      ...objectifiedInterface,
      [value?.name]: fields ? objectifyGraphQLInterfaceLayer(fields as InterfaceObject) : typeValue,
    }
  }
  return objectifiedInterface
}
