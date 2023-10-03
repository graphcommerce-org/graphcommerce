import type { ConfigurableOptions, WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import { ProductAddToCart } from '@graphcommerce/magento-wishlist/components/WishlistItem/ProductAddToCart'
import type { PluginProps } from '@graphcommerce/next-config'
import { nonNullable } from '@graphcommerce/next-ui'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

export function ConfigurableWishlistItemActionCard(
  props: PluginProps<React.ComponentProps<typeof WishlistItemActionCard> & ConfigurableOptions>,
) {
  const { Prev, configurable_options, product, ...rest } = props

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
  if (rest.__typename !== 'ConfigurableWishlistItem') return <Prev {...props} />

  return (
    <Prev
      {...props}
      secondaryAction={
        isConfigurableUncompleted
          ? 'uncompleted'
          : product?.name &&
            product?.sku &&
            product?.price_range.minimum_price.final_price && (
              <ProductAddToCart
                variables={{ sku: product.sku, quantity: 1, selectedOptions }}
                name={product.name}
                price={product.price_range.minimum_price.final_price}
              />
            )
      }
    />
  )
}

export const Plugin = ConfigurableWishlistItemActionCard
