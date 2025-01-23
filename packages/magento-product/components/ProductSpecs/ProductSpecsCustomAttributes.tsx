import { extendableComponent, ListFormat } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { ProductSpecsFragment } from './ProductSpecs.gql'

const name = 'ProductSpecs'
const parts = ['root', 'specs', 'options'] as const
const { classes } = extendableComponent(name, parts)

export type ProductSpecsCustomAttributesProps = Pick<ProductSpecsFragment, 'items'>

export function ProductSpecsCustomAttributes(props: ProductSpecsCustomAttributesProps) {
  const { items } = props

  const specs = items?.[0]?.custom_attributesV2?.items

  if (items?.length === 0) return null

  return (
    <>
      {specs?.map((item) => (
        <li key={item?.code}>
          <div>{item?.attribute?.label}</div>
          <Box className={classes.options}>
            {item?.__typename === 'AttributeSelectedOptions' && (
              <ListFormat listStyle='long' type='unit'>
                {item?.selected_options?.map((option) => (
                  <span key={option?.value}>{option?.label === '1' ? 'Yes' : option?.label}</span>
                ))}
              </ListFormat>
            )}
            {item?.__typename === 'AttributeValue' && <span key={item?.value}>{item.value}</span>}
          </Box>
        </li>
      ))}
    </>
  )
}
