import type {
  Aggregation,
  AggregationOption,
  CategoryResult,
  CategoryTree,
  MeshContext,
  Resolvers,
} from '@graphcommerce/graphql-mesh'
import { AttributeList, attributeList } from './attributeList'
import { productFilterInputToAlgoliafacetFiltersInput } from './productFilterInputToAlgoliafacetFiltersInput'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { getStoreConfig } from './getStoreConfig'
import { nonNullable } from './utils'

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
  attributes: AttributeList,
  categoryList?: null | CategoryResult,
): Aggregation[] {
  const aggregations: Aggregation[] = []

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

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

function getMagento2Meta(context: MeshContext, isSearch: boolean) {
  return [
    attributeList(context, isSearch),
    context.m2.Query.categories({
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
    }),
    getStoreConfig(context),
  ] as const
}

let magento2Meta: ReturnType<typeof getMagento2Meta>

function getMagento2MetaCached(context: MeshContext, isSearch: boolean) {
  if (magento2Meta) return magento2Meta
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  magento2Meta = getMagento2Meta(context, isSearch)
  return magento2Meta
}

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const store = getStoreHeader(context)

      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia || !args.filter || !store) {
        return context.m2.Query.products({ root, args, context, info })
      }

      const { engine, ...filters } = args.filter

      const [searchResults, attrList, categoryList, storeConfig] = await Promise.all([
        context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName: `${import.meta.graphCommerce.algoliaIndexNamePrefix}${store}_products`,
            input: {
              query: args.search,
              facets: ['*'],
              hitsPerPage: args.pageSize ? args.pageSize : 10,
              facetFilters: productFilterInputToAlgoliafacetFiltersInput(filters),
            },
          },
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
          context,
          info,
        }),
        ...getMagento2MetaCached(context, !!args.search),
      ])

      return {
        items: (searchResults?.hits ?? [])
          ?.filter(nonNullable)
          .map((h) => algoliaHitToMagentoProduct(h, storeConfig)),
        aggregations: mapAlgoliaFacetsToAggregations(
          searchResults?.facets?.additionalProperties as AlgoliaFacets,
          attrList,
          categoryList,
        ),
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
