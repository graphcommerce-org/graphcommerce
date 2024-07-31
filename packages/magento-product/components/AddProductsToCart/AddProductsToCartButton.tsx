// eslint-disable-next-line import/no-extraneous-dependencies
import { useCartIsAvailableForUser, useCartIsDisabled } from '@graphcommerce/ecommerce-ui'
import { Button, ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'
import {
  useAddProductsToCartAction,
  UseAddProductsToCartActionProps,
} from './useAddProductsToCartAction'

export type AddProductsToCartButtonProps = UseAddProductsToCartActionProps &
  Pick<
    ButtonProps<'button'>,
    | 'variant'
    | 'color'
    | 'size'
    | 'fullWidth'
    | 'startIcon'
    | 'endIcon'
    | 'onClick'
    | 'sx'
    | 'children'
    | 'type'
  >

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { children, product, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)
  const router = useRouter()
  const cartDisabled = useCartIsDisabled()
  const cartAvailable = useCartIsAvailableForUser()

  if (cartDisabled) return null

  return !cartAvailable ? (
    <Button
      color='primary'
      variant='pill'
      size='large'
      {...rest}
      {...action}
      onClick={() => router.push('/account/signin')}
    >
      {children || <Trans>Sign in</Trans>}
    </Button>
  ) : (
    <Button type='submit' color='primary' variant='pill' size='large' {...rest} {...action}>
      {children || <Trans>Add to Cart</Trans>}
    </Button>
  )
}
