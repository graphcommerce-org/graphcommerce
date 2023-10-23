import { ProductProperty } from '../types'

export function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString) // Try to parse the string as JSON
    return true // If it succeeds, then it's valid JSON
  } catch (error) {
    return false // If parsing throws an error, it's invalid JSON
  }
}

export const findProperties = (
  obj: Record<string, any>,
  path = '',
  inputs: ProductProperty[] = [],
  parent = '',
): ProductProperty[] => {
  for (const [key, value] of Object.entries(obj)) {
    /** Keep count of the current path and parent */
    const currentPath: string = path ? `${path}.${key}` : key
    const currentParent: string = parent ? `${parent}/` : ''

    /**
     * If the value is a string, number or boolean, add it to the inputs array. If the value is an
     * array, recurse on the first item. If the value is an object, recurse on all it's keys.
     */
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      inputs.push({
        label: `${key} ${currentParent ? `| ${currentParent}` : ''}`,
        id: currentPath,
      })
    } else if (Array.isArray(value) && value.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      findProperties(value[0], `${currentPath}[0]`, inputs, `${currentParent}${key}`)
    } else if (typeof value === 'object' && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      findProperties(value, currentPath, inputs, `${currentParent}${key}`)
    }
  }
  return inputs
}

export const createRecursiveIntrospectionQuery = (type, depth) => {
  let baseQuery = `__type(name: "${type}") { name kind fields { name `
  let endQuery = ' } }'

  for (let i = 0; i < depth; i++) {
    baseQuery += 'type { ofType { fields { name '

    endQuery += ' } } }'
  }

  const result = baseQuery + endQuery

  console.log(85, baseQuery + endQuery)
  return result
}
