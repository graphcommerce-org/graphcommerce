import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { useProductFiltersPro } from './ProductFiltersPro'
import { excludeCategory } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'

export type Aggregation = Omit<
  NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>,
  'label' | '__typename'
> & { label?: React.ReactNode }

export type FilterProps = {
  aggregation: Aggregation
}

export type FilterRenderer = Record<string, React.FC<FilterProps>>

export type ProductFiltersProAggregationsProps = {
  filterTypes: Record<string, string | undefined>
  renderer?: FilterRenderer
  appliedAggregations?: ProductListFiltersFragment['aggregations']
  aggregations?: (Aggregation | null)[] | null
}

export function ProductFiltersProAggregations(props: ProductFiltersProAggregationsProps) {
  const { aggregations, appliedAggregations, filterTypes, renderer } = props
  const { params } = useProductFiltersPro()

  return (
    <>
      {excludeCategory(
        applyAggregationCount(aggregations, appliedAggregations, params),
        params,
      ).map((aggregation) => {
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

        return <Component key={aggregation.attribute_code} aggregation={aggregation} {...props} />
      })}
    </>
  )
}
