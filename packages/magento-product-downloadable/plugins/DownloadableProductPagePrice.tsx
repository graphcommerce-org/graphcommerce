import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  useFormAddProductsToCart,
  type AddToCartItemSelector,
  type ProductPagePriceProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { DownloadableProductOptionsFragment } from '../graphql/fragments/DownloadableProductOptions.gql'
import type { ProductListItemDownloadableFragment } from '../graphql/inject/ProductListItemDownloadable.gql'

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
    name: `cartItems.${index}.selected_options_record.downloadable`,
  })

  if (!isDownloadableProduct(product) || !selectedOptions)
    return <Prev product={product} index={index} {...rest} />

  const selectedLinks = filterNonNullableKeys(product.downloadable_product_links).filter((link) =>
    Array.isArray(selectedOptions)
      ? selectedOptions.includes(link.uid)
      : selectedOptions === link.uid,
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
