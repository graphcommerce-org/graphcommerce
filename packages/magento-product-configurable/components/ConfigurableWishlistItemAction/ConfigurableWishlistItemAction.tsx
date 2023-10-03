import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { type WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import { ProductAddToCart } from '@graphcommerce/magento-wishlist/components/WishlistItem/ProductAddToCart'
import { IconSvg, iconChevronRight, nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

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

type ConfigurableWishlistItemActionProps = WishlistItemActionCardProps & ConfigurableOptions

export function ConfigurableWishlistItemAction(props: ConfigurableWishlistItemActionProps) {
  const { configurable_options, product } = props

  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename ?? 'ConfigurableProduct',
  })

  const selectedOptions = configurable_options
    ?.map((option) => option?.configurable_product_option_value_uid)
    .filter(nonNullable)

  const isConfigurableUncompleted =
    (product?.__typename === 'ConfigurableProduct' &&
      product?.configurable_options?.length !== configurable_options?.length) ||
    configurable_options?.some(
      (option) =>
        option?.configurable_product_option_value_uid === null ||
        option?.configurable_product_option_value_uid === undefined,
    )

  return isConfigurableUncompleted ? (
    <Button
      variant='text'
      color='primary'
      size='medium'
      href={productLink}
      endIcon={<IconSvg src={iconChevronRight} />}
    >
      <Trans id='Configure' />
    </Button>
  ) : (
    product?.name && product?.sku && product?.price_range.minimum_price.final_price && (
      <ProductAddToCart
        variables={{ sku: product.sku, quantity: 1, selectedOptions }}
        name={product.name}
        price={product.price_range.minimum_price.final_price}
      />
    )
  )
}
