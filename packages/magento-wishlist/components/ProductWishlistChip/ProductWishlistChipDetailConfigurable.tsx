import { useConfigurableContext } from '@graphcommerce/magento-product-configurable'
import { ProductWishlistChipBase, ProductWishlistChipProps } from '@graphcommerce/magento-wishlist'

export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  const { sku } = props

  let selectedOptions: string[] = []
  let context

  if (sku) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    context = useConfigurableContext(sku)
    selectedOptions = (Object as any).values(context.selection)
  }

  return (
    <ProductWishlistChipBase
      sx={(theme) => ({
        boxShadow: theme.shadows[6],
      })}
      selectedOptions={selectedOptions}
      {...props}
    />
  )
}
