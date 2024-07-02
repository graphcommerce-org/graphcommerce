import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type {
  AlgoliaProductHitAdditionalProperties,
  CurrencyEnum,
  Mutationalgolia_searchSingleIndexArgs,
  PriceRange,
  Resolvers,
  Aggregation,
  AggregationOption,
  QueryattributesListArgs,
} from '../../../.mesh'
import { M2Types } from '../../../.mesh/sources/m2/types'

function assertAdditional(
  additional: unknown,
): additional is AlgoliaProductHitAdditionalProperties {
  return true
}

function mapPriceRange(prices: object, currency: CurrencyEnum): PriceRange {
  return {
    maximum_price: {
      regular_price: { value: prices[currency].default_max, currency },
      final_price: { value: prices[currency].default_max, currency },
    },
    minimum_price: {
      regular_price: { value: prices[currency].default, currency },
      final_price: { value: prices[currency].default, currency },
    },
  }
}

// Map filters recieved from arguments to algolia facetfilter format
function mapFiltersForAlgolia(filters: object) {
  const filterArray: object[] = []

  if (!filters) {
    return []
  }
  
  Object.keys(filters).forEach((value) => {
    const filterValueArray = filters[value]?.in
    for (let i = 0; i < filterValueArray.length; i++) {
      if (filterValueArray[i]) {
        filterArray.push({ facetFilters_Input: { String: `${value}:${filterValueArray[i]}` } })
      }
    }
  })
  return filterArray
}

function mapAlgoliaFacetsToAggregations(
  algoliaFacets: object,
  attributes: M2Types.Maybe<M2Types.CustomAttributeMetadataInterface>[] | undefined,
): Aggregation[] {
  const aggregations: Aggregation[] = []
  Object.keys(algoliaFacets).forEach((facetIndex) => {
    const facet: object = algoliaFacets[facetIndex]
    const optionsCheck: AggregationOption[] = []
    const attributeLabel = attributes?.find((attribute) => attribute?.code === facetIndex)
    Object.keys(facet).forEach((filter) => {
      optionsCheck.push({
        label: filter,
        count: facet[filter],
        value: filter,
      })
    })
    if (attributeLabel) {
      aggregations.push({
        label: attributeLabel.label,
        attribute_code: facetIndex,
        options: optionsCheck,
      })
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

export const resolver: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const todo: { prefix: string; isAlgolia: boolean; currency: CurrencyEnum } = {
        prefix: 'magento2_demo',
        isAlgolia: true,
        currency: 'EUR',
      }

      if (!todo.isAlgolia) {
        return context.m2.Query.products({ root, args, context, info })
      }

      const inputArgs: Mutationalgolia_searchSingleIndexArgs = {
        indexName: 'magento2_demonl_NL_products',
        input: {
          Search_parameters_as_object_Input: {
            query: args.search,
            facets: ['*'],
            hitsPerPage: args.pageSize ? args.pageSize : 10,
            facetFilters: mapFiltersForAlgolia(args.filter),
          },
        },
      }

      const attributeArgs: QueryattributesListArgs = {
        entityType: 'CATALOG_PRODUCT',
      }

      // Note: the attributelist query requires magento: ^2.4.7
      const [searchResults, attributeList] = await Promise.all([
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
          args: attributeArgs,
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
      ])

      const aggregations = mapAlgoliaFacetsToAggregations(
        searchResults?.facets?.additionalProperties,
        attributeList?.items,
      )

      // Map algolia results to magento products format
      const items = filterNonNullableKeys(searchResults?.hits).map((hit) => {
        const { objectID, additionalProperties } = hit

        if (!assertAdditional(additionalProperties)) return null

        const typenames: object = {
          bundle: 'BundleProduct',
          simple: 'SimpleProduct',
          configurable: 'ConfigurableProduct',
          downloadable: 'DownloadableProduct',
          virtual: 'VirtualProduct',
          grouped: 'GroupedProduct',
        }

        return {
          __typename: typenames[hit.additionalProperties.type_id],
          uid: objectID,
          sku: Array.isArray(hit.additionalProperties.sku)
            ? hit.additionalProperties.sku[0]
            : hit?.additionalProperties?.sku,
          price_range: mapPriceRange(hit.additionalProperties.price, todo.currency),
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
          url_key: hit.additionalProperties.url,
          // url_suffix: null,
        }
      })

      if (!items) {
        return context.m2.Query.products({ root, args, context, info })
      }

      return {
        items,
        aggregations,
        page_info: { current_page: 1, page_size: 1, total_pages: 1 },
        suggestions: [],
        total_count: 1,
        sort_fields: null,
      }
    },
  },
}

export default resolver
