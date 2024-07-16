import type { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui/server'
import { algoliaFacetsToAggregations } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { attributeList } from './attributeList'
import { getStoreConfig } from './getStoreConfig'
import { productFilterInputToAlgoliafacetFiltersInput } from './productFilterInputToAlgoliafacetFiltersInput'
import { nonNullable } from './utils'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

function getIndexName(context: MeshContext) {
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  return `${import.meta.graphCommerce.algoliaIndexNamePrefix}${storeCode}_products`
}

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.products({ root, args, context, info })

      const { engine, ...filters } = args.filter ?? {}

      const [searchResults, attrList, categoryList, storeConfig] = await Promise.all([
        context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName: getIndexName(context),
            input: {
              query: args.search ?? '',
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
        attributeList(context, !!args.search),
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
      ])

      const hits = (searchResults?.hits ?? [])?.filter(nonNullable)

      return {
        items: hits.map((hit) => algoliaHitToMagentoProduct(hit, storeConfig)),
        aggregations: algoliaFacetsToAggregations(
          searchResults?.facets?.additionalProperties,
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
