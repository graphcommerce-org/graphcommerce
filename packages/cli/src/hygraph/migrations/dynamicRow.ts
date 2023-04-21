import {
  Client,
  RelationalFieldType,
  SimpleFieldType,
  VisibilityTypes,
} from '@hygraph/management-sdk'

export const dynamicRow = async (name: string | undefined) => {
  const client = new Client({
    authToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODIwNjQwNDcsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xncTlpMHR3MTFvZzAxdWg3YTZ3OGMyOS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZjU5MTczZGQtZTExOC00ODdiLWJjMDctMDcyNjZkZDU4Y2RlIiwianRpIjoiY2xnb3p3YzV0NzBiMzAxdWcwNzk5MGJ3dSJ9.qWKMOugu0UG28toPzS7rAuWCAZuFnvBhYPIadYTYBCTeE0S463st2UAMQ3LqoppHRElf3rFOkXQD4__OJBQj0a1nSxEQet0k8xkj47B2HJnIFrI348GYuSkKDOtJtmAr2LwV26Mz5wY6UbnOgK6SQCLEoImtw7I_2bVZQdQWX6pILDz4kAfjiZKYu1YJafk08oA-43x_mEwzqgZ8Mdcpx84EIrGRP68ZuN5XDIu5RtwrN21VrrJvxRxBw_AWODfTJDVdefjoHbre_1-IM8eUs7Th9--EXVapYv1fyXrpE4_cZlny8erHxJ4ULz3Df2TVPCL_h4v_gnYSLaGvOMbWJchPyoyViTnrhE5DUfhf07z4Uh6fjFpRz4DSkSNvHeiPuIzDj7H4zyUKAtENJR_NTQYiBi-kBIAM3ZgF9cNpF7krO8Ov9iLP3m785-d2TuzC3cVoHvLMz8MHkZYPq7d2wSs1dTCHRJyP1k4nh0uRWu4_lEmGfaXTSCEJqdOF0Isa5cZwHdQdXBpMJ6NUy1r_3ZEKExvpfPrTZIF7ONub4mkDpX5McdTAq5PCLCuEDIICzSM0iTbdB-GT6DSH-ib5piVN897YzyHvRSDBd7-wie0Ldtqxpk88Cgrk-T3pFB6HKYxHcMOLXpLCYbsdQ5liG5fSmR9FgJSY69KCBMYAraU',
    endpoint:
      'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgq9i0tw11og01uh7a6w8c29/master',
    name,
  })

  // ? DEV purposes cleanup
  client.deleteModel({
    apiId: 'TestDynamicRow',
  })

  client.deleteField({
    apiId: 'conditions',
    parentApiId: 'TestConditionAnd',
  })

  client.deleteField({
    apiId: 'conditions',
    parentApiId: 'TestConditionOr',
  })

  client.deleteComponent({
    apiId: 'TestConditionText',
  })

  client.deleteComponent({
    apiId: 'TestConditionAnd',
  })

  client.deleteComponent({
    apiId: 'TestConditionOr',
  })

  client.deleteComponent({
    apiId: 'TestConditionNumber',
  })

  client.deleteEnumeration({
    apiId: 'TestDynamicRowConditionNumberOperator',
  })

  client.deleteEnumeration({
    apiId: 'TestDynamicRowPlacementTarget',
  })

  // ? MODEL

  // * CORRECT (5)
  client.createModel({
    apiId: 'TestDynamicRow',
    apiIdPlural: 'TestDynamicRows',
    displayName: 'Test Dynamic Row',
    description:
      'Dynamic rows allow you to add specific Row models to pages based on the properties of the page',
  })

  // ? ENMERATIONS
  client.createEnumeration({
    displayName: 'Test Dynamic Row Condition Number Operator',
    apiId: 'TestDynamicRowConditionNumberOperator',
    values: [
      {
        displayName: 'Greater than or equal to',
        apiId: 'GTE',
      },
      {
        displayName: 'Less than or equal to',
        apiId: 'LTE',
      },
      {
        displayName: 'Equal to',
        apiId: 'EQUAL',
      },
    ],
  })

  client.createEnumeration({
    displayName: 'Test Dynamic Row Placement Target',
    apiId: 'TestDynamicRowPlacementTarget',
    values: [
      {
        displayName: 'Before',
        apiId: 'BEFORE',
      },
      {
        displayName: 'After',
        apiId: 'AFTER',
      },
      {
        displayName: 'Replace',
        apiId: 'REPLACE',
      },
    ],
  })

  // ? MODEL FIELDS
  // * CORRECT 1/5
  client.createSimpleField({
    displayName: 'Internal name',
    apiId: 'internalName',
    description: 'Only used for internal reference',
    type: SimpleFieldType.String,
    // parentApiId: 'TestDynamicRow',
    isTitle: true,
    isRequired: true,
    isUnique: true,
    modelApiId: 'TestDynamicRow',
  })

  // * CORRECT 2/5
  client.createUnionField({
    displayName: 'Row',
    apiId: 'row',
    reverseField: {
      modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne', 'RowColumnTwo', 'RowColumnThree'],
      apiId: 'testDynamicRows', // remove test and make camelCase
      displayName: 'testDynamicRows',
      visibility: VisibilityTypes.Hidden,
      isList: true,
    },
    parentApiId: 'TestDynamicRow',
  })

  // * CORRECT 3/5
  client.createEnumerableField({
    displayName: 'Placement',
    apiId: 'placement',
    parentApiId: 'TestDynamicRow',
    enumerationApiId: 'TestDynamicRowPlacementTarget',
    description: 'Where will the row be placed relative to the target',
    isRequired: true,
  })

  // * CORRECT 4/5
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
      apiId: 'testDynamicRowsTarget', // remove test and make camelCase
      displayName: 'testDynamicRowsTarget',
      visibility: VisibilityTypes.Hidden,
      isList: true,
    },
    parentApiId: 'TestDynamicRow',
  })

  // ? INCOMPLETE 5/5

  // ? COMPONENTS

  // * TEXT (2)
  client.createComponent({
    displayName: 'TestText',
    apiId: 'TestConditionText',
    apiIdPlural: 'TestConditionTexts',
  })

  // * INCORRECT NUMBER (?) ( ADD ENUMARATION AND VALUE )
  client.createComponent({
    displayName: 'TestNumber',
    apiId: 'TestConditionNumber',
    apiIdPlural: 'TestConditionNumbers',
  })

  // * CORRECT AND (?)
  client.createComponent({
    displayName: 'TestAND',
    apiId: 'TestConditionAnd',
    apiIdPlural: 'TestConditionAnds',
    description: 'All of these conditions must match',
  })

  //* CORRECT OR (?)
  client.createComponent({
    displayName: 'TestOR',
    apiId: 'TestConditionOr',
    apiIdPlural: 'TestConditionOrs',
    description: 'One of these conditions must match',
  })

  client.createComponentUnionField({
    displayName: 'Conditions',
    apiId: 'conditions',
    parentApiId: 'TestConditionAnd',
    componentApiIds: ['TestConditionOr', 'TestConditionText', 'TestConditionNumber'],
    isList: true,
  })

  client.createComponentUnionField({
    displayName: 'Conditions',
    apiId: 'conditions',
    parentApiId: 'TestConditionOr',
    componentApiIds: ['TestConditionText', 'TestConditionNumber'],
    isList: true,
  })

  client.createSimpleField({
    displayName: 'Property',
    apiId: 'property',
    type: SimpleFieldType.String,
    parentApiId: 'TestConditionText',
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
    parentApiId: 'TestConditionText',
    isRequired: true,
  })

  client.createSimpleField({
    displayName: 'Property',
    apiId: 'property',
    type: SimpleFieldType.String,
    parentApiId: 'TestConditionNumber',
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
    displayName: 'TestOperator',
    apiId: 'testOperator',
    parentApiId: 'TestConditionNumber',
    enumerationApiId: 'TestDynamicRowConditionNumberOperator',
    isRequired: true,
  })

  client.createSimpleField({
    displayName: 'Value',
    apiId: 'value',
    type: SimpleFieldType.Float,
    parentApiId: 'TestConditionNumber',
    isRequired: true,
  })

  client.createComponentUnionField({
    displayName: 'Conditions (OR)',
    apiId: 'conditions',
    parentApiId: 'TestDynamicRow',
    description: 'One of these conditions must match',
    componentApiIds: ['TestConditionAnd', 'TestConditionText', 'TestConditionNumber'],
    isList: true,
  })

  const changes = client.dryRun()
  console.log(changes)
  return client.run(true)
}
