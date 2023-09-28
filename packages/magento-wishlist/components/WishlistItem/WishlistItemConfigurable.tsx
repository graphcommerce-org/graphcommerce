import { useProductLink } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, SxProps, Theme } from '@mui/material'
import { WishListItem } from '../../hooks'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type ConfigurableOptions = {
  configurable_options?:
    | ({
        configurable_product_option_uid: string
        configurable_product_option_value_uid: string
        option_label: string
        value_label: string
      } | null)[]
    | undefined
    | null
}

export type WishlistItemConfigurableProps = WishListItem & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
} & OptionalProductWishlistParent &
  ConfigurableOptions

export function WishlistItemConfigurable(props: WishlistItemConfigurableProps) {
  const { product, configurable_options } = props

  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename || 'SimpleProduct',
  })

  const selectedOptions = configurable_options
    ?.map((option) => option?.configurable_product_option_value_uid)
    .filter(nonNullable)

  const labels = configurable_options?.map((option) => option?.value_label)

  // Check if Configurable is not completed, if not completed show configure button instead of add to cart.
  const isConfigurableUncompleted =
    (product?.__typename === 'ConfigurableProduct' &&
      product?.configurable_options?.length !== configurable_options?.length) ||
    configurable_options?.some(
      (option) =>
        option?.configurable_product_option_value_uid === null ||
        option?.configurable_product_option_value_uid === undefined,
    )

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
            variables={{
              sku: product?.sku ?? '',
              quantity: 1,
              selectedOptions: selectedOptions || [],
            }}
            name={product?.name ?? ''}
            price={product?.price_range.minimum_price.final_price ?? {}}
          />
        </Box>
      )}
      {labels}
    </WishlistItemBase>
  )
}
