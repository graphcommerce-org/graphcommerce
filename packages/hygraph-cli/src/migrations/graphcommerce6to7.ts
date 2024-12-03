import { SimpleFieldType, VisibilityTypes } from '@hygraph/management-sdk'
import { migrationActionFactory } from '../migrationActionFactory'
import type { MigrationFunction } from '../types'

export const graphcommerce6to7: MigrationFunction = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client)

  // ? ENUMERATIONS
  migrationAction(schema, 'enumeration', 'create', {
    displayName: 'Row Column One Variants',
    apiId: 'RowColumnOneVariants',
    values: [
      { displayName: 'Default', apiId: 'Default' },
      { displayName: 'Message', apiId: 'Message' },
    ],
  })

  migrationAction(schema, 'enumeration', 'create', {
    displayName: 'Dynamic Row Condition Number Operator',
    apiId: 'DynamicRowConditionNumberOperator',
    values: [
      { displayName: 'Greater than or equal to', apiId: 'GTE' },
      { displayName: 'Less than or equal to', apiId: 'LTE' },
      { displayName: 'Equal to', apiId: 'EQUAL' },
    ],
  })

  migrationAction(schema, 'enumeration', 'create', {
    displayName: 'Dynamic Row Placement',
    apiId: 'DynamicRowPlacement',
    values: [
      { displayName: 'Before', apiId: 'BEFORE' },
      { displayName: 'After', apiId: 'AFTER' },
      { displayName: 'Replace', apiId: 'REPLACE' },
    ],
  })

  // ? COMPONENTS
  migrationAction(schema, 'component', 'create', {
    displayName: 'Text',
    apiId: 'ConditionText',
    apiIdPlural: 'ConditionTexts',
  })

  migrationAction(schema, 'component', 'create', {
    displayName: 'Number',
    apiId: 'ConditionNumber',
    apiIdPlural: 'ConditionNumbers',
  })

  migrationAction(schema, 'component', 'create', {
    displayName: 'AND',
    apiId: 'ConditionAnd',
    apiIdPlural: 'ConditionAnds',
    description: 'All of these conditions must match',
  })

  migrationAction(schema, 'component', 'create', {
    displayName: 'OR',
    apiId: 'ConditionOr',
    apiIdPlural: 'ConditionOrs',
    description: 'One of these conditions must match',
  })

  migrationAction(
    schema,
    'componentUnionField',
    'create',
    {
      displayName: 'Conditions',
      apiId: 'conditions',
      parentApiId: 'ConditionAnd',
      componentApiIds: ['ConditionOr', 'ConditionText', 'ConditionNumber'],
      isList: true,
    },
    'ConditionAnd',
    'component',
  )

  migrationAction(
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Property',
      apiId: 'property',
      type: SimpleFieldType.String,
      parentApiId: 'ConditionText',
      description:
        'Path to the value of the object being evaluated.\n\nFor products: url_key, category, sku',
      isRequired: true,
      validations: {
        String: {
          matches: {
            flags: ['i', 's'],
            regex: '^[a-z0-9-_.]+$',
            errorMessage: 'Only letters, numbers, dashes (-), underscores (_) or dots allowed (.)',
          },
        },
      },
    },
    'ConditionText',
    'component',
  )

  migrationAction(
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Value',
      apiId: 'value',
      type: SimpleFieldType.String,
      parentApiId: 'ConditionText',
      isRequired: true,
    },
    'ConditionText',
    'component',
  )

  migrationAction(
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Property',
      apiId: 'property',
      type: SimpleFieldType.String,
      parentApiId: 'ConditionNumber',
      isRequired: true,
      validations: {
        String: {
          matches: {
            flags: ['i', 's'],
            regex: '^[a-z0-9-_.]+$',
            errorMessage: 'Only letters, numbers, dashes (-), underscores (_) or dots allowed (.)',
          },
        },
      },
    },
    'ConditionNumber',
    'component',
  )

  migrationAction(
    schema,
    'enumerableField',
    'create',
    {
      displayName: 'Operator',
      apiId: 'operator',
      parentApiId: 'ConditionNumber',
      enumerationApiId: 'DynamicRowConditionNumberOperator',
      isRequired: true,
    },
    'ConditionNumber',
    'component',
  )

  migrationAction(
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Value',
      apiId: 'value',
      type: SimpleFieldType.Float,
      parentApiId: 'ConditionNumber',
      isRequired: true,
    },
    'ConditionNumber',
    'component',
  )

  // ? MODEL
  migrationAction(schema, 'model', 'create', {
    displayName: 'Dynamic Row',
    apiId: 'DynamicRow',
    apiIdPlural: 'DynamicRows',
    description:
      'Dynamic rows allow you to add specific Row models to pages based on the properties of the page',
  })

  migrationAction(
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Internal name',
      apiId: 'internalName',
      description: 'Only used for internal reference',
      type: SimpleFieldType.String,
      isTitle: true,
      isRequired: true,
      isUnique: true,
      modelApiId: 'DynamicRow',
    },
    'DynamicRow',
    'model',
  )

  migrationAction(
    schema,
    'unionField',
    'create',
    {
      displayName: 'Row',
      apiId: 'row',
      reverseField: {
        modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
        apiId: 'dynamicRow',
        displayName: 'DynamicRows',
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
    'enumerableField',
    'create',
    {
      displayName: 'Placement',
      apiId: 'placement',
      parentApiId: 'DynamicRow',
      enumerationApiId: 'DynamicRowPlacement',
      description: 'Where will the row be placed relative to the target',
      isRequired: true,
    },
    'DynamicRow',
    'model',
  )

  migrationAction(
    schema,
    'unionField',
    'create',
    {
      displayName: 'Placement target',
      apiId: 'target',
      description:
        'Optional: When the target is left blank it will place the Dynamic Row on the start or end.',
      reverseField: {
        modelApiIds: [
          'RowQuote',
          'RowLinks',
          'RowColumnOne',
          'RowColumnTwo',
          'RowColumnThree',
          'RowServiceOptions',
          'RowContentLinks',
          'RowButtonLinkList',
          'RowProduct',
          'RowSpecialBanner',
          'RowHeroBanner',
          'RowBlogContent',
        ],
        apiId: 'dynamicRowsTarget',
        displayName: 'DynamicRowsTarget',
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
      displayName: 'Conditions (OR)',
      apiId: 'conditions',
      parentApiId: 'DynamicRow',
      description: 'One of these conditions must match',
      componentApiIds: ['ConditionAnd', 'ConditionText', 'ConditionNumber'],
      isList: true,
    },
    'DynamicRow',
    'model',
  )

  // ? Row Column One
  migrationAction(
    schema,
    'enumerableField',
    'create',
    {
      displayName: 'Variant',
      apiId: 'rowColumnOneVariant',
      enumerationApiId: 'RowColumnOneVariants',
      parentApiId: 'RowColumnOne',
    },
    'RowColumnOne',
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
