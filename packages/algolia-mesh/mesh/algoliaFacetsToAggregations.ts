import type {
  Aggregation,
  AggregationOption,
  CategoryResult,
  CategoryTree,
} from '@graphcommerce/graphql-mesh'
import { AttributeList } from './attributeList'

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

function assertAlgoliaFacets(facets: any): facets is AlgoliaFacets {
  return true
}

/**
 * Map algolia facets to aggregations format
 *
 * TODO: Make sure the aggregations are sorted correctly: https://magento-247-git-canary-graphcommerce.vercel.app/men/photography
 */
export function algoliaFacetsToAggregations(
  algoliaFacets: any,
  attributes: AttributeList,
  categoryList?: null | CategoryResult,
): Aggregation[] {
  const aggregations: Aggregation[] = []

  if (!assertAlgoliaFacets(algoliaFacets)) throw Error('these are not facets')

  // Price aggregation:
  // 'price.EUR.default': { '5': 1, '14': 47, '4.95': 302, '9.99': 84, '2.48': 1 },
  // 'price.USD.default': { '6.3167': 302, '12.7577': 84, '17.8766': 47, '3.164': 1, '6.3845': 1 },

  // Select the right one EUR/USD
  // Sort the aggregations by the numeric value of the key.
  // Add as price aggregation
  Object.entries(algoliaFacets).forEach(([facetIndex, facet]) => {
    let attribute_code = facetIndex

    if (facetIndex.startsWith('categories.level')) return

    // TODO select the correct price facet.
    if (facetIndex.startsWith('price')) {
      attribute_code = 'price'

      // The price should become something like this:

      // Sort all options and generate the label and value ranges.
      // {
      //   "attribute_code": "price",
      //   "count": 2,
      //   "label": "Price",
      //   "options": [
      //     {
      //       "count": 388,
      //       "label": "0-11.3",
      //       "value": "0_11.3"
      //     },
      //     {
      //       "count": 47,
      //       "label": "11.3-22.6",
      //       "value": "11.3_22.6"
      //     }
      //   ],
      //   "position": null
      // },
    }

    if (facetIndex === 'categoryIds') {
      attribute_code = 'category_uid'
    }

    //todo
    const position = 0
    const options = Object.entries(facet).map(([filter, count]) => {
      return {
        label: filter,
        count,
        value: filter,
      }
    })

    const label =
      attributes?.find((attribute) => attribute?.code === attribute_code)?.label ?? attribute_code
    if (facetIndex === 'categoryIds') {
      aggregations.push({
        label,
        attribute_code,
        options: categoryMapping(categoryList, algoliaFacets[facetIndex]),
        position,
      })
    } else {
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
