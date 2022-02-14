/** The GraphQL API will return fields as null if they are not required. */
export type ObjectNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

/** Typescript will return null for fields */
export function removeNull<T extends Record<string, unknown>>(object: T): ObjectNonNullable<T> {
  // eslint-disable-next-line no-restricted-syntax

  const myobj = { ...object } as ObjectNonNullable<T>
  Object.keys(myobj).forEach((key: keyof T) => {
    if (myobj[key] === null) myobj[key] = undefined as NonNullable<T[keyof T]>
  })

  return myobj
}
