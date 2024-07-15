import type {
  Aggregation,
  AggregationOption,
  CategoryResult,
  CategoryTree,
} from '@graphcommerce/graphql-mesh'
import { AttributeList } from './attributeList'

type AlgoliaFacets = { [facetName: string]: AlgoliaFacetOption }
type AlgoliaFacetOption = { [facetOption: string]: number }

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

// Map algolia facets to aggregations format
export function algoliaFacetsToAggregations(
  algoliaFacets: any,
  attributes: AttributeList,
  categoryList?: null | CategoryResult,
): Aggregation[] {
  const aggregations: Aggregation[] = []

  Object.keys(algoliaFacets as AlgoliaFacets).forEach((facetIndex) => {
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
