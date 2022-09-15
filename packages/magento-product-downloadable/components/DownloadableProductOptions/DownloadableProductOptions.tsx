import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardListForm,
  ActionCardProps,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import { DownloadableProductOptionsFragment } from './DownloadableProductOptions.gql'

export function DownloadableProductOptions() {
  const form = useFormAddProductsToCart<DownloadableProductOptionsFragment>()
  const { typeProduct, control } = form

  const items = useMemo(
    () =>
      filterNonNullableKeys(typeProduct?.downloadable_product_links, ['title']).map((item) => {
        const newItem: ActionCardProps = {
          value: item.uid,
          title: item.title,
          price: <Money value={item.price} />,
        }
        return newItem
      }),
    [typeProduct?.downloadable_product_links],
  )

  return (
    <ActionCardListForm
      size='medium'
      required
      errorMessage='Please select an option'
      control={control}
      name='cartItems.0.selected_options.0'
      render={ActionCard}
      items={items}
    />
  )
}
