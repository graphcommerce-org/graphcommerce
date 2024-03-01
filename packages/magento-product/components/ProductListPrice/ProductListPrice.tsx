import { Money } from '@graphcommerce/magento-store'
import { cssFlag, cssNotFlag, extendableComponent } from '@graphcommerce/next-ui'
import { TypographyProps, Box, Skeleton } from '@mui/material'
import { ProductListPriceFragment } from './ProductListPrice.gql'

export const productListPrice = extendableComponent('ProductListPrice', [
  'root',
  'discountPrice',
] as const)

const { classes, selectors } = productListPrice

export type ProductListPriceProps = ProductListPriceFragment &
  Pick<TypographyProps, 'sx'> & { mask?: boolean }

export function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx, mask } = props

  return (
    <>
      <Box
        className={classes.root}
        sx={[
          { typography: 'body1', [cssFlag('signed-in')]: { display: mask ? 'none' : undefined } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {regular_price.value !== final_price.value && (
          <Box
            component='span'
            sx={{
              textDecoration: 'line-through',
              color: 'text.disabled',
              marginRight: '8px',
            }}
            className={classes.discountPrice}
          >
            <Money {...regular_price} />
          </Box>
        )}
        <Money {...final_price} />
      </Box>

      <Skeleton
        variant='text'
        sx={{
          width: regular_price.value !== final_price.value ? '100px' : '50px',
          display: 'inline-block',
          [cssFlag('signed-in')]: { display: mask ? 'inherit' : 'none' },
          [cssNotFlag('signed-in')]: { display: 'none' },
        }}
      />
    </>
  )
}

ProductListPrice.selectors = selectors
