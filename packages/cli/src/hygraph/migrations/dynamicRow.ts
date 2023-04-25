import { loadConfig } from '@graphcommerce/next-config'
import { Client, SimpleFieldType, VisibilityTypes } from '@hygraph/management-sdk'

export const dynamicRow = async (name: string | undefined) => {
  const config = loadConfig(process.cwd())

  if (!config.hygraphEndpoint) {
    throw new Error('Migration unsuccesful: hygraphEndpoint not found in config')
  }
  if (!config.hygraphAuthToken) {
    throw new Error('Migration unsuccesful: hygraphAuthToken not found in config')
  }

  const client = new Client({
    authToken: config.hygraphAuthToken,
    endpoint: config.hygraphEndpoint,
    name,
  })

  // ? ENUMERATIONS
  client.createEnumeration({
    displayName: 'Dynamic Row Condition Number Operator',
    apiId: 'DynamicRowConditionNumberOperator',
    values: [
      { displayName: 'Greater than or equal to', apiId: 'GTE' },
      { displayName: 'Less than or equal to', apiId: 'LTE' },
      { displayName: 'Equal to', apiId: 'EQUAL' },
    ],
  })

  client.createEnumeration({
    displayName: 'Dynamic Row Placement',
    apiId: 'DynamicRowPlacement',
    values: [
      { displayName: 'Before', apiId: 'BEFORE' },
      { displayName: 'After', apiId: 'AFTER' },
      { displayName: 'Replace', apiId: 'REPLACE' },
    ],
  })

  // ? COMPONENTS
  client.createComponent({
    displayName: 'Text',
    apiId: 'ConditionText',
    apiIdPlural: 'ConditionTexts',
  })

  client.createComponent({
    displayName: 'Number',
    apiId: 'ConditionNumber',
    apiIdPlural: 'ConditionNumbers',
  })

  client.createComponent({
    displayName: 'AND',
    apiId: 'ConditionAnd',
    apiIdPlural: 'ConditionAnds',
    description: 'All of these conditions must match',
  })

  client.createComponent({
    displayName: 'OR',
    apiId: 'ConditionOr',
    apiIdPlural: 'ConditionOrs',
    description: 'One of these conditions must match',
  })

  client.createComponentUnionField({
    displayName: 'Conditions',
    apiId: 'conditions',
    parentApiId: 'ConditionAnd',
    componentApiIds: ['ConditionOr', 'ConditionText', 'ConditionNumber'],
    isList: true,
  })

  client.createComponentUnionField({
    displayName: 'Conditions',
    apiId: 'conditions',
    parentApiId: 'ConditionOr',
    componentApiIds: ['ConditionText', 'ConditionNumber'],
    isList: true,
  })

  client.createSimpleField({
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
  })

  client.createSimpleField({
    displayName: 'Value',
    apiId: 'value',
    type: SimpleFieldType.String,
    parentApiId: 'ConditionText',
    isRequired: true,
  })

  client.createSimpleField({
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
  })

  client.createEnumerableField({
    displayName: 'Operator',
    apiId: 'operator',
    parentApiId: 'ConditionNumber',
    enumerationApiId: 'DynamicRowConditionNumberOperator',
    isRequired: true,
  })

  client.createSimpleField({
    displayName: 'Value',
    apiId: 'value',
    type: SimpleFieldType.Float,
    parentApiId: 'ConditionNumber',
    isRequired: true,
  })

  // ? MODEL
  client.createModel({
    apiId: 'DynamicRow',
    apiIdPlural: 'DynamicRows',
    displayName: 'Dynamic Row',
    description:
      'Dynamic rows allow you to add specific Row models to pages based on the properties of the page',
  })

  client.createSimpleField({
    displayName: 'Internal name',
    apiId: 'internalName',
    description: 'Only used for internal reference',
    type: SimpleFieldType.String,
    isTitle: true,
    isRequired: true,
    isUnique: true,
    modelApiId: 'DynamicRow',
  })

  client.createUnionField({
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
  })

  client.createEnumerableField({
    displayName: 'Placement',
    apiId: 'placement',
    parentApiId: 'DynamicRow',
    enumerationApiId: 'DynamicRowPlacement',
    description: 'Where will the row be placed relative to the target',
    isRequired: true,
  })

  client.createUnionField({
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
  })

  client.createComponentUnionField({
    displayName: 'Conditions (OR)',
    apiId: 'conditions',
    parentApiId: 'DynamicRow',
    description: 'One of these conditions must match',
    componentApiIds: ['ConditionAnd', 'ConditionText', 'ConditionNumber'],
    isList: true,
  })

  return client.run(true)
}
