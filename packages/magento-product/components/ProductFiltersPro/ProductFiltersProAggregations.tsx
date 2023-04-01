import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { useProductFiltersPro } from './ProductFiltersPro'

export type FilterProps = {
  aggregation: NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>
}

export type FilterRenderer = Record<string, React.FC<FilterProps>>

export type ProductFiltersProAggregationsProps = ProductListFiltersFragment & {
  filterTypes: Record<string, string | undefined>
  renderer?: FilterRenderer
  aggregationsCount?: NonNullable<ProductListQuery['products']>['aggregations']
}

export function ProductFiltersProAggregations(props: ProductFiltersProAggregationsProps) {
  const { aggregations, aggregationsCount, filterTypes, renderer } = props
  const { params } = useProductFiltersPro()

  return (
    <>
      {filterNonNullableKeys(aggregations)
        .filter(({ attribute_code }) => {
          if (params.search !== null) return true
          return attribute_code !== 'category_id' && attribute_code !== 'category_uid'
        })
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

          return <Component key={aggregation.attribute_code} aggregation={aggregation} {...props} />
        })}
    </>
  )
}
