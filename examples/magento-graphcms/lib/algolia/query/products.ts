import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type {
  AlgoliaProductHitAdditionalProperties,
  CurrencyEnum,
  Mutationalgolia_searchSingleIndexArgs,
  PriceRange,
  Resolvers,
  Aggregation,
  AggregationOption,
} from '../../../.mesh'

function assertAdditional(
  additional: unknown,
): additional is AlgoliaProductHitAdditionalProperties {
  return true
}

function mapPriceRange(prices: any, currency: CurrencyEnum): PriceRange {
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

function mapAlgoliaFacetsToAggregations(algoliaFacets: object): Aggregation[] {
  let aggregations: Aggregation[] = []
  Object.keys(algoliaFacets).forEach((facetIndex) => {
    const facet: object = algoliaFacets[facetIndex]
    let optionsCheck: AggregationOption[] = []
    Object.keys(facet).forEach((filter) => {
      optionsCheck.push({
        label: filter,
        count: facet[filter],
        value: filter,
      })
    })
    aggregations.push({
      label: facetIndex,
      attribute_code: facetIndex,
      options: optionsCheck,
    })
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
      const term = args.search

      const inputArgs: Mutationalgolia_searchSingleIndexArgs = {
        indexName: 'magento2_demonl_NL_products',
        input: {
          Search_parameters_as_object_Input: {
            query: 'sock',
            facets: ['*'],
            hitsPerPage: 1,
          },
        },
      }

      const searchResults = await context.algolia.Mutation.algolia_searchSingleIndex({
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
      })

      const aggregations = mapAlgoliaFacetsToAggregations(
        searchResults?.facets?.additionalProperties,
      )

      const algoliaItems = filterNonNullableKeys(searchResults?.hits).map((hit) => {
        const { objectID, additionalProperties } = hit

        if (!assertAdditional(additionalProperties)) return null

        return {
          __typename: 'SimpleProduct',
          uid: objectID,
          sku: hit.additionalProperties.sku,
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
          // image: hit.additionalProperties.image_url,
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
          // swatch_image: null,
          // thumbnail: null,
          // upsell_products: [],
          // url_key: null,
          // url_suffix: null,
        }
      })

      if (!algoliaItems) {
        return context.m2.Query.products({ root, args, context, info })
      }

      return {
        items: algoliaItems,
        aggregations: aggregations,
        page_info: { current_page: 1, page_size: 1, total_pages: 1 },
        suggestions: [],
        total_count: 1,
        sort_fields: null,
      }
    },
  },
}

export default resolver
