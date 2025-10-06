import { PrivateQueryMask } from '@graphcommerce/graphql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { ProductListPrice } from '../ProductListPrice/ProductListPrice'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'

export type ProductPagePriceTiersProps = {
  sx?: SxProps<Theme>
  product: ProductPagePriceFragment
}

export function ProductPagePriceTiers(props: ProductPagePriceTiersProps) {
  const { product, sx = [] } = props

  const priceTiers = filterNonNullableKeys(product?.price_tiers, [
    'quantity',
    'final_price',
    'discount',
  ])

  if (!priceTiers.length) return null

  return (
    <PrivateQueryMask sx={sx} variant='rectangular'>
      {priceTiers.map(({ quantity, final_price, discount }) => (
        <div key={quantity}>
          <Trans
            id='Buy {quantity} for <0/> and save {percent}%'
            components={{
              0: <ProductListPrice final_price={final_price} regular_price={final_price} />,
            }}
            values={{ quantity, percent: discount.percent_off }}
          />
        </div>
      ))}
    </PrivateQueryMask>
  )
}
