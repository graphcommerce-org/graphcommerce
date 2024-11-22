import type { AddProductsToCartButtonProps } from '@graphcommerce/magento-product'
import { AddProductsToCartButton } from '@graphcommerce/magento-product'
import { Trans } from '@lingui/react'

export function EditCartItemButton(props: AddProductsToCartButtonProps) {
  const { children, ...rest } = props

  return (
    <AddProductsToCartButton color='secondary' {...rest}>
      <Trans id='Save changes' />
    </AddProductsToCartButton>
  )
}
