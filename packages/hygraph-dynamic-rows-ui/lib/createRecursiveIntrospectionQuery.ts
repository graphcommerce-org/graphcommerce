export const createRecursiveIntrospectionQuery = (type: string, depth: number) => {
  let baseQuery = `__type(name: "${type}") { name fields { name `
  let endQuery = ' } }'

  for (let i = 0; i < depth; i++) {
    baseQuery += 'type { name ofType { name fields { name isDeprecated '
    endQuery += ' } } }'
  }

  const result = baseQuery + endQuery

  return result
}
