import { VisibilityTypes } from '@hygraph/management-sdk'
import { migrationActionFactory } from '../migrationActionFactory'
import type { MigrationFunction } from '../types'

export const graphcommerce7to8: MigrationFunction = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client)

  const hasRow = schema.models
    .find((m) => m.apiId === 'DynamicRow')
    ?.fields.some((f) => f.apiId === 'row')

  if (hasRow) {
    migrationAction(schema, 'unionField', 'update', {
      apiId: 'row',
      displayName: 'Row Deprecated',
      parentApiId: 'DynamicRow',
      description: 'This field is deprecated. Use Rows instead.',
    })
  }

  migrationAction(
    schema,
    'unionField',
    'create',
    {
      displayName: 'Rows',
      apiId: 'rows',
      isList: true,
      reverseField: {
        modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
        apiId: 'dynamicRows',
        displayName: 'Dynamic Rows',
        visibility: VisibilityTypes.Hidden,
        isList: true,
      },
      parentApiId: 'DynamicRow',
    },
    'DynamicRow',
    'model',
  )

  migrationAction(
    schema,
    'componentUnionField',
    'create',
    {
      displayName: 'Conditions',
      apiId: 'conditions',
      parentApiId: 'ConditionOr',
      componentApiIds: ['ConditionText', 'ConditionNumber'],
      isList: true,
    },
    'ConditionOr',
    'component',
  )

  return client.run(true)
}
