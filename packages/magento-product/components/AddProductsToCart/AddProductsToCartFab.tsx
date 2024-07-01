import { useCustomerSession } from '@graphcommerce/magento-customer'
import {
  Fab,
  FabProps,
  iconShoppingBag,
  iconCheckmark,
  useStorefrontConfig,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import {
  useAddProductsToCartAction,
  UseAddProductsToCartActionProps,
} from './useAddProductsToCartAction'

export type AddProductsToCartFabProps = {
  sx?: SxProps<Theme>
  icon?: FabProps['icon']
} & Pick<FabProps, 'color' | 'size'> &
  UseAddProductsToCartActionProps

export function AddProductsToCartFab(props: AddProductsToCartFabProps) {
  const { icon = iconShoppingBag, product, sku, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)

  const router = useRouter()
  const { loggedIn } = useCustomerSession()
  const { signInMode } = useStorefrontConfig()
  const loginRequiredForCart = signInMode === 'DISABLE_GUEST_ADD_TO_CART' && !loggedIn

  return loginRequiredForCart ? (
    <Fab
      icon={showSuccess && !action.loading ? iconCheckmark : icon}
      aria-label={i18n._(/* i18n*/ `Add to Cart`)}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        await router.push('/account/signin')
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    />
  ) : (
    <Fab
      type='submit'
      {...rest}
      {...action}
      icon={showSuccess && !action.loading ? iconCheckmark : icon}
      aria-label={i18n._(/* i18n*/ `Add to Cart`)}
    />
  )
}
