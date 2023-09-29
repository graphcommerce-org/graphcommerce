import { ApolloClient } from '@graphcommerce/graphql'
import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { GetConfigurableOptionsSelectionDocument } from '../graphql'
import { DefaultConfigurableOptionsSelectionFragment } from './DefaultConfigurableOptionsSelection.gql'

type BaseQuery =
  | { products?: DefaultConfigurableOptionsSelectionFragment | null | undefined }
  | null
  | undefined

/**
 * Render the configurable product page on a simple product URL with the simple product variant
 * selected.
 *
 * This method writes the GetConfigurableOptionsSelection query result to the Apollo cache and sets
 * the defaultValues for the `<AddProductsToCartForm defaultValues={{}}/>`.
 *
 * - If a simple URL is requested, but a configurable product is also given, this means that the
 *   simple is part of the configurable product.
 * - If that is the case, we render the configurable product page with the simple product variant
 *   selected by filling in `selectedOptions` and passing it as `defaultValues `. We also
 *   prepopulating the result of `GetConfigurableOptionsSelection` query.
 */
export function defaultConfigurableOptionsSelection<Q extends BaseQuery = BaseQuery>(
  urlKey: string,
  client: ApolloClient<object>,
  query: Q,
): Q & Pick<AddProductsToCartFormProps, 'defaultValues'> {
  if (!import.meta.graphCommerce.configurableVariantForSimple) {
    console.log('insta return')
    return { ...query, defaultValues: {} }
  }

  const simple = query?.products?.items?.find((p) => p?.url_key === urlKey)
  const configurable = findByTypename(query?.products?.items, 'ConfigurableProduct')

  // Check if the requested product actually is a simple product
  if (!simple || simple?.__typename !== 'SimpleProduct' || !configurable?.url_key)
    return { ...query, defaultValues: {} }

  // Find the requested simple product on the configurable variants and get the attributes.
  const attributes = configurable?.variants?.find((v) => v?.product?.uid === simple?.uid)
    ?.attributes

  const selectedOptions = (attributes ?? []).filter(nonNullable).map((a) => a.uid)
  if (!selectedOptions.length) return { ...query, products: { items: [simple] }, defaultValues: {} }

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

  const optionsAvailableForSelection =
    configurable.configurable_product_options_selection?.options_available_for_selection?.filter(
      nonNullable,
    )

  client.cache.writeQuery({
    query: GetConfigurableOptionsSelectionDocument,
    variables: { urlKey: configurable.url_key, selectedOptions, reviewPage: 1, reviewPageSize: 3 },
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
              variant: simple,
              options_available_for_selection: optionsAvailableForSelection?.map(
                ({ attribute_code, option_value_uids }) => ({
                  __typename: 'ConfigurableOptionAvailableForSelection' as const,
                  attribute_code,
                  option_value_uids,
                }),
              ),
              configurable_options: configurable.configurable_options?.map(o =>  ({
                attribute_code: o?.attribute_code,
                label: o?.label,
                uid: o?.uid,
                values: o?.values
              })
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
