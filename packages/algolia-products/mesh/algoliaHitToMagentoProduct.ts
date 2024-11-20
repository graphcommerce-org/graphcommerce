import type {
  AlgoliaPrice,
  AlgoliaProductHitAdditionalProperties,
  Algoliahit,
  CurrencyEnum,
  MeshContext,
  PriceRange,
  QueryproductsArgs,
  RequireFields,
  ResolverFn,
  ResolversParentTypes,
  ResolversTypes,
} from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLResolveInfo } from 'graphql'
import type { GetStoreConfigReturn } from './getStoreConfig'

export function assertAdditional(
  additional: unknown,
): additional is AlgoliaProductHitAdditionalProperties {
  return true
}

const algoliaTypeToTypename = {
  bundle: 'BundleProduct',
  simple: 'SimpleProduct',
  configurable: 'ConfigurableProduct',
  downloadable: 'DownloadableProduct',
  virtual: 'VirtualProduct',
  grouped: 'GroupedProduct',
  giftcard: 'GiftCardProduct',
} as const

function mapPriceRange(
  price: AlgoliaProductHitAdditionalProperties['price'],
  storeConfig: GetStoreConfigReturn,
  customerGroup = 0,
): PriceRange {
  if (!storeConfig?.default_display_currency_code) throw new Error('Currency is required')

  const key = storeConfig.default_display_currency_code as keyof AlgoliaPrice
  const currency = storeConfig.default_display_currency_code as CurrencyEnum

  const maxRegular = price?.[key]?.default_max ?? 0
  const maxFinal = price?.[key]?.[`group_${customerGroup}_max`] ?? price?.[key]?.default_max ?? 0

  const minRegular = price?.[key]?.default ?? 0
  const minFinal = price?.[key]?.[`group_${customerGroup}`] ?? price?.[key]?.default

  return {
    maximum_price: {
      regular_price: {
        currency,
        value: maxRegular,
      },
      final_price: {
        currency,
        value: maxFinal,
      },
      discount: {
        percent_off:
          maxRegular !== maxFinal && maxRegular > 0 ? 1 - (maxFinal / maxRegular) * 100 : 0,
        amount_off: maxRegular - maxFinal,
      },
      // fixed_product_taxes
    },
    minimum_price: {
      regular_price: {
        currency,
        value: price?.[key]?.default,
      },
      final_price: {
        currency,
        value: minFinal,
      },
      discount: {
        percent_off:
          minRegular !== minFinal && minRegular > 0 ? 1 - (minFinal / minRegular) * 100 : 0,
        amount_off: minRegular - minFinal,
      },
      // fixed_product_taxes
    },
  }
}

export function algoliaUrlToUrlKey(url?: string | null, base?: string | null): string | null {
  if (!url || !base) return null
  return url.replace(base, '')
}

/**
 * For the URL https://configurator.reachdigital.dev/media/catalog/product/cache/d911de87cf9e562637815cc5a14b1b05/1/0/1087_1_3.jpg
 * Remove /cache/HASH from the URL but only if the url contains media/catalog/product
 * @param url
 */
function getOriginalImage(url?: string | undefined | null) {
  if (!url || !url.includes('media/catalog/product')) return url
  return url.replace(/\/cache\/[a-z0-9]+/, '')
}

export type ProductsItemsItem = NonNullable<
  Awaited<
    ReturnType<
      ResolverFn<
        ResolversTypes['Products'],
        ResolversParentTypes['Query'],
        MeshContext,
        RequireFields<QueryproductsArgs, 'pageSize' | 'currentPage'>
      >
    >
  >['items']
>[number] & {
  __typename: (typeof algoliaTypeToTypename)[keyof typeof algoliaTypeToTypename]
}

/**
 * Mapping function to map Algolia hit to Magento product.
 *
 * You can create a FunctionPlugin to modify the behavior of this function or implement brand specific code.
 */
export function algoliaHitToMagentoProduct(
  hit: Algoliahit,
  storeConfig: GetStoreConfigReturn,
  customerGroup: number,
): ProductsItemsItem | null {
  const { objectID, additionalProperties } = hit
  if (!assertAdditional(additionalProperties)) return null

  const {
    sku,
    created_at,
    image_url,
    is_stock,

    price,
    thumbnail_url,
    type_id,
    url,

    // not used
    ordered_qty,
    visibility_catalog,
    visibility_search,
    rating_summary,

    // The rest will be spread into the product
    ...rest
  } = additionalProperties

  // Some custom attributes are returned as array while they need to be a string. Flatten those arrays
  const flattenedCustomAttributes = {}
  for (const [key, value] of Object.entries(rest)) {
    if (value !== null && Array.isArray(value) && value?.length > 0) {
      flattenedCustomAttributes[key] = value.toString()
      delete rest[key]
    }
  }

  return {
    redirect_code: 0,
    __typename: algoliaTypeToTypename[type_id as keyof typeof algoliaTypeToTypename],
    uid: btoa(objectID),
    sku: Array.isArray(sku) ? sku[0] : `${sku}`,
    price_range: mapPriceRange(price, storeConfig, customerGroup),
    created_at: created_at ? new Date(created_at).toISOString() : null,
    stock_status: is_stock ? 'IN_STOCK' : 'OUT_OF_STOCK',
    review_count: 0,
    rating_summary: Number(rating_summary),
    reviews: { items: [], page_info: {} },
    // canonical_url: null,
    // categories: [],
    // country_of_manufacture: null,
    // crosssell_products: [],
    // custom_attributesV2: null,
    // description: null,
    // gift_message_available: null,
    image: { url: getOriginalImage(image_url) },
    // media_gallery: [],
    // meta_keyword: null,
    // meta_title: null,
    // new_from_date: null,
    // new_to_date: null,
    // only_x_left_in_stock: null,
    // options_container: null,
    // price_tiers: [],
    // product_links: [],
    // related_products: null,
    // short_description: null,
    // small_image: null,
    // special_price: null,
    // special_to_date: null,
    small_image: { url: getOriginalImage(thumbnail_url) },
    swatch_image: getOriginalImage(image_url),
    thumbnail: { url: getOriginalImage(thumbnail_url) },
    // upsell_products: [],
    url_key: algoliaUrlToUrlKey(url, storeConfig?.base_link_url),
    url_suffix: storeConfig?.product_url_suffix,
    ...rest,
    ...flattenedCustomAttributes,
  }
}
