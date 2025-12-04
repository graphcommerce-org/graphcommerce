import type { AddProductsToCartButtonProps } from '@graphcommerce/magento-product'
import { AddProductsToCartButton } from '@graphcommerce/magento-product'
import { Trans } from '@lingui/react/macro'

export function EditCartItemButton(props: AddProductsToCartButtonProps) {
  const { children, ...rest } = props

  return (
    <AddProductsToCartButton color='secondary' {...rest}>
      <Trans>Save changes</Trans>
    </AddProductsToCartButton>
  )
}
