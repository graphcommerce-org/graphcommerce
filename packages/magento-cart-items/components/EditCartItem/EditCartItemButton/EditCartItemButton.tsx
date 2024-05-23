import {
  AddProductsToCartButtonProps,
  useAddProductsToCartAction,
} from '@graphcommerce/magento-product'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'

export function EditCartItemButton(props: AddProductsToCartButtonProps) {
  const { children, product, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)

  return (
    <Button type='submit' color='secondary' variant='pill' size='large' {...rest} {...action}>
      {children || <Trans id='Save changes' />}
    </Button>
  )
}
