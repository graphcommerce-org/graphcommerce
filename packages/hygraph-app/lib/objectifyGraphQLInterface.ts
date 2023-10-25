import { InterfaceObject } from '../types'

const numberTypes = ['Float', 'Int']

const objectifyGraphQLInterfaceLayer = (
  fields: InterfaceObject,
  conditionType: 'text' | 'number' | 'all',
) => {
  let layer

  for (const [, value] of Object.entries(fields)) {
    const layeredFields = value?.type?.ofType?.fields
    const typeName = value?.type?.name
    const typeValue = numberTypes.includes(typeName as string) ? 'number' : 'text'

    if (layeredFields) {
      layer = {
        ...layer,
        [value?.name]: objectifyGraphQLInterfaceLayer(
          layeredFields as InterfaceObject,
          conditionType,
        ),
      }
    } else if (typeName && conditionType === 'all') {
      layer = {
        ...layer,
        [value?.name]: typeValue,
      }
    } else if (conditionType === typeValue) {
      layer = {
        ...layer,
        [value?.name]: typeValue,
      }
    } else if (conditionType !== typeValue) {
      layer = {
        ...layer,
      }
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
export const objectifyGraphQLInterface = (
  obj: InterfaceObject,
  conditionType: 'text' | 'number' | 'all',
) => {
  let objectifiedInterface: { [s: string]: unknown } = {}

  for (const [, value] of Object.entries(obj)) {
    const fields = value?.type?.ofType?.fields
    const typeName = value?.type?.name
    const typeValue = numberTypes.includes(typeName as string) ? 'number' : 'text'

    if (fields) {
      objectifiedInterface = {
        ...objectifiedInterface,
        [value?.name]: objectifyGraphQLInterfaceLayer(fields as InterfaceObject, conditionType),
      }
    } else if (typeName && conditionType === 'all') {
      objectifiedInterface = {
        ...objectifiedInterface,
        [value?.name]: typeValue,
      }
    } else if (conditionType === typeValue) {
      objectifiedInterface = {
        ...objectifiedInterface,
        [value?.name]: typeValue,
      }
    } else if (conditionType !== typeValue) {
      objectifiedInterface = {
        ...objectifiedInterface,
      }
    }
  }

  return objectifiedInterface
}
