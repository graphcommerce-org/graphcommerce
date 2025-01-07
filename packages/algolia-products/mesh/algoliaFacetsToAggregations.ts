import type {
  Aggregation,
  AggregationOption,
  AlgoliasearchResponse,
  CategoryResult,
  MeshContext,
} from '@graphcommerce/graphql-mesh'
import type { AttributeList } from './getAttributeList'
import type { GetStoreConfigReturn } from './getStoreConfig'

type AlgoliaFacets = { [facetName: string]: AlgoliaFacetOption }
type AlgoliaFacetOption = { [facetOption: string]: number }

function categoryMapping(
  categoryList: CategoryResult | null | undefined,
  facetList: AlgoliaFacetOption,
): AggregationOption[] {
  if (!categoryList?.items) {
    return []
  }

  return categoryList?.items
    ?.map((category) => {
      const count = category?.id ? facetList[category?.id] : 0
      return { label: category?.name, value: category?.uid ?? '', count }
    })
    .filter((category) => category.count > 0)
}

function compare(a, b) {
  const numberA: number = +a[0]
  const numberB: number = +b[0]

  if (numberA < numberB) {
    return -1
  }
  if (numberA > numberB) {
    return 1
  }

  return 0
}

/** @public */
export function algoliaPricesToPricesAggregations(pricesList: {
  [key: string]: number
}): AggregationOption[] {
  const priceArraylist: { value: number; count: number }[] = Object.entries(pricesList)
    .sort(compare)
    .map((price) => {
      const value: number = +price[0]
      return { value, count: price[1] }
    })

  const interval = Math.round(
    (priceArraylist[priceArraylist.length - 1].value - priceArraylist[0].value) / 2,
  )

  const pricesBucket: { [key: number]: { count: number; value: string; label: string } } = {}
  let increasingInterval = interval
  priceArraylist.forEach((price) => {
    if (price.value <= increasingInterval) {
      if (!pricesBucket[increasingInterval]) {
        pricesBucket[increasingInterval] = {
          count: price.count,
          value:
            increasingInterval === interval
              ? `0_${interval}`
              : `${increasingInterval - interval}_${increasingInterval}`,
          label:
            increasingInterval === interval
              ? `0_${interval}`
              : `${increasingInterval - interval}-${increasingInterval}`,
        }
      } else {
        pricesBucket[increasingInterval].count += price.count
      }
    } else {
      increasingInterval += interval
      pricesBucket[increasingInterval] = {
        count: price.count,
        value:
          increasingInterval === interval
            ? `0_${interval}`
            : `${increasingInterval - interval}_${increasingInterval}`,
        label:
          increasingInterval === interval
            ? `0-${interval}`
            : `${increasingInterval - interval}-${increasingInterval}`,
      }
    }
    if (
      price.value === increasingInterval &&
      priceArraylist[priceArraylist.length - 1].value !== price.value
    ) {
      increasingInterval += interval
      pricesBucket[increasingInterval] = {
        count: price.count,
        value:
          increasingInterval === interval
            ? `0_${interval}`
            : `${increasingInterval - interval}_${increasingInterval}`,
        label:
          increasingInterval === interval
            ? `0_${interval}`
            : `${increasingInterval - interval}-${increasingInterval}`,
      }
    }
  })
  return Object.values(pricesBucket)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertAlgoliaFacets(facets: any): facets is AlgoliaFacets {
  return true
}

/**
 * Map algolia facets to aggregations format
 *
 * TODO: Make sure the aggregations are sorted correctly:
 * https://magento-247-git-canary-graphcommerce.vercel.app/men/photography, through position
 */
export function algoliaFacetsToAggregations(
  algoliaFacets: AlgoliasearchResponse['facets'],
  attributes: AttributeList,
  storeConfig: GetStoreConfigReturn,
  categoryList?: null | CategoryResult,
  groupId?: number,
): Aggregation[] {
  if (!storeConfig?.default_display_currency_code) throw new Error('Currency is required')
  const aggregations: Aggregation[] = []

  if (!assertAlgoliaFacets(algoliaFacets)) throw Error('these are not facets')

  Object.entries(algoliaFacets).forEach(([facetIndex, facet]) => {
    let attribute_code = facetIndex

    if (facetIndex.startsWith('categories.level')) return
    if (facetIndex.startsWith('price')) {
      attribute_code = 'price'
    }

    const position = 0

    const label =
      attributes?.find((attribute) => attribute?.code === attribute_code)?.label ?? attribute_code
    if (facetIndex === 'categoryIds') {
      aggregations.push({
        label,
        attribute_code: 'category_uid',
        options: categoryMapping(categoryList, algoliaFacets[facetIndex]),
        position,
      })
    } else if (facetIndex.startsWith('price')) {
      if (!groupId && facetIndex !== `price.${storeConfig.default_display_currency_code}.default`) {
        return
      }
      if (
        groupId &&
        facetIndex !== `price.${storeConfig.default_display_currency_code}.group_${groupId}`
      ) {
        return
      }
      aggregations.push({
        label,
        attribute_code,
        options: algoliaPricesToPricesAggregations(algoliaFacets[facetIndex]),
        position,
      })
    } else {
      // Fallback to code if no label is found
      aggregations.push({
        label,
        attribute_code,
        options: Object.entries(facet).map(([filter, count]) => ({
          label: filter,
          count,
          value: filter,
        })),
        position,
      })
    }
  })

  return aggregations
}

let categoryListCache: CategoryResult | null = null

export async function getCategoryList(context: MeshContext) {
  if (categoryListCache) return categoryListCache

  // context.cache.get('algolia_getCategoryList')

  categoryListCache = await context.m2.Query.categories({
    args: { filters: {} },
    selectionSet: /* GraphQL */ `
      {
        items {
          uid
          name
          id
          position
        }
      }
    `,
    context,
  })

  return categoryListCache!
}
