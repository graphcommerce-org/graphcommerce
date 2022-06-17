import { ProductWishlistChipBase, ProductWishlistChipProps } from './ProductWishlistChipBase'

export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  const { sku } = props

  return null

  // let selectedOptions: string[] = []

  // if (sku) {
  //   selectedOptions = (Object as any).values(context.selection)
  // }

  // return (
  //   <ProductWishlistChipBase
  //     sx={(theme) => ({
  //       boxShadow: theme.shadows[6],
  //     })}
  //     selectedOptions={selectedOptions}
  //     {...props}
  //   />
  // )
}
