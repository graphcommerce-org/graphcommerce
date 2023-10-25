import { ObjectType, __Field } from '../types'

/**
 * In this function we create an object from the GraphQL interface.
 * We need this so we can map out the properties of an interface that is needed
 * for the Dynamic Rows Autocomplete.
 * @param fields - The GraphQL interface object that is read from the schema.
 * @returns
 */
export const objectifyGraphQLInterface = (
  fields: __Field[],
  conditionType: 'text' | 'number' | 'all',
): ObjectType => {
  let objectifiedInterface
  const numberTypes = ['Float', 'Int']

  for (const [, value] of Object.entries(fields)) {
    const nestedFields = value?.type?.ofType?.fields
    const typeName = value?.type?.name ?? 'string'
    const typeValue = numberTypes.includes(typeName) ? 'number' : 'text'

    if (nestedFields) {
      objectifiedInterface = {
        ...objectifiedInterface,
        [value?.name]: objectifyGraphQLInterface(nestedFields, conditionType),
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
