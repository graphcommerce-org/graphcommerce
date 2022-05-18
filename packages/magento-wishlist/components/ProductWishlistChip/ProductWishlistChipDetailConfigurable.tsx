import { useConfigurableContext } from '@graphcommerce/magento-product-configurable'
import { ProductWishlistChipBase, ProductWishlistChipProps } from './ProductWishlistChipBase'

export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  const { sku } = props
  const context = useConfigurableContext(sku ?? '')

  let selectedOptions: string[] = []

  if (sku) {
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
