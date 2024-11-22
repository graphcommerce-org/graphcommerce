import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import type { DownloadableProductOptionsFragment } from './DownloadableProductOptions.gql'

type DownloadableProductOptionsProps = AddToCartItemSelector & {
  product: DownloadableProductOptionsFragment
}

export function DownloadableProductOptions(props: DownloadableProductOptionsProps) {
  const { product, index = 0 } = props
  const { control } = useFormAddProductsToCart()

  const items = useMemo(
    () =>
      filterNonNullableKeys(product.downloadable_product_links, ['title']).map((item) => {
        const newItem: ActionCardProps = {
          value: item.uid,
          title: item.title,
          price: <Money value={item.price} />,
        }
        return newItem
      }),
    [product.downloadable_product_links],
  )

  return (
    <ActionCardListForm
      size='medium'
      required
      errorMessage='Please select an option'
      control={control}
      name={`cartItems.${index}.selected_options.0`}
      render={ActionCard}
      items={items}
    />
  )
}
