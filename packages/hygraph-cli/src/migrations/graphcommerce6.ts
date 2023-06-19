import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { RelationalFieldType, SimpleFieldType, VisibilityTypes } from '@hygraph/management-sdk'
import { initClient } from '../client'
import { migrationAction } from '../functions'
import { Schema } from '../types'

export const GraphCommerce6 = async (
  name: string | undefined,
  config: GraphCommerceConfig,
  schema: Schema,
) => {
  const client = initClient(config, name)
  // DEV PURPOSES

  // END DEV PURPOSES

  // // ? ENUMERATIONS
  migrationAction(client, schema, 'enumeration', 'create', {
    displayName: 'Row Links Variants',
    apiId: 'RowLinksVariants',
    values: [
      { displayName: 'Inline', apiId: 'Inline' },
      { displayName: 'Image Label Swiper', apiId: 'ImageLabelSwiper' },
      { displayName: 'Logo Swiper', apiId: 'LogoSwiper' },
      { displayName: 'USPS', apiId: 'Usps' },
    ],
  })

  // ? MODEL

  migrationAction(client, schema, 'model', 'create', {
    apiId: 'RowLinks',
    apiIdPlural: 'RowLinksMultiple',
    displayName: 'Row Links',
    description: 'Row Links is a Row of PageLinks with different variants',
  })

  migrationAction(
    client,
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Identity',
      apiId: 'identity',
      description: 'Only used for internal reference',
      type: SimpleFieldType.String,
      isTitle: true,
      isRequired: true,
      isUnique: true,
      modelApiId: 'RowLinks',
    },
    'RowLinks',
    'model',
  )

  migrationAction(
    client,
    schema,
    'enumerableField',
    'create',
    {
      displayName: 'Variant',
      apiId: 'linksVariant',
      parentApiId: 'RowLinks',
      enumerationApiId: 'RowLinksVariants',
      description: 'Different variants for Row Links',
    },
    'RowLinks',
    'model',
  )

  migrationAction(
    client,
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Title',
      apiId: 'title',
      type: SimpleFieldType.String,
      isRequired: true,
      modelApiId: 'RowLinks',
      isLocalized: true,
    },
    'RowLinks',
    'model',
  )

  migrationAction(
    client,
    schema,
    'simpleField',
    'create',
    {
      displayName: 'Copy',
      apiId: 'rowLinksCopy',
      type: SimpleFieldType.Richtext,
      isLocalized: true,
      modelApiId: 'RowLinks',
    },
    'RowLinks',
    'model',
  )

  migrationAction(
    client,
    schema,
    'relationalField',
    'create',
    {
      displayName: 'Links',
      apiId: 'pageLinks',
      modelApiId: 'RowLinks',
      type: RelationalFieldType.Relation,
      reverseField: {
        apiId: 'rowLinks',
        modelApiId: 'PageLink',
        displayName: 'RowLinks',
        visibility: VisibilityTypes.Hidden,
        isList: true,
      },
      visibility: VisibilityTypes.ReadWrite,
      isList: true,
    },
    'RowLinks',
    'model',
  )

  migrationAction(
    client,
    schema,
    'unionField',
    'update',
    {
      apiId: 'content',
      displayName: 'Content',
      modelApiId: 'Page',
      reverseField: {
        modelApiIds: [
          'RowLinks',
          'RowServiceOptions',
          'RowSpecialBanner',
          'RowQuote',
          'RowProduct',
          'RowColumnOne',
          'RowColumnTwo',
          'RowColumnThree',
          'RowHeroBanner',
          'RowBlogContent',
          'RowButtonList',
          'RowContentLinks',
          'RowButtonLinkList',
        ],
        // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
      },
    },
    'Page',
    'model',
  )

  migrationAction(
    client,
    schema,
    'unionField',
    'update',
    {
      apiId: 'row',
      displayName: 'Row',
      modelApiId: 'DynamicRow',
      reverseField: {
        modelApiIds: [
          'RowLinks',
          'RowServiceOptions',
          'RowSpecialBanner',
          'RowQuote',
          'RowProduct',
          'RowColumnOne',
          'RowColumnTwo',
          'RowColumnThree',
          'RowHeroBanner',
          'RowBlogContent',
          'RowButtonList',
          'RowContentLinks',
          'RowButtonLinkList',
        ],
        // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
      },
      visibility: VisibilityTypes.Hidden,
    },
    'DynamicRow',
    'model',
  )

  migrationAction(
    client,
    schema,
    'unionField',
    'update',
    {
      apiId: 'target',
      displayName: 'Placement target',
      modelApiId: 'DynamicRow',
      reverseField: {
        modelApiIds: [
          'RowLinks',
          'RowServiceOptions',
          'RowSpecialBanner',
          'RowQuote',
          'RowProduct',
          'RowColumnOne',
          'RowColumnTwo',
          'RowColumnThree',
          'RowHeroBanner',
          'RowBlogContent',
          'RowButtonList',
          'RowContentLinks',
          'RowButtonLinkList',
        ],
        // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
      },
      visibility: VisibilityTypes.Hidden,
    },
    'DynamicRow',
    'model',
  )

  // DEV PURPOSES

  // END DEV PURPOSES

  return client.run(true)
}
