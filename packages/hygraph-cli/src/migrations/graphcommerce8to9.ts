import { migrationAction, client } from '../migrationAction'
import { Schema } from '../types'

export const graphcommerce8to9 = async (schema: Schema) => {
  if (!client) {
    return 0
  }

  // This migration is for GC 8.0 and is not yet exported as a usable migration.

  // Removes the deprecated 'Row' field which was deprecated in GC@7.1
  const hasRow = schema.models
    .find((m) => m.apiId === 'DynamicRow')
    ?.fields.some((f) => f.apiId === 'row')

  if (hasRow) {
    migrationAction(schema, 'simpleField', 'delete', {
      apiId: 'row',
      parentApiId: 'DynamicRow',
    })
  }

  return client.run(true)
}
