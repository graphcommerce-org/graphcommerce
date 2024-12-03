import type { AlgoliaFilterAttribute } from '@graphcommerce/graphql-mesh'
import type { FilterTypes, ProductFiltersProps } from '@graphcommerce/magento-product'
import { useMemo } from 'react'
import { useAlgoliaSearchIndexConfig } from '../../hooks/useAlgoliaSearchIndexConfig'
import { RenderChip } from '../Chip/RenderChip'

const systemFilters = [
  { key: 'category_uid', algoliaKey: 'categories.level0' },
  { key: 'price', algoliaKey: 'price.EUR.default' },
]

interface FilterWithTypes extends AlgoliaFilterAttribute {
  type: FilterTypes[number]
}

export function AlgoliaFilters(props: ProductFiltersProps) {
  const { filterTypes, aggregations } = props

  const filtersFromConfig = useAlgoliaSearchIndexConfig('_products')?.filterAttributes

  const filters = useMemo(() => {
    const allValues: FilterWithTypes[] = []
    const filterTypesKeys = Object.keys(filterTypes)
    const reducedSystemFilters = systemFilters.filter((sf) =>
      filterTypesKeys.some((ftk) => sf.key === ftk),
    )
    const availableFilters = reducedSystemFilters.filter((rsf) =>
      aggregations?.some((a) => a?.attribute_code === rsf.key),
    )

    // Get all items from the system filters and convert them to FilterWithTypes
    availableFilters.forEach((item) => {
      allValues.push({
        aggregation: item.key,
        toAlgoliaAttribute: item.algoliaKey,
        type: filterTypes[item.key],
      })
    })

    // Get all items from the config and convert them to FilterWithTypes
    filtersFromConfig?.forEach((af) => {
      allValues.push({
        aggregation: af?.aggregation ?? '',
        toAlgoliaAttribute: af?.toAlgoliaAttribute ?? '',
        type: filterTypes[af?.aggregation ?? ''],
      })
    })

    // Return all values that are included in the default aggregations
    return allValues
  }, [aggregations, filterTypes, filtersFromConfig])

  if (!aggregations || !filters) return null

  return (
    <>
      {filters.map((v) => (
        <RenderChip
          __typename={v.type ?? 'FilterMatchTypeInput'}
          key={v.aggregation}
          attribute={v.toAlgoliaAttribute}
          title={
            aggregations.find((a) => a?.attribute_code === v.aggregation)?.label ??
            v.aggregation.charAt(0).toUpperCase() + v.aggregation.slice(1)
          }
        />
      ))}
    </>
  )
}
