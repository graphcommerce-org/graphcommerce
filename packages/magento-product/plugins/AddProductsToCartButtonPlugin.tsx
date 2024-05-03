import { useMutation } from '@graphcommerce/graphql'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { RemoveItemFromCartDocument } from '@graphcommerce/magento-cart-items'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AddProductsToCartButton, AddProductsToCartContext } from '../components'

export const component = 'AddProductsToCartButton'
export const exported = '@graphcommerce/magento-product'

export const Plugin: ReactPlugin<typeof AddProductsToCartButton> = (props) => {
  const { Prev, ...rest } = props

  const router = useRouter()

  const form = useContext(AddProductsToCartContext)

  const submitHandler = form?.handleSubmit(() => {})

  return router.asPath.includes('/p/edit') ? (
    <Prev
      {...rest}
      onClick={async () => {
        if (submitHandler) await submitHandler()
      }}
      type='button'
    >
      <Trans id='Save' />
    </Prev>
  ) : (
    <Prev {...rest} />
  )
}
