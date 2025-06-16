import { PrivateQueryMask } from '@graphcommerce/graphql'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import { Box, type TypographyProps } from '@mui/material'
import type { ProductListPriceFragment } from './ProductListPrice.gql'

export const productListPrice = extendableComponent('ProductListPrice', [
  'prefix',
  'root',
  'finalPrice',
  'discountPrice',
  'suffix',
] as const)

const { classes } = productListPrice

export type ProductListPriceProps = ProductListPriceFragment &
  Pick<TypographyProps, 'sx'> & {
    prefix?: React.ReactNode
    suffix?: React.ReactNode
  }

export function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx, prefix, suffix } = props

  return (
    <Box
      className={classes.root}
      sx={sxx({ typography: 'body1', display: 'inline-flex', columnGap: '0.3em' }, sx)}
    >
      {prefix && (
        <PrivateQueryMask
          component='span'
          skeleton={{
            variant: 'text',
            sx: { width: '3.5em', transform: 'none' },
          }}
          className={classes.prefix}
        >
          {prefix}
        </PrivateQueryMask>
      )}

      {regular_price.value !== final_price.value && (
        <PrivateQueryMask
          component='span'
          sx={{
            textDecoration: 'line-through',
            color: 'text.disabled',
          }}
          skeleton={{
            variant: 'text',
            sx: { width: '3.5em', transform: 'none' },
          }}
          className={classes.discountPrice}
        >
          <Money {...regular_price} />
        </PrivateQueryMask>
      )}

      <PrivateQueryMask
        className={classes.finalPrice}
        component='span'
        skeleton={{
          variant: 'text',
          sx: { width: '3.5em', transform: 'none' },
        }}
      >
        <Money {...final_price} />
      </PrivateQueryMask>

      {suffix && (
        <PrivateQueryMask
          component='span'
          skeleton={{
            variant: 'text',
            sx: { width: '3.5em', transform: 'none' },
          }}
          className={classes.suffix}
        >
          {suffix}
        </PrivateQueryMask>
      )}
    </Box>
  )
}
