import type { ReactPlugin } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { AddProductsToCartForm } from '../index.interceptor'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

export const Plugin: ReactPlugin<typeof AddProductsToCartForm> = (props) => {
  const { Prev } = props
  const router = useRouter()

  return router.asPath.includes('/p/edit') ? (
    <Prev {...props} redirect='/cart' disableSuccessSnackbar />
  ) : (
    <Prev {...props} />
  )
}
