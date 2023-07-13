import { ApolloClient } from '@graphcommerce/graphql'
import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { findByTypename, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { GetConfigurableOptionsSelectionDocument } from '../graphql'
import { DefaultConfigurableOptionsSelectionFragment } from './DefaultConfigurableOptionsSelection.gql'

type BaseQuery =
  | { products?: DefaultConfigurableOptionsSelectionFragment | null | undefined }
  | null
  | undefined

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
  const variants = configurable?.variants
  const simple = requested

  if (!configurable?.url_key) return { ...query, products: { items: [requested] } }

  const selectedOptions: string[] = []

  const options = filterNonNullableKeys(configurable.configurable_options)

  /**
   * A simple product displays the options of a configurable product. On the simple product page the
   * options of the current variant are preselected.
   *
   * (e.g. width: 12mm | 15mm | 25mm => 25mm is preselected).
   *
   * We do this by checking the variants on the configurable product. => We match the preselected
   * variant by comparing the sku of the current page with the available variants. => We then check
   * the attributes of the variant and set the selectedOptions accordingly. => We want to always
   * return the configurable item to a simple item. If we don't do this, the productpage will
   * break.
   *
   * https://hoproj.atlassian.net/browse/GCOM-1120
   */
  variants?.forEach((v) => {
    if (v?.product?.uid === simple.uid) {
      v?.attributes?.forEach((a) => {
        const indexOfOption = options.findIndex((o) => o.attribute_code === a?.code)
        selectedOptions[indexOfOption] = a?.uid ?? ''
      })
    }
  })

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
              media_gallery: simple.media_gallery,
              variant: {
                ...simple,
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
