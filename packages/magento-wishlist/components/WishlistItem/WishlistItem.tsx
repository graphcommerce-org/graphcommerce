import { InputMaybe } from '@graphcommerce/graphql-mesh'
import { Box, Button, SxProps, Theme } from '@mui/material'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'
import { Trans } from '@lingui/react'
import { useProductLink } from '@graphcommerce/magento-product'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = WishlistItemProductFragment & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  children?: React.ReactNode
} & OptionalProductWishlistParent & { isConfigurableUncompleted?: boolean }

export function WishlistItem(props: WishlistItemProps) {
  const {
    sku,
    name,
    price_range,
    selectedOptions,
    isConfigurableUncompleted = false,
    __typename: productType,
    url_key,
  } = props

  const productLink = useProductLink({ url_key, __typename: productType })

  return (
    <WishlistItemBase {...props}>
      {isConfigurableUncompleted ? (
        <Button
          color='primary'
          variant='text'
          size='medium'
          sx={{ width: '100px' }}
          href={productLink}
        >
          <Trans id='Configure' />
        </Button>
      ) : (
        <Box>
          <ProductAddToCart
            variables={{ sku: sku ?? '', quantity: 1, selectedOptions }}
            name={name ?? ''}
            price={price_range.minimum_price.final_price}
          />
          {selectedOptions}
        </Box>
      )}
    </WishlistItemBase>
  )
}
