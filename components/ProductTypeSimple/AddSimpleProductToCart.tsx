import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import { useAddSimpleProductToCartMutation } from 'generated/apollo'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type AddSimpleProductToCartProps = Omit<GQLAddSimpleProductToCartMutationVariables, 'cartId'>

export default function AddSimpleProductToCart(props: AddSimpleProductToCartProps) {
  const { sku, customizableOptions, quantity } = props

  const requestCartId = useRequestCartId()
  const [add] = useAddSimpleProductToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const addToCart = async () => {
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/cart')

    await add({
      variables: {
        cartId: await requestCartId(),
        sku,
        quantity,
        customizableOptions,
      },
    })
    setLoading(false)
  }

  return (
    <Button color='primary' variant='contained' onClick={addToCart} disabled={loading}>
      Add to Cart
    </Button>
  )
}
