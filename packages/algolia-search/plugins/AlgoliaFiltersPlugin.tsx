import { AlgoliaFilterAttribute } from '@graphcommerce/graphql-mesh'
import { FilterTypes, ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import { RenderChip } from '../components/FilterChip/RenderChip'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'ProductListFilters'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

const systemFilters = [
  { key: 'category_uid', algoliaKey: 'categories.level0' },
  { key: 'price', algoliaKey: 'price.EUR.default' },
]

interface FilterWithTypes extends AlgoliaFilterAttribute {
  type: FilterTypes[number]
}

function AlgoliaFilters(props: ProductFiltersProps) {
  const { filterTypes, aggregations } = props
  const filtersFromConfig =
    useStorefrontConfig().algoliaFilterAttributes ??
    import.meta.graphCommerce.algoliaFilterAttributes

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

  // <RefinementFilterChip
  //         // eslint-disable-next-line react/no-array-index-key
  // key={v.aggregation}
  // attribute={v.toAlgoliaAttribute}
  // title={
  //   aggregations.find((a) => a?.attribute_code === v.aggregation)?.label ??
  //   v.aggregation.charAt(0).toUpperCase() + v.aggregation.slice(1)
  // }
  //       />
  //     )

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

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaFiltersPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  const search = useSearchRoute()
  if (!search) return <Prev {...props} />

  return <AlgoliaFilters {...rest} />
}

export const Plugin = AlgoliaFiltersPlugin
