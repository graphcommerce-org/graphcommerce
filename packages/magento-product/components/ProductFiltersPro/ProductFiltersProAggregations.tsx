import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'

export type FilterProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[number]
>

export type FilterRenderer = Record<string, React.FC<FilterProps>>

export type ProductFiltersProAggregationsProps = {
  filterTypes: Record<string, string | undefined>
  renderer?: FilterRenderer
} & ProductListFiltersFragment

export function ProductFiltersProAggregations(props: ProductFiltersProAggregationsProps) {
  const { aggregations, filterTypes, renderer } = props

  return (
    <>
      {filterNonNullableKeys(aggregations)
        .filter((aggregation) => aggregation.attribute_code !== 'category_id')
        .map((aggregation) => {
          const filterType = filterTypes[aggregation.attribute_code]
          if (!filterType) return null

          const Component = renderer?.[filterType]
          if (!Component) {
            if (process.env.NODE_ENV === 'development') {
              console.log(
                `The renderer for fitlerType ${filterType} can not be found, please add it to the renderer prop: renderer={{ ${filterType}: (props) => <>MYRenderer</> }}}}`,
              )
            }
            return null
          }

          return <Component key={aggregation.attribute_code} {...aggregation} {...props} />
        })}
    </>
  )
}
