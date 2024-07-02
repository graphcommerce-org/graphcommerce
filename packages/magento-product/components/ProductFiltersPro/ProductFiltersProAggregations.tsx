import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { ProductFilterEqualChip } from './ProductFilterEqualChip'
import { ProductFilterEqualSection } from './ProductFilterEqualSection'
import { ProductFilterRangeChip } from './ProductFilterRangeChip'
import { ProductFilterRangeSection } from './ProductFilterRangeSection'
import { useProductFiltersPro } from './ProductFiltersPro'
import { excludeCategory } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'

export type FilterProps = {
  aggregation: NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>
}

export type FilterRenderer = Record<string, React.FC<FilterProps>>

export type ProductFiltersProAggregationsProps = {
  renderer?: FilterRenderer
}

export const productFiltersProSectionRenderer = {
  FilterRangeTypeInput: ProductFilterRangeSection,
  FilterEqualTypeInput: ProductFilterEqualSection,
}

export const productFiltersProChipRenderer = {
  FilterEqualTypeInput: ProductFilterEqualChip,
  FilterRangeTypeInput: ProductFilterRangeChip,
}

export function ProductFiltersProAggregations(props: ProductFiltersProAggregationsProps) {
  const { renderer } = props
  const { params, aggregations, appliedAggregations, filterTypes } = useProductFiltersPro()

  return (
    <>
      {excludeCategory(applyAggregationCount(aggregations, appliedAggregations, params)).map(
        (aggregation) => {
          const filterType = filterTypes[aggregation.attribute_code]
          if (!filterType) return null

          const Component = renderer?.[filterType]
          if (!Component) {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.log(
                `The renderer for filterType ${filterType} can not be found, please add it to the renderer prop: renderer={{ ${filterType}: (props) => <>MYRenderer</> }}}}`,
              )
            }
            return null
          }

          return <Component key={aggregation.attribute_code} aggregation={aggregation} {...props} />
        },
      )}
    </>
  )
}
