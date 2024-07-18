import type {
  Aggregation,
  AggregationOption,
  CategoryResult,
  CategoryTree,
} from '@graphcommerce/graphql-mesh'
import { AttributeList } from './attributeList'
import { GetStoreConfigReturn } from './getStoreConfig'

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
    .filter((category) => {
      if (category.count > 0) {
        return category
      }
    })
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

function algoliaPricesToPricesAggregations(
  pricesList: { [key: string]: number },
  currency,
): AggregationOption[] {
  const priceArraylist: { value: number; count: number }[] = Object.entries(pricesList)
    .sort(compare)
    .map((price) => {
      const value: number = +price[0]
      return { value, count: price[1] }
    })
  let interval = Math.round(
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
            increasingInterval == interval
              ? `0_${interval}`
              : `${increasingInterval - interval}_${increasingInterval}`,
          label:
            increasingInterval == interval
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
          increasingInterval == interval
            ? `0_${interval}`
            : `${increasingInterval - interval}_${increasingInterval}`,
        label:
          increasingInterval == interval
            ? `0_${interval}`
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
          increasingInterval == interval
            ? `0_${interval}`
            : `${increasingInterval - interval}_${increasingInterval}`,
        label:
          increasingInterval == interval
            ? `0_${interval}`
            : `${increasingInterval - interval}-${increasingInterval}`,
      }
    }
  })
  return Object.values(pricesBucket)

  // const arrayLength = Math.ceil(priceArraylist[priceArraylist.length - 1].value / interval)
  // const pricesOptions: AggregationOption[] = []

  // for (let i = 0; i < arrayLength; i++) {
  //   const counts = priceArraylist.filter((price) => {
  //     const priceValue: number = +price.value
  //     if (priceValue >= interval * i && priceValue <= interval * (i + 1)) {
  //       return price
  //     }
  //   })
  //   let totalCount = 0
  //   counts.forEach((count) => {
  //     totalCount += count.count
  //   })

  //   pricesOptions.push({
  //     label: `${interval * i}-${interval * (i + 1)}`,
  //     value: `${interval * i}_${interval * (i + 1)}`,
  //     count: totalCount,
  //   })
  // }
  // return pricesOptions
}

function assertAlgoliaFacets(facets: any): facets is AlgoliaFacets {
  return true
}

/**
 * Map algolia facets to aggregations format
 *
 * TODO: Make sure the aggregations are sorted correctly: https://magento-247-git-canary-graphcommerce.vercel.app/men/photography, through position
 */
export function algoliaFacetsToAggregations(
  algoliaFacets: any,
  attributes: AttributeList,
  storeConfig: GetStoreConfigReturn,
  categoryList?: null | CategoryResult,
): Aggregation[] {
  if (!storeConfig?.default_display_currency_code) throw new Error('Currency is required')
  const aggregations: Aggregation[] = []

  if (!assertAlgoliaFacets(algoliaFacets)) throw Error('these are not facets')

  Object.entries(algoliaFacets).forEach(([facetIndex, facet]) => {
    let attribute_code = facetIndex
    let options = []
    if (facetIndex.startsWith('categories.level')) return

    // TODO select the correct price facet.
    if (facetIndex.startsWith('price')) {
      attribute_code = 'price'
    }

    //todo
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
      if (facetIndex !== `price.${storeConfig.default_display_currency_code}.default`) {
        return
      }
      aggregations.push({
        label,
        attribute_code: 'price',
        options: algoliaPricesToPricesAggregations(
          algoliaFacets[facetIndex],
          storeConfig.default_display_currency_code,
        ),
        position,
      })
    } else {
      const options = Object.entries(facet).map(([filter, count]) => {
        return {
          label: filter,
          count,
          value: filter,
        }
      })
      aggregations.push({
        label,
        attribute_code,
        options,
        position,
      })
    }
  })

  return aggregations
}
