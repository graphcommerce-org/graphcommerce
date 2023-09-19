import { useQuery } from '@graphcommerce/graphql'
import { useProductLink } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, SxProps, Theme } from '@mui/material'
import { ConfigurableOptions } from '../../hooks'
import { GetProductsBySkuDocument } from './GetProductsBySku.gql'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = WishlistItemProductFragment & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
} & OptionalProductWishlistParent &
  ConfigurableOptions

export function WishlistItem(props: WishlistItemProps) {
  const { sku, name, price_range, configurable_options, __typename, wishlistItemId, url_key } =
    props

  const productLink = useProductLink({ url_key, __typename })

  // Retrieve product so we can check the available configurable options
  const product = useQuery(GetProductsBySkuDocument, {
    ssr: false,
    variables: { filters: { sku: { eq: sku } } },
    skip: !sku,
  }).data?.products?.items?.[0]

  const selectedOptions = configurable_options
    ?.map((option) => option.configurable_product_option_value_uid)
    .filter(nonNullable)

  const labels = configurable_options?.map((option) => option.value_label)

  // Check if Configurable is not completed, if not completed show configure button instead of add to cart.
  const isConfigurableUncompleted =
    (product?.__typename === 'ConfigurableProduct' &&
      product?.configurable_options?.length !== configurable_options?.length) ||
    configurable_options?.some(
      (option) =>
        option.configurable_product_option_value_uid === null ||
        option.configurable_product_option_value_uid === undefined,
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
            href={`${productLink}?wishlistItemId=${wishlistItemId}`}
          >
            <Trans id='Configure' />
          </Button>
        </Box>
      ) : (
        <Box>
          <ProductAddToCart
            variables={{
              sku: sku ?? '',
              quantity: 1,
              selectedOptions: selectedOptions || [],
            }}
            name={name ?? ''}
            price={price_range.minimum_price.final_price}
          />
        </Box>
      )}
      {labels}
    </WishlistItemBase>
  )
}
