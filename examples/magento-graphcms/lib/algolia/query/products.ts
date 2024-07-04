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
  ProductAttributeFilterInput,
  AlgoliafacetFilters_Input,
  CategoryTree,
  CategoryResult,
} from '../../../.mesh'
import { M2Types } from '../../../.mesh/sources/m2/types'
import { Maybe } from 'graphql/jsutils/Maybe'
import { count } from 'console'

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
function mapFiltersForAlgolia(filters?: ProductAttributeFilterInput) {
  const filterArray: AlgoliafacetFilters_Input[] = []

  if (!filters) {
    return []
  }

  Object.keys(filters).forEach((value) => {
    const filterValueArray = filters[value]?.in
    if (filters[value]?.in) {
      for (let i = 0; i < filterValueArray.length; i++) {
        if (filterValueArray[i]) {
          filterArray.push({ facetFilters_Input: { String: `${value}:${filterValueArray[i]}` } })
        }
      }
    }
  })
  return filterArray
}

type TestArray = { label: Maybe<string> | undefined; value: string | undefined; count: number }
function recursiveOptions(category: Maybe<CategoryTree>, facetList: object): TestArray[] {
  const options: TestArray[] = []
  if (category?.children?.length) {
    category.children.forEach((child) => {
      const childData = recursiveOptions(child, facetList)
      options.push(...childData)
    })
  }

  options.push({ label: category?.name, value: category?.uid, count: facetList[category.id] })
  return options
}

function categoryMapping(
  categoryList: CategoryResult,
  categoryLabel,
  facetList: object,
): Aggregation {
  return {
    label: categoryLabel,
    attribute_code: categoryLabel,
    options: recursiveOptions(categoryList.items[0], facetList),
  }
}

// Map algolia facets to aggregations format
function mapAlgoliaFacetsToAggregations(
  algoliaFacets: object,
  attributes: M2Types.Maybe<M2Types.CustomAttributeMetadataInterface>[] | undefined,
  categoryList: CategoryResult,
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
    } else if (facetIndex === 'categoryIds') {
      aggregations.push(categoryMapping(categoryList, facetIndex, algoliaFacets[facetIndex]))
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
      const storeConfig = await context.m2.Query.storeConfig({
        root,
        info,
        context,
        selectionSet: /* GraphQL */ `
          {
            store_code
            default_display_currency_code
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
        searchResults?.facets?.additionalProperties,
        attributeList?.items,
        categoryList,
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
