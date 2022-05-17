import { useConfigurableContext } from '@graphcommerce/magento-product-configurable'
import { ProductWishlistChipBase, ProductWishlistChipProps } from './ProductWishlistChipBase'

export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  const { sku } = props

  let selectedOptions: string[] = []
  if (sku) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useConfigurableContext(sku)
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
