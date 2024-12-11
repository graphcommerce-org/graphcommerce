import type { ApolloClient } from '@graphcommerce/graphql'
import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { GetConfigurableOptionsSelectionDocument } from '../graphql'
import type { DefaultConfigurableOptionsSelectionFragment } from './DefaultConfigurableOptionsSelection.gql'

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
  const simple = query?.products?.items?.find((p) => p?.url_key === urlKey)
  const configurable = findByTypename(query?.products?.items, 'ConfigurableProduct')

  if (
    simple?.__typename === 'SimpleProduct' &&
    !import.meta.graphCommerce.configurableVariantForSimple
  ) {
    const product = query?.products?.items?.find((p) => p?.url_key === urlKey)
    return { ...query, products: { ...query?.products, items: [product] }, defaultValues: {} }
  }

  // Check if the requested product actually is a simple product
  if (!configurable?.url_key) return { ...query, defaultValues: {} }

  // Find the requested simple product on the configurable variants and get the attributes.
  const attributes = configurable?.variants?.find(
    (v) => v?.product?.uid === simple?.uid,
  )?.attributes

  const selectedOptions = (attributes ?? []).filter(nonNullable).map((a) => a.uid)

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
              configurable_options: filterNonNullableKeys(configurable.configurable_options, [
                'attribute_code',
                'label',
                'values',
              ]).map((option) => ({
                __typename: 'ConfigurableProductOption' as const,
                uid: option.uid,
                attribute_code: option.attribute_code,
                label: option.label,
                values: filterNonNullableKeys(option.values, ['store_label', 'uid']).map(
                  ({ store_label, uid }) => ({ label: store_label, uid }),
                ),
              })),
              options_available_for_selection: optionsAvailableForSelection?.map(
                ({ attribute_code, option_value_uids }) => ({
                  __typename: 'ConfigurableOptionAvailableForSelection' as const,
                  attribute_code,
                  option_value_uids,
                }),
              ),
              media_gallery: simple?.media_gallery ?? configurable.media_gallery,
              variant: simple?.__typename === 'SimpleProduct' ? simple : null,
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
