import { VisibilityTypes } from '@hygraph/management-sdk'
import { migrationAction, client } from '../migrationAction'
import { Schema } from '../types'

export const graphcommerce7to7_1 = async (schema: Schema) => {
  if (!client) {
    return 0
  }

  /**
   * Running this migration will cause a loss in entries for the 'row' field in the DynamicRow model.
   * The field is replaced by Rows. Row will be deprecated so Graphcommerce 7.0 will still keep running.
   **/

  const hasRow = schema.models
    .find((m) => m.apiId === 'DynamicRow')
    ?.fields.some((f) => f.apiId === 'row')

  if (hasRow) {
    migrationAction(schema, 'simpleField', 'delete', {
      apiId: 'row',
      parentApiId: 'DynamicRow',
    })

    migrationAction(schema, 'unionField', 'create', {
      apiId: 'row',
      displayName: 'Row Deprecated',
      parentApiId: 'DynamicRow',
      description: 'This field is deprecated. Use Rows instead.',
      visibility: VisibilityTypes.Hidden,
      reverseField: {
        modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
        apiId: 'dynamicRowDeprecated',
        displayName: 'DynamicRows Deprecated',
        description: 'This field is deprecated. Use Dynamic Rows instead.',
        visibility: VisibilityTypes.Hidden,
        isList: true,
      },
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
        apiId: 'dynamicRow',
        displayName: 'Dynamic Rows',
        visibility: VisibilityTypes.Hidden,
        isList: true,
      },
      parentApiId: 'DynamicRow',
    },
    'DynamicRow',
    'model',
  )

  return client.run(true)
}
