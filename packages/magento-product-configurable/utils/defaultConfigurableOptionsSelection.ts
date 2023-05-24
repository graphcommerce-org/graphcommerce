import { ApolloClient } from '@graphcommerce/graphql'
import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { findByTypename, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { GetConfigurableOptionsSelectionDocument } from '../graphql'
import { DefaultConfigurableOptionsSelectionFragment } from './DefaultConfigurableOptionsSelection.gql'

type BaseQuery =
  | { products?: DefaultConfigurableOptionsSelectionFragment | null | undefined }
  | null
  | undefined

let warned = false
/**
 * This method writes the GetConfigurableOptionsSelection query result to the Apollo cache and sets
 * the defaultValues for the `<AddProductsToCartForm defaultValues={{}}/>`.
 */
export function defaultConfigurableOptionsSelection<Q extends BaseQuery = BaseQuery>(
  urlKey: string,
  client: ApolloClient<object>,
  query: Q,
): Q & Pick<AddProductsToCartFormProps, 'defaultValues'> {
  const requested = query?.products?.items?.find((p) => p?.url_key === urlKey)
  if (!requested || requested?.__typename !== 'SimpleProduct')
    return { ...query, defaultValues: {} }

  const configurable = findByTypename(query?.products?.items, 'ConfigurableProduct')
  const variant = findByTypename(query?.products?.items, 'SimpleProduct')

  if (!configurable?.url_key || !variant)
    return { ...query, products: { ...query?.products, items: [requested] } }

  const selectedOptions: string[] = []

  const options = filterNonNullableKeys(configurable.configurable_options)

  const warnFor: string[] = []
  options.forEach((o, index) => {
    const simpleValue = variant[o.attribute_code]
    if (!simpleValue) warnFor.push(o.attribute_code)

    filterNonNullableKeys(o.values).forEach((v) => {
      if (Buffer.from(v.uid, 'base64').toString('utf8').endsWith(`/${simpleValue}`)) {
        selectedOptions[index] = v.uid
      }
    })
  })

  if (process.env.NODE_ENV !== 'production' && warnFor.length && !warned) {
    warned = true
    const warnStr = warnFor.join(', ')
    console.warn(
      `[@graphcommerce/magento-product-configurable]: The following attributes were found in the configurable options: ${warnStr}. However, they were not found in the simple product. Please add the following attributes to the simple product: ${warnStr}`,
    )
  }
  if (warnFor.length) {
    return {
      ...query,
      products: { ...query?.products, items: [requested] },
      defaultValues: {},
    }
  }

  if (!selectedOptions.length) return { ...query, defaultValues: {} }

  /**
   * We're using writeQuery to the Apollo Client cache, to to avoid a second request to the GraphQL
   * API. However, this is resulting in somewhat brittle code, because when the
   * GetConfigurableOptionsSelectionDocument query is modified, this code can break.
   *
   * Even if this code won't break the frontend will throw an hydration error if addtional fields
   * need to be requested.
   *
   * The code below by default does the exact same thing as:
   *
   * ```ts
   * await client.query({
   *   query: GetConfigurableOptionsSelectionDocument,
   *   variables: { urlKey: configurable.url_key, selectedOptions },
   * })
   * ```
   */
  client.cache.writeQuery({
    query: GetConfigurableOptionsSelectionDocument,
    variables: { urlKey: configurable.url_key, selectedOptions },
    data: {
      products: {
        ...query?.products,
        __typename: 'Products',
        items: [
          {
            __typename: 'ConfigurableProduct',
            uid: configurable.uid,
            configurable_product_options_selection: {
              __typename: 'ConfigurableProductOptionsSelection',
              media_gallery: variant.media_gallery,
              variant: {
                ...variant,
                __typename: 'SimpleProduct',
              },
              options_available_for_selection: options.map(({ attribute_code }) => ({
                __typename: 'ConfigurableOptionAvailableForSelection' as const,
                attribute_code,
              })),
            },
          },
        ],
      },
    },
  })

  return {
    ...query,
    products: { ...query?.products, items: [configurable] },
    defaultValues: { cartItems: [{ selected_options: selectedOptions }] },
  }
}
