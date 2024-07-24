import {
  BatchMigrationCreateEnumerableFieldInput,
  BatchMigrationCreateEnumerationInput,
  BatchMigrationCreateModelInput,
  BatchMigrationCreateSimpleFieldInput,
  SimpleFieldType,
  VisibilityTypes,
} from '@hygraph/management-sdk'
import { migrationActionFactory } from '../migrationActionFactory'
import { MigrationFunction } from '../types'

export const graphcommerce8to9: MigrationFunction = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client)

  // Removes the deprecated 'Row' field which was deprecated in GC@7.1
  // const hasRow = schema.models
  //   .find((m) => m.apiId === 'DynamicRow')
  //   ?.fields.some((f) => f.apiId === 'row')

  // if (hasRow) {
  //   migrationAction(schema, 'simpleField', 'delete', {
  //     apiId: 'row',
  //     parentApiId: 'DynamicRow',
  //   })
  // }

  const hasRowCategory = schema.models.some((m) => m.apiId === 'RowCategory')

  //
  if (!hasRowCategory) {
    migrationAction(schema, 'model', 'create', {
      apiId: 'RowCategory',
      displayName: 'Row Category',
      apiIdPlural: 'RowProductLists',
      description: 'A model that displays a category',
    } satisfies BatchMigrationCreateModelInput)

    migrationAction(
      schema,
      'simpleField',
      'create',
      {
        position: 1,
        type: SimpleFieldType.String,
        formConfig: { renderer: 'GCMS_SLUG', config: { isLowercase: true } },
        validations: {
          String: {
            matches: {
              regex: '^[a-z0-9]+(?:[-/][a-z0-9]+)*$',
              errorMessage: 'The category URL must be a valid slug',
            },
          },
        },
        parentApiId: 'RowCategory',
        displayName: 'Category URL',
        apiId: 'categoryUrl',
        description: 'The URL of the category, may include slashes',
        isTitle: true,
        isLocalized: true,
        isRequired: true,
        visibility: VisibilityTypes.ReadWrite,
      } satisfies BatchMigrationCreateSimpleFieldInput,
      'RowCategory',
      'model',
    )

    migrationAction(schema, 'enumeration', 'create', {
      displayName: 'Row Category Variant',
      apiId: 'RowCategoryVariant',
      values: [
        { displayName: 'Backstory', apiId: 'Backstory' },
        { displayName: 'Grid', apiId: 'Grid' },
        { displayName: 'Swipeable', apiId: 'Swipeable' },
      ],
    } satisfies BatchMigrationCreateEnumerationInput)

    migrationAction(
      schema,
      'enumerableField',
      'create',
      {
        displayName: 'Variant',
        apiId: 'variant',
        parentApiId: 'RowCategory',
        enumerationApiId: 'RowCategoryVariant',
        description: 'As what variant wil the RowCategory be displayed',
        isRequired: true,
      } satisfies BatchMigrationCreateEnumerableFieldInput,
      'RowCategory',
      'model',
    )
  }

  return client.run(true)
}
