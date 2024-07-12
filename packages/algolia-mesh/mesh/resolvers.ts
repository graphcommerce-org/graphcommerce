import type {
  Aggregation,
  AggregationOption,
  AlgoliafacetFilters_Input,
  AlgoliaPrice,
  AlgoliaProductHitAdditionalProperties,
  CategoryResult,
  CategoryTree,
  CurrencyEnum,
  CustomAttributeMetadataInterface,
  InputMaybe,
  Maybe,
  MeshContext,
  PriceRange,
  ProductAttributeFilterInput,
  QueryproductsArgs,
  RequireFields,
  ResolverFn,
  Resolvers,
  ResolversParentTypes,
  ResolversTypes,
  StoreConfig,
} from '@graphcommerce/graphql-mesh'

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
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

function assertAdditional(
  additional: unknown,
): additional is AlgoliaProductHitAdditionalProperties {
  return true
}

function mapPriceRange(
  price: AlgoliaProductHitAdditionalProperties['price'],
  defaultDisplayCurrencyCode: StoreConfig['default_display_currency_code'],
): PriceRange {
  if (!defaultDisplayCurrencyCode) throw new Error('Currency is required')

  const key = defaultDisplayCurrencyCode as keyof AlgoliaPrice
  const currency = defaultDisplayCurrencyCode as CurrencyEnum

  return {
    maximum_price: {
      regular_price: { currency, value: price?.[key]?.default_max },
      final_price: { currency, value: price?.[key]?.default_max },
      // discount,
      // fixed_product_taxes
    },
    minimum_price: {
      regular_price: { currency, value: price?.[key]?.default },
      final_price: { currency, value: price?.[key]?.default },
      // discount,
      // fixed_product_taxes
    },
  }
}

// Map filters recieved from arguments to algolia facetfilter format
function mapFiltersForAlgolia(filters?: InputMaybe<ProductAttributeFilterInput>) {
  const filterArray: AlgoliafacetFilters_Input[] = []

  if (!filters) {
    return []
  }

  Object.keys(filters).forEach((value) => {
    const filterValueArray: string[] = filters[value]?.in
    if (filters[value]?.in) {
      for (let i = 0; i < filterValueArray.length; i++) {
        if (value !== 'category_uid') {
          filterArray.push({ facetFilters_Input: { String: `${value}:${filterValueArray[i]}` } })
        }
        if (filterValueArray[i]) {
          filterArray.push({
            facetFilters_Input: { String: `categoryIds:${atob(filterValueArray[i])}` },
          })
        }
      }
    }
  })
  return filterArray
}

function recursiveOptions(
  category: CategoryTree,
  facetList: AlgoliaFacetOption,
): AggregationOption[] {
  const options: AggregationOption[] = []
  if (category?.children?.length) {
    category.children.forEach((child) => {
      if (child) {
        const childData = recursiveOptions(child, facetList)
        options.push(...childData)
      }
    })
  }

  const count = category?.id ? facetList[category?.id] : 0
  options.push({ label: category?.name, value: category?.uid, count })
  return options
}

function categoryMapping(
  categoryList: CategoryResult | null | undefined,
  categoryLabel: string,
  facetList: AlgoliaFacetOption,
): Aggregation {
  const options =
    categoryList?.items && categoryList.items[0]
      ? recursiveOptions(categoryList.items[0], facetList)
      : []

  return { label: categoryLabel, attribute_code: categoryLabel, options }
}

type AlgoliaFacets = { [facetName: string]: AlgoliaFacetOption }
type AlgoliaFacetOption = { [facetOption: string]: number }

// Map algolia facets to aggregations format
function mapAlgoliaFacetsToAggregations(
  algoliaFacets: AlgoliaFacets,
  attributes: Maybe<CustomAttributeMetadataInterface>[] | undefined,
  categoryList?: null | CategoryResult,
): Aggregation[] {
  const aggregations: Aggregation[] = []

  // const aggr2: Aggregation[] = Object.entries(algoliaFacets).map(([attribute_code, value]) => {
  //   const attributeLabel = attributes?.find((attribute) => attribute?.code === attribute_code)

  //   return {
  //     attribute_code,
  //     label: attributeLabel?.label ?? attribute_code,
  //     options: Object.entries(value).map(([label, count]) => ({
  //       label,
  //       count,
  //       value: label,
  //     })),
  //   }
  // })

  Object.keys(algoliaFacets).forEach((facetIndex) => {
    const facet: object = algoliaFacets[facetIndex]
    const optionsCheck: AggregationOption[] = []
    const attributeLabel = attributes?.find((attribute) => attribute?.code === facetIndex)
    Object.keys(facet).forEach((filter) => {
      optionsCheck.push({ label: filter, count: facet[filter], value: filter })
    })
    if (attributeLabel) {
      aggregations.push({
        label: attributeLabel.label,
        attribute_code: facetIndex,
        options: optionsCheck,
      })
    } else if (facetIndex === 'categoryIds') {
      aggregations.push(categoryMapping(categoryList, 'category_uid', algoliaFacets[facetIndex]))
    } else {
      aggregations.push({
        label: facetIndex,
        attribute_code: facetIndex,
        options: optionsCheck,
      })
    }
  })
  return aggregations
}

function algoliaUrlToUrlKey(url?: string | null, base?: string | null): string | null {
  if (!url || !base) return null
  return url.replace(base, '')
}

type Item = NonNullable<
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
>[number]

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

/**
 * For the URL https://configurator.reachdigital.dev/media/catalog/product/cache/d911de87cf9e562637815cc5a14b1b05/1/0/1087_1_3.jpg
 * Remove /cache/HASH from the URL but only if the url contains media/catalog/product
 * @param url
 */
function getOriginalImage(url?: string | undefined | null) {
  if (!url) return url

  if (!url.includes('media/catalog/product')) {
    return url
  }
  return url.replace(/\/cache\/[a-z0-9]+/, '')
}

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const store = getStoreHeader(context)

      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia || !store) {
        return context.m2.Query.products({ root, args, context, info })
      }

      // Note: the attributelist query requires magento: ^2.4.7
      const [searchResults, attributeList, categoryList, storeConfig] = await Promise.all([
        context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName: `${import.meta.graphCommerce.algoliaIndexNamePrefix}${store}_products`,
            input: {
              query: args.search,
              facets: ['*'],
              hitsPerPage: args.pageSize ? args.pageSize : 10,
              facetFilters: mapFiltersForAlgolia(args.filter),
            },
          },
          autoSelectionSetWithDepth: 10,
          selectionSet: /* GraphQL */ `
            {
              nbPages
              hitsPerPage
              page
              nbHits
              hits {
                __typename
                objectID
                additionalProperties
              }
              facets {
                additionalProperties
              }
            }
          `,
          // autoSelectionSetWithDepth: 10,
          context,
          info,
        }),
        context.m2.Query.attributesList({
          root,
          args: { entityType: 'CATALOG_PRODUCT', filters: { is_filterable: true } },
          selectionSet: /* GraphQL */ `
            {
              items {
                label
                code
              }
            }
          `,
          context,
          info,
        }),
        context.m2.Query.categories({
          root,
          selectionSet: /* GraphQL */ `
            {
              items {
                uid
                name
                id
                children {
                  uid
                  name
                  id
                  children {
                    name
                    uid
                    id
                    children {
                      name
                      uid
                      id
                      children {
                        id
                        name
                        uid
                      }
                    }
                  }
                }
              }
            }
          `,
          context,
          info,
        }),
        context.m2.Query.storeConfig({
          root,
          info,
          context,
          selectionSet: /* GraphQL */ `
            {
              root_category_uid
              default_display_currency_code
              base_link_url
            }
          `,
        }),
      ])

      const aggregations = mapAlgoliaFacetsToAggregations(
        searchResults?.facets?.additionalProperties as AlgoliaFacets,
        attributeList?.items,
        categoryList,
      )

      // Map algolia results to magento products format
      const items = (searchResults?.hits ?? [])?.filter(nonNullable).map<Item>((hit) => {
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

        return {
          redirect_code: 0,
          __typename: algoliaTypeToTypename[type_id as keyof typeof algoliaTypeToTypename],
          uid: btoa(objectID),
          sku: Array.isArray(sku) ? sku[0] : `${sku}`,
          price_range: mapPriceRange(price, storeConfig?.default_display_currency_code),
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
          // related_products: [],
          // short_description: null,
          // small_image: null,
          // special_price: null,
          // special_to_date: null,
          // stock_status: null,
          small_image: { url: getOriginalImage(thumbnail_url) },
          swatch_image: getOriginalImage(image_url),
          thumbnail: { url: getOriginalImage(thumbnail_url) },
          // upsell_products: [],
          url_key: algoliaUrlToUrlKey(url, storeConfig?.base_link_url),
          url_suffix: storeConfig?.product_url_suffix,
          ...rest,
        }
      })

      return {
        items,
        aggregations,
        page_info: {
          current_page: searchResults?.page,
          page_size: searchResults?.hitsPerPage,
          total_pages: searchResults?.nbPages,
        },
        suggestions: [],
        total_count: searchResults?.nbHits,
        sort_fields: {
          default: 'relevance',
          options: [{ label: 'Relevance', value: 'relevance' }],
        },
      }
    },
  },
}
