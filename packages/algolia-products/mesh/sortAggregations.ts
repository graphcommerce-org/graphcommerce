import type { Aggregation, AlgoliasearchResponse } from '@graphcommerce/graphql-mesh'

/** Sort the aggregations based on the ordering given by Algolia. */
export function sortAggregations(
  aggregations: Aggregation[],
  renderingContent: AlgoliasearchResponse['renderingContent'],
) {
  const order = renderingContent?.facetOrdering?.facets?.order
  /** @todo: Algolia also supports sorting the attribute values. */
  // const values = renderingContent?.facetOrdering?.values?.additionalProperties

  if (!order) return aggregations

  return aggregations
    .sort(
      (a, b) =>
        (order.indexOf(a.attribute_code) ?? Infinity) -
        (order.indexOf(b.attribute_code) ?? Infinity),
    )
    .filter((value) =>
      order.find((sortedAttributeCode) => value.attribute_code === sortedAttributeCode),
    )
}
