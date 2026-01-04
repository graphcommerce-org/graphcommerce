import type {
  Aggregation,
  AggregationOption,
  AlgoliasearchResponse,
  CategoryResult,
  MeshContext,
} from '@graphcommerce/graphql-mesh'
import type { FilterTypes } from '@graphcommerce/magento-product'
import type { AttributeList } from './getAttributeList'
import { getIndexName } from './getIndexName'
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
export function algoliaPricesToPricesAggregations(
  pricesList: AlgoliaFacetOption,
): AggregationOption[] {
  const priceArraylist: { value: number; count: number }[] = Object.entries(pricesList)
    .sort(compare)
    .map((price) => ({ value: Number(+price[0]), count: price[1] }))

  let minValue = priceArraylist[0].value
  const maxValue = priceArraylist[priceArraylist.length - 1].value
  if (minValue === maxValue) minValue = 0

  return [
    {
      value: `${minValue}_${maxValue}`,
      label: `${minValue}-${maxValue}`,
      count: priceArraylist.reduce((acc, price) => acc + price.count, 0),
    },
  ]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertAlgoliaFacets(facets: any): facets is AlgoliaFacets {
  return true
}

/**
 * Map algolia facets to aggregations format
 * https://magento-247-git-canary-graphcommerce.vercel.app/men/photography, through position
 */
export function algoliaFacetsToAggregations(
  algoliaFacets: AlgoliasearchResponse['facets'],
  attributes: AttributeList,
  storeConfig: GetStoreConfigReturn,
  filterTypes: FilterTypes,
  categoryList?: null | CategoryResult,
  groupId?: number,
): Aggregation[] {
  if (!storeConfig?.default_display_currency_code)
    throw new Error(
      `Currency is required. StoreConfig default_display_currency_code is not set. This usually means the storeConfig query failed or the store doesn't have a default currency configured.`,
    )
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
    } else if (filterTypes[attribute_code] === 'PRICE') {
      aggregations.push({
        label,
        attribute_code,
        options: algoliaPricesToPricesAggregations(facet),
        position,
      })
    } else {
      aggregations.push({
        label,
        attribute_code,
        options: Object.entries(facet).map(([filter, count]) => ({
          label: filter,
          count,
          // @see productFilterInputToAlgoliafacetFiltersInput for the other side.
          value: filter.replaceAll('/', '_OR_').replaceAll(',', '_AND_'),
        })),
        position,
      })
    }
  })

  return aggregations
}

export async function getCategoryList(context: MeshContext) {
  const cacheKey = `algolia_getCategoryList_${getIndexName(context)}`
  const categoryListCached = context.cache.get(cacheKey)

  if (categoryListCached) return categoryListCached as CategoryResult
  const categoryListCache = await context.m2.Query.categories({
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

  if (!categoryListCache) throw new Error('Category list not found')
  await context.cache.set(cacheKey, categoryListCache)

  return categoryListCache
}
