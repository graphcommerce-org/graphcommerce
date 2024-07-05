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
  Maybe,
  MeshContext,
  Mutationalgolia_searchSingleIndexArgs,
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

const typenames = {
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
function mapFiltersForAlgolia(filters?: ProductAttributeFilterInput) {
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

function algoliaUrlToUrlKey(url?: string, base?: string | null): string | null {
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

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const storeConfig = await context.m2.Query.storeConfig({
        root,
        info,
        context,
        selectionSet: /* GraphQL */ `
          {
            store_code
            default_display_currency_code
            base_link_url
          }
        `,
      })

      // Object.keys(info.operation.selectionSet);

      if (!args.filter?.useAlgolia || !storeConfig) {
        return context.m2.Query.products({ root, args, context, info })
      }

      const inputArgs: Mutationalgolia_searchSingleIndexArgs = {
        indexName: `${import.meta.graphCommerce.algoliaIndexNamePrefix}${storeConfig?.store_code}_products`,
        input: {
          Search_parameters_as_object_Input: {
            query: args.search,
            facets: ['*'],
            hitsPerPage: args.pageSize ? args.pageSize : 10,
            facetFilters: mapFiltersForAlgolia(args.filter),
          },
        },
      }

      // Note: the attributelist query requires magento: ^2.4.7
      const [searchResults, attributeList, categoryList] = await Promise.all([
        context.algolia.Mutation.algolia_searchSingleIndex({
          root,
          args: inputArgs,
          selectionSet: /* GraphQL */ `
            {
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

        return {
          redirect_code: 0,
          __typename: typenames[hit.additionalProperties.type_id as keyof typeof typenames],
          uid: objectID,
          sku: Array.isArray(hit.additionalProperties.sku)
            ? hit.additionalProperties.sku[0]
            : hit?.additionalProperties?.sku,
          price_range: mapPriceRange(
            additionalProperties.price,
            storeConfig?.default_display_currency_code,
          ),
          // Mandatory fields, but todo
          rating_summary: 0,
          review_count: 0,
          reviews: { items: [], page_info: {} },

          // canonical_url: null,
          // categories: [],
          // country_of_manufacture: null,
          // crosssell_products: [],
          // custom_attributesV2: null,
          // description: null,
          // gift_message_available: null,
          image: { url: hit.additionalProperties.image_url, label: 'test', position: 0 },
          // media_gallery: [],
          // meta_description: null,
          // meta_keyword: null,
          // meta_title: null,
          name: additionalProperties.name,
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
          small_image: { url: hit.additionalProperties.image_url },
          swatch_image: hit.additionalProperties.image_url,
          thumbnail: { url: hit.additionalProperties.image_url },
          // upsell_products: [],
          url_key: algoliaUrlToUrlKey(
            hit.additionalProperties.url as string | undefined,
            storeConfig?.base_link_url,
          ),
          url_suffix: storeConfig.product_url_suffix,
        }
      })

      return {
        items,
        aggregations,
        page_info: { current_page: 1, page_size: 1, total_pages: 1 },
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
