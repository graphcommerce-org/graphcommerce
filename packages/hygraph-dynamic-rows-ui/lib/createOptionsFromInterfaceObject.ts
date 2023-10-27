import { ProductProperty, ObjectType } from '../types'

export const createOptionsFromInterfaceObject = (
  obj: ObjectType,
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
        label: currentPath,
        id: currentPath,
      })
    } else if (Array.isArray(value) && value.length > 0) {
      createOptionsFromInterfaceObject(
        value[0] as ObjectType,
        `${currentPath}[0]`,
        inputs,
        `${currentParent}${key}`,
      )
    } else if (typeof value === 'object' && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      createOptionsFromInterfaceObject(
        value as ObjectType,
        currentPath,
        inputs,
        `${currentParent}${key}`,
      )
    }
  }

  return inputs
}
