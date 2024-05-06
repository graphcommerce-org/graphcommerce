import type { PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { AddProductsToCartForm } from '../components'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

export const Plugin = (props: PluginProps<typeof AddProductsToCartForm>) => {
  const { Prev } = props
  const router = useRouter()

  return router.asPath.includes('/p/edit') ? (
    <Prev {...props} redirect='/cart' disableSuccessSnackbar />
  ) : (
    <Prev {...props} />
  )
}
