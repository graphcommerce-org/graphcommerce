import { migrationAction, client } from '../migrationAction'
import { Schema } from '../types'

export const graphcommerce7to7_1 = async (schema: Schema) => {
  if (!client) {
    return 0
  }

  migrationAction(schema, 'enumeration', 'update', {
    apiId: 'RowProductVariants',
    valuesToCreate: [{ apiId: 'Recent', displayName: 'Recent' }],
  })

  return client.run(true)
}
