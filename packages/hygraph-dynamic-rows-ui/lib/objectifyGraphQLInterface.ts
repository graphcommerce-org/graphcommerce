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
  skip: string[],
): ObjectType => {
  let objectifiedInterface

  for (const [, value] of Object.entries(fields)) {
    const nestedFields = value?.type?.ofType?.fields
    const { isDeprecated } = value
    const typeOf = value?.type?.name
    const typeName = value?.type?.ofType?.name ?? ''

    /**
     * With typevalue we can know of which type a property is, so we for example can determine to to hide string values in ConditionNumbers.
     */
    let typeValue: 'number' | 'text' | 'boolean'
    switch (typeOf) {
      case 'Float' || 'Int':
        typeValue = 'number'
        break
      case 'Boolean':
        typeValue = 'text' // Seperate booleans are not supported yet.
        break
      default:
        typeValue = 'text'
        break
    }

    if (skip.includes(typeName) || isDeprecated) {
      // do nothing
    } else if (nestedFields) {
      objectifiedInterface = {
        ...objectifiedInterface,
        [value?.name]: objectifyGraphQLInterface(nestedFields, conditionType, [...skip, typeName]),
      }
    } else if (typeOf && conditionType === 'all') {
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
      // do nothing
    }
  }

  return objectifiedInterface
}
