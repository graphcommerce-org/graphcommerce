import type { IntrospectionField, IntrospectionOutputTypeRef, IntrospectionSchema } from 'graphql'

function getType(type: IntrospectionOutputTypeRef) {
  switch (type.kind) {
    case 'NON_NULL':
    case 'LIST':
      return getType(type.ofType)
    default:
      return type
  }
}

class FieldPath {
  constructor(
    public field: IntrospectionField,
    private prev: FieldPath | undefined,
  ) {}

  stringify(filter?: string[]): string | undefined {
    if (this.field.type.kind === 'SCALAR' && filter && !filter.includes(this.field.type.name)) {
      return undefined
    }

    const prevStr = this.prev?.stringify(filter)
    return prevStr ? `${prevStr}.${this.field.name}` : this.field.name
  }

  depth = () => (this?.prev?.depth() ?? 0) + 1
}

export function getFieldPaths(
  schema: IntrospectionSchema,
  types: string[],
  prevPath: FieldPath | undefined = undefined,
): FieldPath[] {
  const typeName = types[types.length - 1]

  const paths: FieldPath[] = []
  const type = schema.types.find((t) => t.name === typeName)

  if (!type) return paths

  if ((prevPath?.depth() ?? 0) > 3) return paths

  if (type.kind === 'OBJECT' || type.kind === 'INTERFACE') {
    type.fields.forEach((field) => {
      const t = getType(field.type)

      if (!types.includes(t.name)) {
        const newTypes = [...types, t.name]

        const newPath = new FieldPath(field, prevPath)

        if (t.kind === 'OBJECT' || t.kind === 'INTERFACE') {
          paths.push(...getFieldPaths(schema, newTypes, newPath))
        } else if (t.kind === 'SCALAR' || t.kind === 'ENUM') {
          paths.push(newPath)
        } else if (t.kind === 'UNION') {
          // not supported currently
        }
      }
    })
  }

  return paths
}
