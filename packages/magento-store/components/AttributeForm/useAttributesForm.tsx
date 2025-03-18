import { useQuery } from '@graphcommerce/graphql'
import type { AttributeValueInput } from '@graphcommerce/graphql-mesh'
import type { AttributeValueFragment } from '@graphcommerce/magento-store/components/AttributeForm/AttributeValueFragment.gql'
import type { CustomAttributeMetadataFragment } from '@graphcommerce/magento-store/components/AttributeForm/CustomAttributeMetadata.gql'
import { nonNullable, useMemoObject } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import { AttributesFormDocument } from './AttributesForm.gql'

type CustomAttributesFormFieldValue = string | string[] | boolean | undefined
type CustomAttributesFormField = Record<string, CustomAttributesFormFieldValue>

export type CustomAttributesFormValues<
  AdditionalKnownAttributes extends Record<string, unknown> = Record<string, unknown>,
> = {
  custom_attributes?: CustomAttributesFormField & AdditionalKnownAttributes
}

/**
 * Convert the GraphQL custom_attributes field to the CustomAttributesFormField so the data is
 * correctly mapped to the form.
 *
 * So for example it maps this data:
 *
 * ```graphql
 * type Customer {
 *   """Customer's custom attributes."""
 *   custom_attributes(attributeCodes: [ID!]): [AttributeValueInterface]
 * }
 * ```
 *
 * To a format that is compatible with the useForm hook with the `CustomAttributesFormValues` type.
 */
export function AttributesValueArray_to_CustomAttributesFormField(
  attributes: CustomAttributeMetadata[],
  custom_attributes: (AttributeValueFragment | null | undefined)[] | null | undefined,
): CustomAttributesFormField {
  const result: CustomAttributesFormField = {}

  attributes.forEach((metadata) => {
    const attr = (custom_attributes ?? [])
      .filter(nonNullable)
      .find((ca) => ca.code === metadata.code)

    // Handle multiselect
    if (
      metadata.frontend_input === 'MULTISELECT' ||
      attr?.__typename === 'AttributeSelectedOptions'
    ) {
      const value =
        attr?.__typename === 'AttributeSelectedOptions'
          ? (attr?.selected_options ?? [])
              .filter(nonNullable)
              .map((option) => option.value)
              .filter((v) => !!v)
          : metadata.options
              ?.filter(nonNullable)
              .filter((o) => o.is_default)
              .map((o) => o.value)

      result[metadata.code] = value
      return
    }

    // Handle MULTILINE fields
    if (metadata.frontend_input === 'MULTILINE' && metadata.index !== undefined) {
      const value = attr?.value.split('\n')[metadata.index]
      const valueArray = result[metadata.code] ?? []
      valueArray[metadata.index] = value ?? metadata.default_value ?? undefined
      result[metadata.code] = valueArray
      return
    }

    // Handle DATE fields
    if (metadata.frontend_input === 'DATE' && attr?.__typename === 'AttributeValue' && attr.value) {
      const [date] = attr.value.split(' ')
      result[metadata.code] = date
      return
    }

    // Handle regular fields
    result[metadata.code] = attr?.value ?? metadata.default_value ?? undefined
  })

  console.log({ result, custom_attributes })
  return result
}

/**
 * Covert the CustomAttributesFormField to the AttributeValueInput[] so the data is correctly mapped
 * To the Magento GraphQL mutation.
 *
 * So the CustomAttributesFormField is converted to the input for a mutation which can look lke:s
 *
 * ```graphql
 * input CustomerUpdateInput {
 *   """The customer's custom attributes."""
 *   custom_attributes: [AttributeValueInput]
 * }
 * ```
 */
export function CustomAttributesField_to_AttributeValueInputs(
  attributes: CustomAttributeMetadata[],
  custom_attributes: CustomAttributesFormField,
): AttributeValueInput[] {
  const values: Record<string, AttributeValueInput> = {}

  attributes.forEach((metadata) => {
    const attribute_code = metadata.code
    const value = custom_attributes[metadata.code]

    if (!value) return

    if (
      (metadata.__typename === 'CustomerAttributeMetadata' &&
        metadata.frontend_input === 'BOOLEAN') ||
      typeof value === 'boolean'
    ) {
      values[metadata.code] = { attribute_code, value: value ? '1' : '0' }
      return
    }

    if (Array.isArray(value)) {
      if (metadata.frontend_input === 'MULTILINE') {
        values[metadata.code] = { attribute_code, value: value.join('\n') }
      }

      if (metadata.frontend_input === 'MULTISELECT') {
        values[metadata.code] = { attribute_code, value: value.join(',') }
      }
    } else {
      values[metadata.code] = { attribute_code, value }
    }
  })

  return Object.values(values)
}

export type CustomAttributeFormCode = (
  | 'customer_account_create'
  | 'customer_account_edit'
  | 'customer_address_edit'
  | 'customer_register_address'
) &
  (string & {})

/**
 * Magento attribute code, the actual possible values are deterimined in the database of Magento and
 * therefor are now known at compile time.
 */
export type MagentoAttributeCode = string

export type CustomAttributeMetadataTypename = CustomAttributeMetadataFragment['__typename']

export type CustomAttributeMetadata<
  Typename extends CustomAttributeMetadataTypename = CustomAttributeMetadataTypename,
> = Extract<CustomAttributeMetadataFragment, { __typename: Typename }> & {
  name: string
  index?: number
}

/**
 * Retrieve the available attributes.
 *
 * Example:
 *
 * ```tsx
 * const attributes = useAttributesForm({
 *   formCode: 'customer_account_create',
 *   exclude: ['email'],
 * })
 * ```
 *
 * Note: When using this hook, make sure the page also calls preloadAttributesForm in getStaticProps
 * so the query doesn't need to run in the browser. Example:
 *
 * ```tsx:
 * const client = graphqlSharedClient(context)
 * await preloadAttributesForm(client, 'customer_account_create')
 * ```
 */
export function useAttributesForm<
  Typename extends CustomAttributeMetadata['__typename'] = CustomAttributeMetadata['__typename'],
>(incomingConfig: {
  /** The form code that is used to retrieve the attributes */
  formCode: CustomAttributeFormCode | (string & Record<never, never>)
  /** A list of attribute codes that should be excluded from the form completely */
  exclude?: MagentoAttributeCode[]

  typename?: Typename
}): CustomAttributeMetadata<Typename>[] {
  const config = useMemoObject(incomingConfig)

  const { data } = useQuery(AttributesFormDocument, {
    variables: { formCode: config.formCode },
  })

  return useMemo(() => {
    const items = (data?.attributesForm.items ?? [])
      .filter(nonNullable)
      .filter((item) => !config.exclude?.includes(item.code))
      .map((item) => ({ ...item, name: `custom_attributes.${item.code}` }))

    /**
     * We handle frontend_input=MULTILINE input fields a bit different as they have multiple values.
     * In this case we remove the original field and add multiple fields with the same name. All
     * fields will become a frontend_input=TEXT.
     *
     * The first line will get the label. The name of the field will be the original name with a
     * `.${number}` suffix.
     *
     * The new fields will be replaced at the exact location the MULTILINE field was at.
     */
    const newItems = items
      .map((item) => {
        if (
          item.frontend_input === 'MULTILINE' &&
          item.__typename === 'CustomerAttributeMetadata' &&
          item.multiline_count
        ) {
          const defaultValues = item.default_value?.split('\n') ?? []
          return Array.from({ length: item.multiline_count }, (_, index) => ({
            ...item,
            label: index === 0 ? item.label : undefined,
            index,
            gridArea: `custom_attributes.${item.code}.${index}`,
            name: `custom_attributes.${item.code}.${index}`,
            default_value: defaultValues[index] ?? undefined,
          }))
        }
        return [item]
      })
      .flat(1)

    return newItems.filter((item): item is CustomAttributeMetadata<Typename> =>
      config.typename ? item.__typename === config.typename : true,
    )
  }, [data?.attributesForm.items, config])
}

export function extractAttributes(
  attributes: CustomAttributeMetadataFragment[],
  attributeCodes: MagentoAttributeCode[],
): [extracted: CustomAttributeMetadataFragment[], remaining: CustomAttributeMetadataFragment[]] {
  return [
    attributes.filter((attribute) => attributeCodes.includes(attribute.code)),
    attributes.filter((attribute) => !attributeCodes.includes(attribute.code)),
  ]
}
