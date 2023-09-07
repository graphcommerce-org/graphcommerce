import { InputMaybe } from '@graphcommerce/graphql-mesh'
import { useProductLink } from '@graphcommerce/magento-product'
import { Trans } from '@lingui/react'
import { Box, Button, SxProps, Theme } from '@mui/material'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = WishlistItemProductFragment & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  children?: React.ReactNode
  isConfigurableUncompleted?: boolean
  selectedOptionsLabels?: InputMaybe<string[]> | undefined
} & OptionalProductWishlistParent

export function WishlistItem(props: WishlistItemProps) {
  const {
    sku,
    name,
    price_range,
    selectedOptions,
    selectedOptionsLabels,
    isConfigurableUncompleted = false,
    __typename: productType,
    url_key,
  } = props

  const productLink = useProductLink({ url_key, __typename: productType })

  return (
    <WishlistItemBase {...props}>
      {isConfigurableUncompleted ? (
        <Box
          sx={{
            gridArea: 'itemCartButton',
            alignSelf: 'flex-start',
            ml: '8px',
            position: 'absolute',
            left: '0',
            bottom: '-35px',
          }}
        >
          <Button
            color='primary'
            variant='text'
            size='medium'
            sx={{ width: '100px' }}
            href={productLink}
          >
            <Trans id='Configure' />
          </Button>
        </Box>
      ) : (
        <Box>
          <ProductAddToCart
            variables={{ sku: sku ?? '', quantity: 1, selectedOptions }}
            name={name ?? ''}
            price={price_range.minimum_price.final_price}
          />
        </Box>
      )}
      {selectedOptionsLabels}
    </WishlistItemBase>
  )
}
