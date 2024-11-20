import { extendableComponent } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { ProductSpecsFragment } from './ProductSpecs.gql'

const name = 'ProductSpecs'
const parts = ['root', 'specs', 'options'] as const
const { classes } = extendableComponent(name, parts)

export type ProductSpecsAggregationsProps = Pick<ProductSpecsFragment, 'aggregations'>

export function ProductSpecsAggregations(props: ProductSpecsAggregationsProps) {
  const { aggregations } = props
  const filter = ['price', 'category_id', 'size', 'new', 'sale', 'color']
  const specs = aggregations?.filter(
    (attr) => !filter.includes(attr?.attribute_code ?? '') && attr?.options?.[0]?.value !== '0',
  )

  if (specs?.length === 0) return null

  return (
    <>
      {specs?.map((aggregation) => (
        <li key={aggregation?.attribute_code}>
          <div>{aggregation?.label}</div>
          <Box className={classes.options} sx={{ display: 'grid', gridAutoFlow: 'row' }}>
            {aggregation?.options?.map((option) => (
              <span key={option?.value}>{option?.label === '1' ? 'Yes' : option?.label}</span>
            ))}
          </Box>
        </li>
      ))}
    </>
  )
}
