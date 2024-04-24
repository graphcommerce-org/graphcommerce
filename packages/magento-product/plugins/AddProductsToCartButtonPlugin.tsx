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
  const { Prev } = props

  const router = useRouter()
  const cartId = useCurrentCartId().currentCartId

  const [deleteCartItem] = useMutation(RemoveItemFromCartDocument, {
    variables: { cartId, uid: router.query.cartItemId as string },
  })
  const form = useContext(AddProductsToCartContext)

  const submitHandler = form?.handleSubmit(() => {})

  return router.asPath.includes('/p/edit') ? (
    <Prev
      {...props}
      onClick={async () => {
        await deleteCartItem()
        if (submitHandler) await submitHandler()
      }}
      type='button'
    >
      <Trans id='Edit' />
    </Prev>
  ) : (
    <Prev {...props} />
  )
}
