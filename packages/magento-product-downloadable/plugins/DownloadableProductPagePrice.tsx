import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  useFormAddProductsToCart,
  type AddToCartItemSelector,
  type ProductPagePriceProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import type { DownloadableProductOptionsFragment } from '../components/DownloadableProductOptions/DownloadableProductOptions.gql'
import type { ProductListItemDownloadableFragment } from '../components/ProductListItemDownloadable/ProductListItemDownloadable.gql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

function isDownloadableProduct(
  product:
    | ProductPagePriceProps['product']
    | (ProductPagePriceProps['product'] & DownloadableProductOptionsFragment),
): product is ProductPagePriceProps['product'] & DownloadableProductOptionsFragment {
  return (
    product.__typename === 'DownloadableProduct' &&
    Array.isArray((product as DownloadableProductOptionsFragment).downloadable_product_links)
  )
}

export function ProductPagePrice(
  props: PluginProps<ProductPagePriceProps> & AddToCartItemSelector,
) {
  const { Prev, product, index = 0, ...rest } = props

  const form = useFormAddProductsToCart()
  const selectedOptions = useWatch({
    control: form.control,
    name: `cartItems.${index}.selected_options`,
  })

  if (!isDownloadableProduct(product)) return <Prev product={product} index={index} {...rest} />

  const selectedLinks = product.downloadable_product_links?.filter((link) =>
    selectedOptions?.includes(link?.uid ?? ''),
  )

  const totalPrice = selectedLinks?.reduce((acc, link) => acc + (link?.price ?? 0), 0) ?? 0

  return (
    <Prev
      product={{
        ...product,
        price_range: {
          ...product.price_range,
          minimum_price: {
            ...product.price_range.minimum_price,
            regular_price: {
              currency: product.price_range.minimum_price.regular_price.currency,
              value: (product.price_range.minimum_price.regular_price.value ?? 0) + totalPrice,
            },
            final_price: {
              currency: product.price_range.minimum_price.final_price.currency,
              value: (product.price_range.minimum_price.final_price.value ?? 0) + totalPrice,
            },
          },
        },
      }}
      index={index}
      {...rest}
    />
  )
}
